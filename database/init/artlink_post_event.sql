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
-- Table structure for table `post_event`
--

DROP TABLE IF EXISTS `post_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_event` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `art_work_pk` bigint DEFAULT NULL,
  `exhibition_pk` int DEFAULT NULL,
  `gallery_pk` int DEFAULT NULL,
  `userkey_pk` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK778r7mgjrgn4c45o914ykx9o` (`art_work_pk`),
  KEY `FK3hr3h32o1fehflmeve6maf5dn` (`exhibition_pk`),
  KEY `FKt602gxweuq350a27kiytose5w` (`gallery_pk`),
  KEY `FKpkt3jfy0a9ugbe6io7dwr8t0i` (`userkey_pk`),
  CONSTRAINT `FK3hr3h32o1fehflmeve6maf5dn` FOREIGN KEY (`exhibition_pk`) REFERENCES `exhibition` (`exhibition_pk`),
  CONSTRAINT `FK778r7mgjrgn4c45o914ykx9o` FOREIGN KEY (`art_work_pk`) REFERENCES `art_work` (`art_work_pk`),
  CONSTRAINT `FKpkt3jfy0a9ugbe6io7dwr8t0i` FOREIGN KEY (`userkey_pk`) REFERENCES `user_key` (`userkey_pk`),
  CONSTRAINT `FKt602gxweuq350a27kiytose5w` FOREIGN KEY (`gallery_pk`) REFERENCES `gallery` (`gallery_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_event`
--

LOCK TABLES `post_event` WRITE;
/*!40000 ALTER TABLE `post_event` DISABLE KEYS */;
INSERT INTO `post_event` VALUES (1,1,NULL,NULL,1),(2,3,NULL,NULL,1),(3,4,NULL,NULL,1),(4,5,NULL,NULL,1);
/*!40000 ALTER TABLE `post_event` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:32:31
