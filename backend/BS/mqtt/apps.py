from django.apps import AppConfig
from django.conf import settings
import paho.mqtt.client as mqtt
import threading
import requests, json

class MqttConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mqtt'

    MQTT_BROKER_HOST = "mqtt.example.com"
    MQTT_BROKER_PORT = 1883
    MQTT_TOPIC = "my_mqtt_topic"


    # TODO: on_message 함수 수정.
    request_url = getattr(settings, 'DJANGO_REQUEST_PATH', 'none') #이것이 에러날 수도 있음 (장고 로딩 순서 이슈) 에러날 경우 밑의 url사용.
    #request_url = 'http://localhost:8080/test/'

    # 테스트용 api 확인
    # 반드시 data를 data = { "num" : 3 } 형태의 json 파일로 보낼것.
    def on_message(self, client, userdata, message):
        payload = message.payload.decode()
        # TODO: data에 넣을 것 수정. 아마 json.loads를 사용하는 것이 나을듯. 아니라면 오류 뜰 수도 있음.
        data = {}
        # TODO: payload를 이용하여 data 구성.
        data = json.dumps(data)
        response = requests.post(self.request_url, data)
        print("Response from other server:", response.text)

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