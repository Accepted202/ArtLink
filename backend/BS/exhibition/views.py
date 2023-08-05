from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from exhibition.models import Exhibition

# Create your views here.
@method_decorator(csrf_exempt, name = 'dispatch')
class ExhibitionView(View):
    @method_decorator(csrf_exempt)
    def post(self, request):
        data = json.loads(request.body)
        print(data)
        try:
            Exhibition.objects.create(exhibitionid = data['exhibitionId'])
            return HttpResponse(status=201, content = 'Exhibition created successfully')
        except:
            return HttpResponse(status=404, content='It is already created.')

    def get(self, request):
        try:
            exhibitions = Exhibition.objects.all()
            res = {'exhibitionList' : []}
            for exhibition in exhibitions:
                res['exhibitionList'].append(exhibition.exhibitionid)
            return HttpResponse(status=200, content=json.dumps(res))
        except:
            return HttpResponse(status=404, content='There is no exhibition.')


@method_decorator(csrf_exempt, name = 'dispatch')
class ExhibitionDetailView(View):
    @method_decorator(csrf_exempt)
    def delete(self, request, exhibitionid):
        Exhibition.objects.delete(exhibitionid = exhibitionid)
        return HttpResponse(status=200, content = 'Exhibition deleted successfully')