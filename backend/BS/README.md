건희님. 반드시 djangopjt의 settings.py에서 밑에 내려보면 TODO 주석처리 해놓은 부분이 있습니다.

반드시 TODO 부분을 읽고 DB 교체 해주세요!

그리고 mqtt.apps.py에 적혀있듯, json 파일 보낼 때 유의해서 보내주세요!

**중요**

1. DB 생성 전 반드시 **해야 하는 것**
2. 터미널에 `python manage.py makemigrations`를 해준다.
3. `python manage.py migrate` 또한 해준다.
4. `python manage.py runserver --noreload`로 실행한다. (--reload 안 붙일 시 두번 실행된다.)