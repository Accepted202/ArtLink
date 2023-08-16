# 포팅 메뉴얼

SSL 을 위한 키 설치
CERTBOT 설치를 진행해줍니다.
- docker image로 제공되는 certbot은 nginx과 관련해서 제공하지 않기 때문에 실행되는 도메인에 pem 키를 설치해서 진행하였습니다.
 



cp ./exec/application.properties ./WAS/projecttest1/src/main/resources
cp ./exec/docker-compose.yml ./

