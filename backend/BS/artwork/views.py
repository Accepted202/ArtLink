import json
import subprocess

from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from artwork.models import Artwork, Voronoipoint, Voronoiresult
from artwork.serializers import ArtworkSerializer
from gallery.models import Gallery


# Create your views here.
@method_decorator(csrf_exempt, name = 'dispatch')
class ArtworkView(View):
    def post(self, request):
        data = json.loads(request.body)
        serializer = ArtworkSerializer(data = data)
        try:
            serializer.create(validated_data = data)
            reverse_url = reverse('getvoronoi')
            galleryid = data['galleryid']
            gallery = Gallery.objects.get(galleryid=galleryid)
            artworks = Artwork.objects.filter(gallery = gallery)

            txt = str(len(artworks))
            txt += '\n'
            for work in artworks:
                txt += (str(work.coorx) + ' ' + str(work.coory) + '\n')
            request.POST = {'input': txt}

            return redirect(reverse_url, request = request, method = 'POST')
        except Exception as e:
            print(e)
            return HttpResponse(status=404, content = "Artwork addition failed")

    def get(self, request):
        content = ArtworkSerializer(Artwork.objects.all(), many = True)
        print(content)
        return HttpResponse(status=200, content = json.dumps(content.data))

    def put(self, request):
        data = json.loads(request.body)
        serializer = ArtworkSerializer()
        try:
            serializer.update(validated_data = data)
            reverse_url = reverse('getvoronoi')
            galleryid = data['galleryid']
            gallery = Gallery.objects.get(galleryid=galleryid)
            artworks = Artwork.objects.filter(gallery=gallery)

            txt = str(len(artworks))
            txt += '\n'
            for work in artworks:
                txt += (str(work.coorx) + ' ' + str(work.coory) + '\n')
            request.POST = {'input': txt}

            return redirect(reverse_url, request=request, method='POST')
        except Exception as e:
            return HttpResponse(status=404, content = "Not valid form")

@method_decorator(csrf_exempt, name = 'dispatch')
class getVoronoi(View):
    def post(self, request, galleryid):
        inp = request.POST.get('input')

        command = "tools/cpptest.exe"
        command = command + " " + inp

        # If os is windows then please add two lines below or make it comment.
        git_bash_path = r"C:\Program Files\Git\bin\bash.exe"
        command = git_bash_path + ' ' + '-c ' + command

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
            gallery = Gallery.objects.get(galleryid = galleryid)
            Voronoipoint.objects.delete(gallery = gallery)
            Voronoiresult.objects.delete(gallery = gallery)
            for idx, point in enumerate(vertex):
                coorx, coory = point[0], point[1]
                Voronoipoint.objects.create(coorx = coorx, coory = coory, pointid = idx, gallery = gallery)
            for idx, e in enumerate(edge):
                point1id, point2id = e[0], e[1]
                cw1, cw2 = area[idx][0], area[idx][1]
                Voronoiresult.objects.create(point1id = point1id, point2id = point2id, cwartworkid = cw1, ccwartworkid = cw2, gallery = gallery)
            return HttpResponse(status = 200, content = 'successfully worked.')
        else:
            raise Exception
