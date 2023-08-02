from django.apps import AppConfig
from django.conf import settings
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish
import threading
import requests, json

class MqttConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mqtt'

    MQTT_BROKER_HOST = "localhost"
    MQTT_BROKER_PORT = 1883
    MQTT_TOPIC = "test/#"

    request_url = getattr(settings, 'DJANGO_REQUEST_PATH', 'none') #이것이 에러날 수도 있음 (장고 로딩 순서 이슈) 에러날 경우 밑의 url사용.

    #request_url = 'http://localhost:8000/test/'

    # 테스트용 api 확인
    # 반드시 data를 data = { "num" : 3 } 형태의 json 파일로 보낼것.
    def on_message(self, client, userdata, message):
        target = ''
        # target = f'{deviceId}/'
        # payload는 json 형태로 수신
        payload = message.payload.decode()
        data = json.loads(payload)
        # print("your data : ", data)
        
        event = data["E"]
        # 등록 요청인 경우
        if event == "R":
            # data preprocessing 
            tag_id = data["T"]
            link_cnt = data["LC"]
            if link_cnt < 3 :
                res = 2
                publish.single(tag_id, res, hostname = self.MQTT_BROKER_HOST, port = self.MQTT_BROKER_PORT)
                return
            # make request body
            req_body = {}
            req_body['deviceid'] = tag_id
            for i in range(3):
                now_anchor = "anchor" + str(i+1)
                now_range = "d" + str(i+1)
                req_body[now_anchor] = int(data["L"][i][0])
                req_body[now_range] = float(data["L"][i][1])
            # 정제된 데이터는 다시 json으로 변환하여 서버에 요청
            req_body = json.dumps(req_body)
            response = requests.post(self.request_url + target, data)
            print("Response from other server:", response.text)
            # 요청 성공시, response.status_code = 200 (int) 로 넘어온다.
            # IoT 기기에게 잘 등록됬으면 mqtt publish 하여 완료 신호 송신
            returnData = None
            if response.status_code == 200:
                returnData = 1
                # publish.single 의 payload는 데이터 형식이 json 이어야 한다?
            else:
                returnData = 2    
            publish.single( tag_id, returnData, hostname=self.MQTT_BROKER_HOST, port=self.MQTT_BROKER_PORT)

        '''
        # 삭제 요청인 경우
        if event == "D":
            # deviceid 는 tag_id와 같습니다.
            # deviceId = data["T"]
            # 삭제 요청 수행
            response = requests.delete(self.request_url, data)
            # 요청 response 획득
            returnData = None
            if response.status_code == 200:
                returndData = 0
            else:
                returnData = 2
            publish.single(tag_id, returnData, hostname=self.MQTT_BROKER_HOST, port=self.MQTT_BROKER_PORT)
        '''
    def on_connect(self, client, userdata, flags, rc):
        print("Connected with result code " + str(rc))
        client.subscribe(self.MQTT_TOPIC)

    def on_disconnect(self, client, userdata, rc):
        print("Disconnected with result code " + str(rc))

    def connect_mqtt(self):
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.on_connect = self.on_connect
        self.mqtt_client.on_message = self.on_message
        self.mqtt_client.on_disconnect = self.on_disconnect
        self.mqtt_client.connect(self.MQTT_BROKER_HOST, self.MQTT_BROKER_PORT, 60)

        self.mqtt_client.loop_start()

    def ready(self):
        t = threading.Thread(target=self.connect_mqtt)
        t.start()