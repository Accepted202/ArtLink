FROM python:3.9.17

ENV PYTHONBUFFERED 1
RUN apt-get -y update
RUN apt-get -y install vim

RUN mkdir /srv/docker-bridge
ADD . /srv/docker-bridge

WORKDIR /srv/docker-bridge

RUN chmod +x tools/cpptest

RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000","--noreload"]
