#include <FunctionalInterrupt.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include "EspMQTTClient.h"

// LED configuration
uint8_t ledG = 26;
uint8_t ledB = 25;
uint8_t ledR = 27; 
uint8_t ledArray[3] = {1, 2, 3}; // three led channels
const boolean invert = true; // set true if common anode, false if common cathode

// BUTTON configuration
uint8_t BUTTON1 = 34;
uint8_t BUTTON2 = 35;

EspMQTTClient client(
  "A202",
  "ssafy13579",
  "192.168.137.1",  // MQTT Broker server ip
  "UserDevice1",     // Client name that uniquely identify your device
  1883              // The MQTT port, default to 1883. this line can be omitted
);

StaticJsonDocument<100> doc;
String serializer;

class Button
{
public:
	Button(uint8_t reqPin) : PIN(reqPin){
		pinMode(PIN, INPUT_PULLUP);
		attachInterrupt(PIN, std::bind(&Button::isr,this), FALLING);
	};
	~Button() {
		detachInterrupt(PIN);
	}

	void IRAM_ATTR isr() {
		pressed = true;
	}

	void checkPressed() {
		if (pressed) {
      ledcWrite(1, 255);
      serializeJson(doc, serializer);
      client.publish("userIoT", serializer);
      delay(10);
      ledcWrite(1, 0);
      serializer = "";
			pressed = false;
		}
	}

private:
	const uint8_t PIN;
    volatile bool pressed;
};

void onConnectionEstablished() {
  client.subscribe("mytopic/test", [] (const String &payload)  {
    Serial.println(payload);
  });
}

// 2 button configuration
Button button1(BUTTON1);
Button button2(BUTTON2);

// the setup routine runs once when you press reset:
void setup() 
{
  // json setup
  Serial.begin(115200);
  const char* anchor1 = "abcdefegtt";
  const char* anchor2 = "asidonfaiunf";
  const char* anchor3 = "lsdoifjjsjoei";
  int d1 = 9;
  int d2 = 12;
  int d3 = 15;
  Serial.println("Check status : json setup");
  doc["device_id"] = 1;
  doc["anchor_num"] = 3;
  doc["anchors"][anchor1] = d1;
  doc["anchors"][anchor2] = d2;
  doc["anchors"][anchor3] = d3;
  delay(1000);

  Serial.println("Check status : LEDsetup");
  // led setup
  ledcAttachPin(ledR, 1);
  ledcAttachPin(ledG, 2);
  ledcAttachPin(ledB, 3);
  ledcSetup(1, 12000, 8);
  ledcSetup(2, 12000, 8);
  ledcSetup(3, 12000, 8);

  Serial.println("Check status : setup complete");
  // setup complete led blink 
  ledcWrite(1, 255);
  delay(1000);
  ledcWrite(1, 0);
}

void loop() 
{
	button1.checkPressed();
	button2.checkPressed();
  client.loop();
}
