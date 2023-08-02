import json, random
import math
import requests

from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

from artwork.models import Voronoipoint, Voronoiresult
from device.models import Anchor
from device.serializers import AnchorSerializer

from exhibition.models import Exhibition
from helper.helper import rotation, get_coord, dist

# Create your views here.
# POST Request form:
# {
#     "exhibitionId": 2,
#     "anchorId": 3,
# }
# GET Response form:
# [{"anchorid": 3, "coorx": 120.32, "coory": 1.3, "exhibition": 3},
# {"anchorid": 4, "coorx": 120.32, "coory": 1.3, "exhibition": 3}]
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
            return HttpResponse(status=404, content = "No valid exhibition")

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
            n_exhibition = Exhibition.objects.get(exhibitionid = data['exhibitionid'])
            coorx, coory = data['coorx'], data['coory']
            anchor.anchorid = n_anchorid
            anchor.exhibition = n_exhibition
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
    def post(self, request, deviceId):
        try:
            #MQTT단에서 보내준 데이터를 통한 좌표 추출
            data = json.loads(request.body)
            d1, d2, d3 = data['d1'], data['d2'], data['d3']
            anchorid1, anchorid2, anchorid3 = data['anchorid1'], data['anchorid2'], data['anchorid3']
            anchor1, anchor2, anchor3 = Anchor.objects.get(anchorid = anchorid1), Anchor.objects.get(anchorid = anchorid2), Anchor.objects.get(anchorid = anchorid3)

            exhibition = anchor1.exhibition

            #만일 exhibition이 artwork를 하나만 가진다면 에러 도출!
            artworkList = exhibition.artworks.all();
            num_artwork = artworkList.count();
            if(num_artwork == 0):
                raise Exception("Not enough artwork")
            elif(num_artwork == 1):
                ans = artworkList[0].artworkid
            else:
                x1, y1, x2, y2, x3, y3 = anchor1.coorx, anchor1.coory, anchor2.coorx, anchor2.coory, anchor3.coorx, anchor3.coory
                coor = get_coord(d1, d2, d3, [x1, y1], [x2, y2], [x3, y3]) # device의 현재 좌표

                #랜덤 기울기를 가진 직선
                slope = math.tan((random.random() - 0.5) * math.pi)
                intersections = Voronoipoint.objects.filter(exhibition = exhibition)
                edges = Voronoiresult.objects.filter(exhibition = exhibition)

                points = {}

                #모든 선분들을 현재 device 위치 coor 중심으로 -slope의 기울기만큼 회전
                for intersection in intersections:
                    x, y = intersection.coorx, intersection.coory
                    nx, ny = rotation([x, y], coor, slope)
                    idx = intersection.pointid
                    points[idx] = [nx, ny]

                #선분의 한 쪽 y좌표가 0이상, 한쪽은 반드시 0 이하여야 하므로 이를 기준으로 선분과 위의 slope 기울기를 가진 직선과의 교점을 구함.
                #xx는 교점의 x좌표, area1, area2는 각각 시계방향, 반시계방향에 위치한 점의 인덱스
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

                res.sort() #적어도 하나는 만나기 때문에 res[0]가 있음은 보장되어야 한다. => 만일 미술품이 오로지 한개 뿐이라면 에러.

                rres = res[0]
                p1, p2 = rres[1], rres[2]

                ans = p1 if dist(points[p1], coor) < dist(points[p2], coor) else p2 #더 가까운 것의 인덱스가 ans에 저장.

            #Response 예상 : {"deviceId":1, "drawingId" : 2}
            JSON = {}
            try:
                JSON['drawingId'] = ans

                #Spring Server에 요청을 보냄.
                spring_server_path = getattr(settings, 'SPRING_SERVER_PATH', 'None')
                target = f'/selections/devices/{deviceId}'
                response = requests.post(spring_server_path + target, data = json.dumps(JSON))

                #Spring Server의 응답을 반환.
                if response.status_code != 200:
                    return JsonResponse(json.loads(response.content), status = 200)
            except:
                msg = {"msg" : "No valid url"}
                return JsonResponse(msg, status = 400)
        except Exception as e:
            print(e)
            msg = {"msg": "Calculation failed"}
            return JsonResponse(msg, status = 400)

    def delete(self, request, deviceId):
        try:
            spring_server_path = getattr(settings, 'SPRING_SERVER_PATH', 'None')
            target = f'/selections/devices/{deviceId}'
            response = requests.delete(spring_server_path + target)

            # Spring Server의 응답을 반환.
            if response.status_code != 200:
                return JsonResponse(json.loads(response.content), status=200)
            else:
                raise Exception
        except Exception as e:
            print(e)
            msg = {"msg": "Deletion failed"}
            return JsonResponse(msg, status=400)
