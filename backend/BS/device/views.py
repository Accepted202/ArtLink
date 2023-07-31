import json, random
import math
import requests

from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from artwork.models import Voronoipoint, Voronoiresult
from device.models import Anchor
from device.serializers import AnchorSerializer

from gallery.models import Gallery
from helper.helper import rotation, get_coord, dist


# Create your views here.
# POST Request form:
# {
#     "galleryId": 2,
#     "anchorId": 3,
# }
# GET Response form:
# [{"anchorid": 3, "coorx": 120.32, "coory": 1.3, "gallery": 3},
# {"anchorid": 4, "coorx": 120.32, "coory": 1.3, "gallery": 3}]
# PUT Response form:
# Same as POST
@method_decorator(csrf_exempt, name = 'dispatch')
class AnchorView(View):
    def post(self, request):
        data = json.loads(request.body)
        serializer = AnchorSerializer(data = data)
        try:
            serializer.create(validated_data = data)
            return HttpResponse(status=201, content = "Well Created")
        except Exception as e:
            print(e)
            return HttpResponse(status=404, content = "No valid gallery")

    def get(self, request):
        content = AnchorSerializer(Anchor.objects.all(), many = True)
        print(content)
        return HttpResponse(status=200, content = json.dumps(content.data))

@method_decorator(csrf_exempt, name = 'dispatch')
class AnchorDetailView(View):
    def put(self, request, anchorid):
        try:
            anchor = Anchor.objects.get(anchorid=anchorid)
            data = json.loads(request.body)
            n_anchorid = data['anchorid']
            n_gallery = Gallery.objects.get(galleryid = data['galleryid'])
            coorx, coory = data['coorx'], data['coory']
            anchor.anchorid = n_anchorid
            anchor.gallery = n_gallery
            anchor.coorx = coorx
            anchor.coory = coory
            anchor.save()
        except Exception as e:
            print(e)
            raise Exception

    def delete(self, request, anchorid):
        try:
            Anchor.objects.delete(anchorid = anchorid)
        except Exception as e:
            print(e)
            raise Exception

@method_decorator(csrf_exempt, name = 'dispatch')
class ClickEvent(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            deviceid = data['deviceid']
            d1, d2, d3 = data['d1'], data['d2'], data['d3']
            anchorid1, anchorid2, anchorid3 = data['anchorid1'], data['anchorid2'], data['anchorid3']
            anchor1, anchor2, anchor3 = Anchor.objects.get(anchorid = anchorid1), Anchor.objects.get(anchorid = anchorid2), Anchor.objects.get(anchorid = anchorid3)

            gallery = anchor1.gallery

            x1, y1, x2, y2, x3, y3 = anchor1.coorx, anchor1.coory, anchor2.coorx, anchor2.coory, anchor3.coorx, anchor3.coory
            coor = get_coord(d1, d2, d3, [x1, y1], [x2, y2], [x3, y3])

            slope = math.tan((random.random() - 0.5) * math.pi)
            intersections = Voronoipoint.objects.filter(gallery = gallery)
            edges = Voronoiresult.objects.filter(gallery = gallery)

            points = {}

            for intersection in intersections:
                x, y = intersection.coorx, intersection.coory
                nx, ny = rotation([x, y], coor, slope)
                idx = intersection.pointid
                points[idx] = [nx, ny]
            res = []
            for edge in edges:
                point1, point2 = edge.point1id, edge.point2id
                area1, area2 = edge.cwartworkid, edge.ccwartworkid
                x1, y1 = points[point1][0], points[point1][1]
                x2, y2 = points[point2][0], points[point2][1]
                if(y1 * y2 > 0):
                    continue
                xx = 0
                if x1 == x2:
                    xx = abs(x1)
                elif y1 == y2:
                    xx = abs(min(x1, x2))
                else:
                    k = (y2 - y1) / (x2 - x1)
                    xx = abs(x1 - (y1 / k))
                res.append([xx, area1, area2])

            res.sort()
            rres = res[0]
            p1, p2 = rres[1], rres[2]

            ans = p1 if dist(points[p1], coor) < dist(points[p2], coor) else p2
            JSON = {}
            try:
                JSON['drawingId'] = ans
                response = requests.post(f'http://localhost:8000/{deviceid}/', data = json.dumps(JSON))
                if response.status_code != 200:
                    return HttpResponse(status = 200, content = response.content)
            except:
                return HttpResponse(status = 404, content = "No valid url")
        except Exception as e:
            print(e)
            return HttpResponse(status = 404, content = "Calculation failed")
