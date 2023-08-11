FROM mysql:8.0.33

ADD ./init /docker-entrypoint-initdb.d/

EXPOSE 3306

CMD [ "mysqld" ]