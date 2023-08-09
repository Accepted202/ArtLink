FROM amazoncorretto:11 as builder
ARG JAR_FILE=./build/libs/projecttest1-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
