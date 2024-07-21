FROM mysql

ARG DB_PORT

EXPOSE ${DB_PORT}

COPY init.sh /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/init.sh

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["mysqld"]