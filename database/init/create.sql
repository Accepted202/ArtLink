USE mysql;
FLUSH PRIVILEGES;
create user 'admin1'@'%' identified by 's09_a202_mysql';
GRANT ALL PRIVILEGES ON artlink.* TO 'admin1'@'%';
GRANT ALL PRIVILEGES ON bridge.* TO 'admin1'@'%';
CREATE DATABASE artlink;
CREATE DATABASE bridge;
CREATE DATABASE test;
FLUSH PRIVILEGES;
