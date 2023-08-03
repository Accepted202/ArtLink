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
from exhibition.models import Exhibition


# Create your views here.
@method_decorator(csrf_exempt, name = 'dispatch')
class ArtworkView(View):
    def post(self, request):
        # 미술품의 좌표, 번호, 갤러리 id만 받아 DB 추가
        data = json.loads(request.body)
        serializer = ArtworkSerializer(data = data)
        try:
            #미술품 저장.
            serializer.create(validated_data = data)

            #Voronoi diagram을 뽑는 과정
            reverse_url = reverse('getvoronoi')
            exhibitionid = data['exhibitionid']
            exhibition = Exhibition.objects.get(exhibitionid=exhibitionid)
            artworks = Artwork.objects.filter(exhibition = exhibition)


            txt = str(len(artworks))
            txt += '\n'
            for work in artworks:
                txt += (str(work.coorx) + ' ' + str(work.coory) + '\n')
            request.POST = {'input': txt}

            #Voronoi diagram 돌리기 요청.
            return redirect(reverse_url, request = request, method = 'POST')
        except Exception as e:
            print(e)
            return HttpResponse(status=404, content = "Artwork addition failed")

    def get(self, request):
        #모든 Artwork 조회
        content = ArtworkSerializer(Artwork.objects.all(), many = True)
        print(content)
        return HttpResponse(status=200, content = json.dumps(content.data))

    def put(self, request): # 미술품 좌표 수정.
        data = json.loads(request.body)
        serializer = ArtworkSerializer()
        try:
            # 미술품 수정
            serializer.update(validated_data = data)

            # 보로노이 돌리기
            reverse_url = reverse('getvoronoi')
            exhibitionid = data['exhibitionid']
            exhibition = Exhibition.objects.get(exhibitionid=exhibitionid)
            artworks = Artwork.objects.filter(exhibition=exhibition)

            txt = str(len(artworks))
            txt += '\n'
            for work in artworks:
                txt += (str(work.coorx) + ' ' + str(work.coory) + '\n')
            request.POST = {'input': txt}

            return redirect(reverse_url, request=request, method='POST')
        except Exception as e:
            return HttpResponse(status=404, content = "Not valid form")

# TODO: 전시회별 수정 요청.=> 무슨 의미였지... 나중에 다시 확인하기로.

@method_decorator(csrf_exempt, name = 'dispatch')
class ArtworkDetailView(View):
    def delete(self, request, artworkId):
        try:
            Artwork.objects.delete(artworkid = artworkId)
            return JsonResponse({'msg':'ok'}, status = 200)
        except:
            return JsonResponse({'msg':'deletion failed'}, status = 400)

@method_decorator(csrf_exempt, name = 'dispatch')
class getVoronoi(View): #Voronoi 결과를 얻기.
    def post(self, request, exhibitionid):
        inp = request.POST.get('input')

        command = "tools/cpptest.exe"
        command = command + " " + inp

        #TODO: OS가 Window일때만 git bash로 우회. EC2 배포시 삭제 요망
        git_bash_path = r"C:\Program Files\Git\bin\bash.exe"
        command = git_bash_path + ' ' + '-c ' + command

        #실행.
        process = subprocess.Popen([command], stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                                   text=True)

        stdout, stderr = process.communicate()
        if process.returncode == 0:
            stdout = stdout.split('_')
            vertex, edge, area = [], [], []
            for i in range(len(stdout)):
                stdout[i] = stdout[i].split('\n')
                for j in range(len(stdout[i])):
                    if stdout[i][j] == '':
                        continue
                    if i == 0:
                        stdout[i][j] = list(map(float, stdout[i][j].split(' ')))
                        vertex.append(stdout[i][j])
                    else:
                        stdout[i][j] = list(map(int, stdout[i][j].split(' ')))
                        if (i == 1):
                            edge.append(stdout[i][j])
                        else:
                            area.append(stdout[i][j])
            exhibition = Exhibition.objects.get(exhibitionid = exhibitionid)

            #기존에 저장해둔 모든 데이터 삭제
            Voronoipoint.objects.delete(exhibition = exhibition)
            Voronoiresult.objects.delete(exhibition = exhibition)

            #데이터 신규 생성
            for idx, point in enumerate(vertex):
                coorx, coory = point[0], point[1]
                Voronoipoint.objects.create(coorx = coorx, coory = coory, pointid = idx, exhibition = exhibition)
            for idx, e in enumerate(edge):
                point1id, point2id = e[0], e[1]
                cw1, cw2 = area[idx][0], area[idx][1]
                Voronoiresult.objects.create(point1id = point1id, point2id = point2id, cwartworkid = cw1, ccwartworkid = cw2, exhibition = exhibition)
            return HttpResponse(status = 200, content = 'successfully worked.')
        else:
            raise Exception

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
