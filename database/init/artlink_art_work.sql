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
-- Table structure for table `art_work`
--

DROP TABLE IF EXISTS `art_work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `art_work` (
  `art_work_pk` bigint NOT NULL AUTO_INCREMENT,
  `artist` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `explanation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paint_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `x_coor` double DEFAULT NULL,
  `y_coor` double DEFAULT NULL,
  `exhibition_pk` int DEFAULT NULL,
  PRIMARY KEY (`art_work_pk`),
  KEY `FKncrpbno747f2nrqeao9fcf16g` (`exhibition_pk`),
  CONSTRAINT `FKncrpbno747f2nrqeao9fcf16g` FOREIGN KEY (`exhibition_pk`) REFERENCES `exhibition` (`exhibition_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `art_work`
--

LOCK TABLES `art_work` WRITE;
/*!40000 ALTER TABLE `art_work` DISABLE KEYS */;
INSERT INTO `art_work` VALUES (1,'박건희','Favorite Drawing 1','산 위에서의 구름 풍경','https://a202-s3-bucket.s3.ap-northeast-2.amazonaws.com/artworks/1/32b0a149-7705-4608-96e4-8ed3b8dce1fb-%22%EC%82%B0%20%EC%9C%84%EC%97%90%EC%84%9C%EC%9D%98%20%EA%B5%AC%EB%A6%84%20%ED%92%8D%EA%B2%BD%22',0,7.5,1),(2,'김수현','Favorite Drawing 2','비행기의 이륙','https://a202-s3-bucket.s3.ap-northeast-2.amazonaws.com/artworks/1/977f1cc2-0bcf-4b9c-9d3f-a899d4f84f52-%EB%B9%84%ED%96%89%EA%B8%B0%EC%9D%98%20%EC%9D%B4%EB%A5%99',0,4.8,1),(3,'조재웅','Favorite Drawing 3','골짜기','https://a202-s3-bucket.s3.ap-northeast-2.amazonaws.com/artworks/1/6cd0be03-7690-4300-96e2-ce1ccc2f2988-%EA%B3%A8%EC%A7%9C%EA%B8%B0',0,1.8,1),(4,'배정원','Favorite Drawing 4','피리부는 소년','https://a202-s3-bucket.s3.ap-northeast-2.amazonaws.com/artworks/1/21a0af4c-9152-4c10-b245-d452ef599459-%ED%94%BC%EB%A6%AC%EB%B6%80%EB%8A%94%20%EC%86%8C%EB%85%84',7.7,3.15,1),(5,'조준하','Favorite Drawing 5','야경','https://a202-s3-bucket.s3.ap-northeast-2.amazonaws.com/artworks/1/cc74e3b9-6080-4de6-9db4-bb7a512f4d2d-%EC%95%BC%EA%B2%BD',7.7,6.3,1);
/*!40000 ALTER TABLE `art_work` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:32:30
