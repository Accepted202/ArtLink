from django.apps import AppConfig
import paho.mqtt.client as mqtt
import threading
import requests

class MqttConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mqtt'

    MQTT_BROKER_HOST = "mqtt.example.com"
    MQTT_BROKER_PORT = 1883
    MQTT_TOPIC = "my_mqtt_topic"

    request_url = ""

    def on_message(self, client, userdata, message):
        payload = message.payload.decode()
        response = requests.post(self.OTHER_SERVER_URL, data={"message": payload})
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