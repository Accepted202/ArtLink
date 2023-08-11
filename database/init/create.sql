USE mysql;
FLUSH PRIVILEGES;
create user 'admin1'@'%' identified by 's09_a202_mysql';
create user 'admin2'@'%' identified by 's09_a202_mysql';
GRANT ALL PRIVILEGES ON artlink.* TO 'admin1'@'%' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON bridge.* TO 'admin2'@'%' WITH GRANT OPTION;
CREATE DATABASE artlink;
CREATE DATABASE bridge;
FLUSH PRIVILEGES;
