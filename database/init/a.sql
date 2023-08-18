<<<<<<< HEAD:database/init/create.sql
USE mysql;
FLUSH PRIVILEGES;
CREATE DATABASE artlink;
CREATE DATABASE bridge;
create user 'admin1'@'%' identified by 's09_a202_mysql';
GRANT ALL PRIVILEGES ON artlink.* TO 'admin1'@'%';
GRANT ALL PRIVILEGES ON bridge.* TO 'admin1'@'%';
FLUSH PRIVILEGES;
=======
USE mysql;
FLUSH PRIVILEGES;
CREATE DATABASE artlink;
CREATE DATABASE bridge;
CREATE DATABASE test;
create user 'admin1'@'%' identified by 's09_a202_mysql';
GRANT ALL PRIVILEGES ON artlink.* TO 'admin1'@'%';
GRANT ALL PRIVILEGES ON bridge.* TO 'admin1'@'%';
FLUSH PRIVILEGES;
>>>>>>> f7b655d7c4f410f5aaddd059e62661be77521c0e:database/init/a.sql
