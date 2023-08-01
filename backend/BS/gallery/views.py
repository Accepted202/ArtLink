from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from gallery.models import Gallery

# Create your views here.
@method_decorator(csrf_exempt, name = 'dispatch')
class GalleryView(View):
    @method_decorator(csrf_exempt)
    def post(self, request):
        data = json.loads(request.body)
        print(data)
        try:
            Gallery.objects.create(galleryid = data['galleryId'])
            return HttpResponse(status=201, content = 'Gallery created successfully')
        except:
            return HttpResponse(status=404, content='It is already created.')

    def get(self, request):
        try:
            galleries = Gallery.objects.all()
            res = {}
            res['galleryList'] = []
            for gallery in galleries:
                res['galleryList'].append(gallery.galleryid)
            return HttpResponse(status=200, content=json.dumps(res))
        except:
            return HttpResponse(status=404, content='There is no gallery.')


@method_decorator(csrf_exempt, name = 'dispatch')
class GalleryDetailView(View):
    @method_decorator(csrf_exempt)
    def delete(self, request, galleryid):
        Gallery.objects.delete(galleryid = galleryid)
        return HttpResponse(status=200, content = 'Gallery deleted successfully')