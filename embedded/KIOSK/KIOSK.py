# KIOSK Implementation

## Set up

Rpi4 로 KIOSK를 구현하며, RFID 에서 읽어온 데이터로 웹 브라우저를 제어해야 합니다.

### 1. RFID Setting

### 2. Web browser Setting(Chromedriver, Selenium)

## Code

```python
import time
import threading
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# 핀 번호 설정
# reset_pin = 22

# 글로벌 웹 드라이버 설정
driver = None
# 글로벌 변수로 flag 설정
isStartStatus = True

# 초기 url 주소 설정
startUrl = "https://www.naver.com/"

def setup():
    global driver
    print("Setup processing...")
    # chrome web browser setting
    chrome_options = Options()
    chrome_options.add_argument('lang=ko_KR')
    #chrome_options.add_argument('--window-size= 600,1024')
    chrome_options.add_argument('start-fullscreen')
    chrome_options.add_experimental_option("detach", True)
    #chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])
    # web driver start
    driver = webdriver.Chrome(options = chrome_options)
    driver.get("http://www.naver.com")
    print("Setup complete!")

def monitoringUrl():
    global isStartStatus, driver, startUrl
    try:
        while True:
            # A 작업을 수행하는 코드를 무한 루프로 실행
            # print("Browser Monitoring...")
            # print("now url = ", driver.current_url)
            # print("startUrl = " , startUrl)
            if driver.current_url == startUrl:
                isStartStatus = True
            time.sleep(1)  # 무한 루프를 돌며 1초마다 체크 (적절한 주기로 설정)
            
    except KeyboardInterrupt:
        print("사용자에 의해 Monitoring 작업이 종료되었습니다.")

def handle_rfid_tag(tag_id, tag_data):
    global isStartStatus, driver
    # print("RFID 칩 태깅 감지!")
    print("태그 ID:", tag_id)
    # 태깅된 칩에 대응하는 추가 작업을 수행
    # 초기 상태에서만 태깅 로직 발생
    if isStartStatus:
        isStartStatus = False
        print("Send Signal to Backend...")
        # 백엔드에 요청 보냄 -> 태깅 디바이스에 맞는 url 획득
        # ...
        # 획득한 url로 이동
        driver.get("http://www.google.com")

def rfid_tagging():
    # GPIO 초기화
    GPIO.setmode(GPIO.BOARD)

    # RFID 리더기 인스턴스 생성
    reader = SimpleMFRC522()

    try:
        print("RFID 리더기가 준비되었습니다.")
        while True:
            # RFID 카드 태깅을 시도하고, 태깅 신호가 들어올 때까지 대기
            id, text = reader.read()
            if id:
                handle_rfid_tag(id, text)
            time.sleep(0.5)  # 무한 루프를 돌며 주기적으로 체크 (0.5초마다 체크)
    except KeyboardInterrupt:
        print("사용자에 의해 RFID 감지가 종료되었습니다.")
    finally:
        GPIO.cleanup()

if __name__ == "__main__":
    # setup
    setup()

    # monitoring 함수를 쓰레드로 실행
    monitoring_thread = threading.Thread(target = monitoringUrl)
    monitoring_thread.start()

    # RFID 리더기 감지를 쓰레드로 실행
    rfid_thread = threading.Thread(target = rfid_tagging)
    rfid_thread.start()

    # 메인 쓰레드는 여기서 계속 실행
    monitoring_thread.join()
    rfid_thread.join()

    print("모든 작업이 종료되었습니다.")
```