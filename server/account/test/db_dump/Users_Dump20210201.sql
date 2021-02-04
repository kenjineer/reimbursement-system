-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: reimbursement_system
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `_tableId` int unsigned NOT NULL AUTO_INCREMENT,
  `_userId` varchar(255) NOT NULL,
  `_devId` int unsigned NOT NULL,
  `_officeId` int unsigned NOT NULL,
  `_positionId` int unsigned NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) NOT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) NOT NULL,
  `suffix` varchar(45) DEFAULT NULL,
  `gender` tinyint NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `authority` int unsigned NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`_tableId`),
  UNIQUE KEY `_id_UNIQUE` (`_userId`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `_tableId_UNIQUE` (`_tableId`),
  KEY `fk_devId_idx` (`_devId`),
  KEY `fk_officeId_idx` (`_officeId`),
  KEY `fk_positionId_idx` (`_positionId`),
  CONSTRAINT `fk_devId` FOREIGN KEY (`_devId`) REFERENCES `devs` (`_devId`),
  CONSTRAINT `fk_officeId` FOREIGN KEY (`_officeId`) REFERENCES `offices` (`_officeId`),
  CONSTRAINT `fk_positionId` FOREIGN KEY (`_positionId`) REFERENCES `positions` (`_positionId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'071700126',8,7,58,'Bert','Norberto',NULL,'Caldit','Jr.',0,'bert','aws.teampoc@gmail.com','$2b$10$E72YQkgx8I3c1FnLW/4d5uIkUudtPWOGPoUN.1j/lTyMLGNexh22i',1,'2020-10-28 15:37:07','2020-10-28 15:37:07'),(2,'0902191173',8,7,7,'Ken','Kenneth','Caro','Karamihan',NULL,0,'kenken','kenneth.karamihan@awsys-i.com','$2b$10$N8UYLOhaB9mj.qTNufvOnev3j0QIw2VD9O3IDdszoMBF0v/eIRi4a',0,'2020-10-24 15:58:22','2021-02-01 17:39:34'),(3,'071017849',20,6,54,'Eunice','Eunice Rozel','Fabula','Juan',NULL,1,'eunice','kennethkaramihan@gmail.com','$2b$10$tgA9ApsK4K7nu.DQLCVBsuXLXT1PAwfhS4lgqyZZKx5P/d0O/wQoa',2,'2021-01-28 00:00:00','2021-01-28 20:48:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-01 18:56:23
