-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: i9a202.p.ssafy.io    Database: artlink
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user_key`
--

DROP TABLE IF EXISTS `user_key`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_key` (
  `userkey_pk` bigint NOT NULL AUTO_INCREMENT,
  `hash_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` bigint DEFAULT NULL,
  `visit_date` date DEFAULT NULL,
  `exhibition_pk` int DEFAULT NULL,
  `gallery_pk` int DEFAULT NULL,
  `user_pk` int DEFAULT NULL,
  PRIMARY KEY (`userkey_pk`),
  KEY `FKau7eo498ej5iu8hsgq04e8oah` (`exhibition_pk`),
  KEY `FKiv7mkrlnuj9uebj6nos4yhijb` (`gallery_pk`),
  KEY `FKsg5w59qeinhtyuy07oo7y3fx` (`user_pk`),
  CONSTRAINT `FKau7eo498ej5iu8hsgq04e8oah` FOREIGN KEY (`exhibition_pk`) REFERENCES `exhibition` (`exhibition_pk`),
  CONSTRAINT `FKiv7mkrlnuj9uebj6nos4yhijb` FOREIGN KEY (`gallery_pk`) REFERENCES `gallery` (`gallery_pk`),
  CONSTRAINT `FKsg5w59qeinhtyuy07oo7y3fx` FOREIGN KEY (`user_pk`) REFERENCES `user` (`user_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_key`
--

LOCK TABLES `user_key` WRITE;
/*!40000 ALTER TABLE `user_key` DISABLE KEYS */;
INSERT INTO `user_key` VALUES (1,'4',NULL,'2023-08-18',1,1,2);
/*!40000 ALTER TABLE `user_key` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:32:27
