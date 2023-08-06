import json
import subprocess

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q

from artwork.models import Artwork, Voronoipoint, Voronoiresult
from artwork.serializers import ArtworkSerializer
from artwork.tools import getVoronoi
from exhibition.models import Exhibition


@method_decorator(csrf_exempt, name = 'dispatch')
class ArtworkView(View):
    def post(self, request):
        # 미술품의 좌표, 번호, 전시회 id만 받아 DB 추가
        data = json.loads(request.body)
        serializer = ArtworkSerializer(data = data)
        try:
            #미술품 저장.
            serializer.create(validated_data = data)

            #Voronoi diagram을 뽑는 과정
            exhibitionid = data['exhibitionid']
            exhibition = Exhibition.objects.get(exhibitionid=exhibitionid)
            artworks = Artwork.objects.filter(exhibition = exhibition)

            txt = str(len(artworks))
            txt += '\n'
            for work in artworks:
                txt += (str(work.coorx) + ' ' + str(work.coory) + '\n')

            #Voronoi diagram 돌리기 요청.
            if getVoronoi(txt, exhibition):
                return JsonResponse({'msg':'ok'}, status=200)
        except Exception as e:
            print(e)
            return JsonResponse({'msg': 'fail'}, status=404)

    def get(self, request):
        #모든 Artwork 조회
        content = ArtworkSerializer(Artwork.objects.all(), many = True)
        print(content)
        return HttpResponse(status=200, content = json.dumps(content.data))

    def put(self, request): # 미술품 좌표 수정.
        data = json.loads(request.body)

        artworkid = data['artworkid']
        artwork = Artwork.objects.filter(artworkid=artworkid).first()

        coorx, coory = data['coorx'], data['coory']
        artwork.coorx, artwork.coory = coorx, coory

        serializer = ArtworkSerializer()
        try:
            # 미술품 수정
            serializer.update(validated_data = data)

            # Voronoi diagram을 뽑는 과정
            exhibitionid = data['exhibitionid']
            exhibition = Exhibition.objects.get(exhibitionid=exhibitionid)
            artworks = Artwork.objects.filter(exhibition=exhibition)

            txt = str(len(artworks))
            txt += '\n'
            for work in artworks:
                txt += (str(work.coorx) + ' ' + str(work.coory) + '\n')

            # Voronoi diagram 돌리기 요청.
            if getVoronoi(txt, exhibition):
                return JsonResponse({'msg': 'ok'}, status=200)
        except Exception as e:
            print(e)
            return JsonResponse({'msg': 'fail'}, status=404)

# TODO: 전시회별 수정 요청.
# TODO: 미술품 삭제요청도 만들어야 함!!

@method_decorator(csrf_exempt, name = 'dispatch')
class ArtworkDetailView(View):
    def delete(self, request, artworkid):
        artwork = Artwork.objects.filter(artworkid = artworkid).first()

        if artwork.exists():
            artwork.delete()
        else:
            raise Exception('Artwork does not exist')

        exhibition = artwork.exhibition
        artworks = Artwork.objects.filter(exhibition = exhibition)
        count = artworks.count()


        serializer = ArtworkSerializer()
        try:
            # 미술품 수정

            # Voronoi diagram을 뽑는 과정

            txt = str(len(artworks))
            txt += '\n'
            for work in artworks:
                txt += (str(work.coorx) + ' ' + str(work.coory) + '\n')

            # Voronoi diagram 돌리기 요청.
            if getVoronoi(txt, exhibition):
                return JsonResponse({'msg': 'ok'}, status=200)
        except Exception as e:
            print(e)
            return JsonResponse({'msg': 'fail'}, status=404)





@method_decorator(csrf_exempt, name = 'dispatch')
class getNearbyArtwork(View):
    def get(self, request, artworkid):
        try:
            result = Voronoiresult.objects.filter(Q(cwartworkid = artworkid) | Q(ccwartworkid = artworkid))
            nearby = []
            for line in result:
                if line.cwartworkid == artworkid:
                    nearby.append(line.ccwartworkid)
                else:
                    nearby.append(line.cwartworkid)
            res = {
                'nearby': nearby
            }
            return HttpResponse(status = 200, content = json.dumps(res))
        except Exception as e:
            print(e)
            return HttpResponse(status = 500, content = "Calculation failed")
