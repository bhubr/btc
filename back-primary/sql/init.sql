CREATE DATABASE wcs_bitconseil_dev CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'bitconseilapp'@'localhost' IDENTIFIED BY 'bitconseilWCS31';
GRANT ALL PRIVILEGES ON wcs_bitconseil_dev.* TO 'bitconseilapp'@'localhost';
FLUSH PRIVILEGES;

CREATE DATABASE wcs_bitconseil_test CHARACTER SET utf8 COLLATE utf8_general_ci;
GRANT ALL PRIVILEGES ON wcs_bitconseil_test.* TO 'bitconseilapp'@'localhost';
FLUSH PRIVILEGES;