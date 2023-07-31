#include <functional>
#include <SPI.h>
#include "DW1000Ranging.h"
#include "EspMQTTClient.h"
#include "link.h"

#define TAG_ADD "7D:00:22:EA:82:60:3B:9C"

#define SPI_SCK 18
#define SPI_MISO 19
#define SPI_MOSI 23
#define DW_CS 4

// SPI connection pins
const uint8_t PIN_RST = 27;  // reset pin
const uint8_t PIN_IRQ = 34;  // irq pin
const uint8_t PIN_SS = 4;    // spi select pin

// LED pin config
const uint8_t ledR = 12;
const uint8_t ledG = 13;
const uint8_t ledB = 14;
const uint8_t ledArray[3] = { 1, 2, 3 };  // three led channels
const boolean invert = true;              // set true if common anode, false if common cathode

// BTN pin config
const uint8_t REG_BUTTON = 21;
const uint8_t DEL_BUTTON = 22;

// mqtt publish data
struct MyLink *uwb_data;
int index_num = 0;
long runtime = 0;
String all_json = "";

// button status
volatile boolean regBtnState = false;
volatile boolean delBtnState = false;

EspMQTTClient mqttClient(
  "A202",
  "ssafy13579",
  "192.168.137.1",   // MQTT Broker server ip
  "UserDevice1",     // Client name that uniquely identify your device
  1883               // The MQTT port, default to 1883. this line can be omitted
);

// interrupt IRAM_ATTR for btns
// ESP32 watchdog 때문에 flag만 설정
void IRAM_ATTR regBtn() {
  regBtnState = true;
}
void IRAM_ATTR delBtn() {
  delBtnState = true;
}

void onConnectionEstablished() {
  mqttClient.subscribe("mytopic/test", [] (const String &payload)  {
    Serial.println(payload);
  });
}


void setup() {
  Serial.begin(115200);
  delay(1000);

  pinMode(REG_BUTTON, INPUT);
  pinMode(DEL_BUTTON, INPUT);
  attachInterrupt(digitalPinToInterrupt(REG_BUTTON), regBtn, FALLING);
  attachInterrupt(digitalPinToInterrupt(DEL_BUTTON), delBtn, FALLING);

  ledcSetup(1, 12000, 8);
  ledcSetup(2, 12000, 8);
  ledcSetup(3, 12000, 8);
  ledcAttachPin(ledR, 1);
  ledcAttachPin(ledG, 2);
  ledcAttachPin(ledB, 3);

  //init the configuration
  SPI.begin(SPI_SCK, SPI_MISO, SPI_MOSI);
  DW1000Ranging.initCommunication(PIN_RST, PIN_SS, PIN_IRQ);

  DW1000Ranging.attachNewRange(newRange);
  DW1000Ranging.attachNewDevice(newDevice);
  DW1000Ranging.attachInactiveDevice(inactiveDevice);

  //Enable the filter to smooth the distance
  //DW1000Ranging.useRangeFilter(true);

  DW1000Ranging.startAsTag(TAG_ADD, DW1000.MODE_LONGDATA_RANGE_LOWPOWER);
}


void loop() {
  if (regBtnState) {
    regBtnState = false;
    make_link_json(uwb_data, &all_json);
    // mqttClient.publish("test", "REGISTERED HIHI");
    send_udp(&all_json);
    Serial.println("REGISTERED HIHI");
    // DW1000Ranging.loop();
    ledcWrite(1, 255);
    ledcWrite(2, 255);
    ledcWrite(3, 255);
    delay(50);
    ledcWrite(1, 0);
    ledcWrite(2, 0);
    ledcWrite(3, 0);
    delay(500);
  }

  if (delBtnState) {
    delBtnState = false;
    mqttClient.publish("test", "{\"tag_addr\":\"1780\",\"event\":\"DELETE\"}");

    Serial.println("DELETED BYEBYE");
    ledcWrite(1, 255);
    ledcWrite(2, 255);
    ledcWrite(3, 255);
    delay(50);
    ledcWrite(1, 0);
    ledcWrite(2, 0);
    ledcWrite(3, 0);
    delay(500);
  }

  mqttClient.loop();
  DW1000Ranging.loop();
}

void newRange() {
  Serial.print("from: ");
  Serial.print(DW1000Ranging.getDistantDevice()->getShortAddress(), HEX);
  Serial.print("\t Range: ");
  Serial.print(DW1000Ranging.getDistantDevice()->getRange());
  Serial.print(" m");
  Serial.print("\t RX power: ");
  Serial.print(DW1000Ranging.getDistantDevice()->getRXPower());
  Serial.println(" dBm");
}

void newDevice(DW1000Device *device) {
  Serial.print("ranging init; 1 device added ! -> ");
  Serial.print(" short:");
  Serial.println(device->getShortAddress(), HEX);
}

void inactiveDevice(DW1000Device *device) {
  Serial.print("delete inactive device: ");
  Serial.println(device->getShortAddress(), HEX);
}


void send_udp(String *msg_json)
{
    if (mqttClient.isConnected())
    {
        mqttClient.publish("test", *msg_json);
        Serial.println("UDP send");
    }
}
