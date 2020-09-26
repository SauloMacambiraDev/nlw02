# This docker file constructs a MySQL database instance

FROM mysql:latest 

ADD . /gdms-rcon/mysql
WORKDIR /gdms-rcon/mysql

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3306