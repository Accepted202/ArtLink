#include <SPI.h>
#include <WiFi.h>
#include <DW1000Ranging.h>
#include <PubSubClient.h>
#include "link.h"

#define SPI_SCK 18
#define SPI_MISO 19
#define SPI_MOSI 23
#define DW_CS 4

// connection pins
const uint8_t PIN_RST = 27; // reset pin
const uint8_t PIN_IRQ = 34; // irq pin
const uint8_t PIN_SS = 4;   // spi select pin

const uint8_t REG_BUTTON = 21;

// TAG antenna delay defaults to 16384
// leftmost two bytes below will become the "short address"
char tag_addr[] = "7D:00:22:EA:82:60:3B:9C";

const char* ssid = "A202";
const char* password = "ssafy13579";
const char* mqtt_server = "192.168.137.1";

//WiFiClient client;
WiFiClient espClient;
PubSubClient client(espClient);

//declare topic for publish message
const char* pub_topic = "test";
const char* sub_topic = "tag_addr"; // + tag_addr short address; // from dw1000 get short address logic

struct MyLink *uwb_data;
String all_json = "";
long runtime = 0;
volatile bool regBtnState = false;

void IRAM_ATTR regBtn() {
  regBtnState = true;
}

//function for set up wifi===========================================
void setup_wifi() {
  delay(100);
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length)
{
  Serial.println(topic == sub_topic);
  Serial.println(topic);
  Serial.println(sub_topic);
  if (topic == sub_topic) {
    // byte* p = (byte*)malloc(length);
    // memcpy(p,payload,length);
    String myTopic = topic;
    String myPayload = "";
    Serial.print(topic);
    Serial.print(" : ");
    Serial.println(sub_topic);
    Serial.print(*payload);
    Serial.println(length);
    for (int i = 0; i < length; i++) myPayload += (char)payload[i];
    Serial.println(myPayload);
    // free(p);
  }
}

void reconnect() {
  while (!client.connected())
  {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str()))
    {
      Serial.println("connected");
      client.subscribe(sub_topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup()
{
  Serial.begin(115200);
  delay(1000);
  setup_wifi();

  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  pinMode(REG_BUTTON, INPUT);
  attachInterrupt(digitalPinToInterrupt(REG_BUTTON), regBtn, FALLING);

  SPI.begin(SPI_SCK, SPI_MISO, SPI_MOSI);
  DW1000Ranging.initCommunication(PIN_RST, PIN_SS, PIN_IRQ); //Reset, CS, IRQ pin
  
  DW1000Ranging.attachNewRange(newRange);
  DW1000Ranging.attachNewDevice(newDevice);
  DW1000Ranging.attachInactiveDevice(inactiveDevice);

  DW1000Ranging.startAsTag(tag_addr, DW1000.MODE_LONGDATA_RANGE_LOWPOWER, false);

  uwb_data = init_link();
}

void loop()
{
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  
  if (regBtnState && ((millis() - runtime) > 2000))
  {
    DW1000Ranging.loop();
    make_link_json(uwb_data, &all_json); // println method within make_link_json(link.h)
    client.publish(pub_topic, all_json.c_str());
    runtime = millis();
    regBtnState = false; 
  } else if (true == false) {
    Serial.println("HELLO SOMETHING WRONG LOLOL");
  }
}

void newRange()
{
  char c[30];

  Serial.print("from: ");
  Serial.print(DW1000Ranging.getDistantDevice()->getShortAddress(), HEX);
  Serial.print("\t Range: ");
  Serial.print(DW1000Ranging.getDistantDevice()->getRange());
  Serial.print(" m");
  Serial.print("\t RX power: ");
  Serial.print(DW1000Ranging.getDistantDevice()->getRXPower());
  Serial.println(" dBm");
  fresh_link(uwb_data, DW1000Ranging.getDistantDevice()->getShortAddress(), DW1000Ranging.getDistantDevice()->getRange(), DW1000Ranging.getDistantDevice()->getRXPower());
}

void newDevice(DW1000Device *device)
{
  Serial.print("ranging init; 1 device added ! -> ");
  Serial.print(" short:");
  Serial.println(device->getShortAddress(), HEX);

  add_link(uwb_data, device->getShortAddress());
}

void inactiveDevice(DW1000Device *device)
{
  Serial.print("delete inactive device: ");
  Serial.println(device->getShortAddress(), HEX);
  delete_link(uwb_data, device->getShortAddress());
}
