import json

from django.http import HttpResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

@method_decorator(csrf_exempt, name = 'dispatch')
class TestView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            res = {"msg": f"Your request is {data.get('num')}"}
            return HttpResponse(status = 200, content = json.dumps(res))
        except Exception as e:
            print(e)
            return HttpResponse(status = 400, content = "Wrong request")