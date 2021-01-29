CREATE DATABASE  IF NOT EXISTS `reimbursement_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `reimbursement_system`;
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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `_categoryId` int unsigned NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`_categoryId`),
  UNIQUE KEY `_categoryId_UNIQUE` (`_categoryId`),
  UNIQUE KEY `categoryName_UNIQUE` (`categoryName`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Advertising','2020-10-27 00:00:00','2020-10-27 00:00:00'),(2,'Car & Truck Expenses','2020-10-27 00:00:00','2020-10-27 00:00:00'),(3,'Contractors','2020-10-27 00:00:00','2020-10-27 00:00:00'),(4,'Education & Training','2020-10-27 00:00:00','2020-10-27 00:00:00'),(5,'Employee Benefits','2020-10-27 00:00:00','2020-10-27 00:00:00'),(6,'Meals & Entertainment','2020-10-27 00:00:00','2020-10-27 00:00:00'),(7,'Office Expenses & Postage','2020-10-27 00:00:00','2020-10-27 00:00:00'),(8,'Rent or Lease','2020-10-27 00:00:00','2020-10-27 00:00:00'),(9,'Travel','2020-10-27 00:00:00','2020-10-27 00:00:00'),(10,'Utilities','2020-10-27 00:00:00','2020-10-27 00:00:00');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devs`
--

DROP TABLE IF EXISTS `devs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devs` (
  `_devId` int unsigned NOT NULL AUTO_INCREMENT,
  `devName` varchar(255) NOT NULL,
  `devCode` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`_devId`),
  UNIQUE KEY `_devId_UNIQUE` (`_devId`),
  UNIQUE KEY `devName_UNIQUE` (`devName`),
  UNIQUE KEY `devCode_UNIQUE` (`devCode`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devs`
--

LOCK TABLES `devs` WRITE;
/*!40000 ALTER TABLE `devs` DISABLE KEYS */;
INSERT INTO `devs` VALUES (1,'ACTION','ACTION','2020-10-24 00:00:00','2020-10-24 00:00:00'),(2,'Administration','Admin','2020-10-24 00:00:00','2020-10-24 00:00:00'),(3,'C4I','C4I','2020-10-24 00:00:00','2020-10-24 00:00:00'),(4,'Development 2','Dev 2','2020-10-24 00:00:00','2020-10-24 00:00:00'),(5,'Development 3','Dev 3','2020-10-24 00:00:00','2020-10-24 00:00:00'),(6,'Development 6','Dev 6','2020-10-24 00:00:00','2020-10-24 00:00:00'),(7,'Development A','Dev A','2020-10-24 00:00:00','2020-10-24 00:00:00'),(8,'Development B','Dev B','2020-10-24 00:00:00','2020-10-24 00:00:00'),(9,'Development C','Dev C','2020-10-24 00:00:00','2020-10-24 00:00:00'),(10,'Development D','Dev D','2020-10-24 00:00:00','2020-10-24 00:00:00'),(11,'Development E','Dev E','2020-10-24 00:00:00','2020-10-24 00:00:00'),(12,'Development F','Dev F','2020-10-24 00:00:00','2020-10-24 00:00:00'),(13,'Development G','Dev G','2020-10-24 00:00:00','2020-10-24 00:00:00'),(14,'Development H','Dev H','2020-10-24 00:00:00','2020-10-24 00:00:00'),(15,'Development I','Dev I','2020-10-24 00:00:00','2020-10-24 00:00:00'),(16,'Development J','Dev J','2020-10-24 00:00:00','2020-10-24 00:00:00'),(17,'Development L','Dev L','2020-10-24 00:00:00','2020-10-24 00:00:00'),(18,'Development M','Dev M','2020-10-24 00:00:00','2020-10-24 00:00:00'),(19,'Development N','Dev N','2020-10-24 00:00:00','2020-10-24 00:00:00'),(20,'Finance Department','Finance','2020-10-24 00:00:00','2020-10-24 00:00:00'),(21,'Management Information System Department','MIS','2020-10-24 00:00:00','2020-10-24 00:00:00'),(22,'Operations Department','Operations','2020-10-24 00:00:00','2020-10-24 00:00:00'),(23,'Quality and Service Department','Q&S','2020-10-24 00:00:00','2020-10-24 00:00:00'),(24,'Resource Department','RD','2020-10-24 00:00:00','2020-10-24 00:00:00'),(25,'Other','Other','2020-10-24 00:00:00','2020-10-24 00:00:00');
/*!40000 ALTER TABLE `devs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `_itemId` int unsigned NOT NULL AUTO_INCREMENT,
  `_reimbursementId` int unsigned NOT NULL,
  `item` varchar(255) NOT NULL,
  `qty` int unsigned NOT NULL DEFAULT '1',
  `cost` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `approved` tinyint NOT NULL DEFAULT '0',
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`_itemId`),
  KEY `fk_reimbursementId_idx` (`_reimbursementId`),
  CONSTRAINT `fk_reimbursementId` FOREIGN KEY (`_reimbursementId`) REFERENCES `reimbursements` (`_reimbursementId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offices`
--

DROP TABLE IF EXISTS `offices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offices` (
  `_officeId` int unsigned NOT NULL AUTO_INCREMENT,
  `officeName` varchar(255) NOT NULL,
  `officeCode` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`_officeId`),
  UNIQUE KEY `_officeId_UNIQUE` (`_officeId`),
  UNIQUE KEY `officeCode_UNIQUE` (`officeCode`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offices`
--

LOCK TABLES `offices` WRITE;
/*!40000 ALTER TABLE `offices` DISABLE KEYS */;
INSERT INTO `offices` VALUES (1,'Unit 501, 5F ATC BPO 1, Madrigal Avenue, Alabang Town Center, Ayala Alabang, Muntinlupa City 1770','ALB SOL','2020-10-24 00:00:00','2020-10-24 00:00:00'),(2,'Unit 501, 5F ATC BPO 1, Madrigal Avenue, Alabang Town Center, Ayala Alabang, Muntinlupa City 1770','ALB SYS','2020-10-24 00:00:00','2020-10-24 00:00:00'),(3,'Ground Floor, i1 Building, Cebu IT Park, Apas, Cebu City 6000 Philippines','CEB SOL','2020-10-24 00:00:00','2020-10-24 00:00:00'),(4,'5F PDI Condominium, Archbishop Reyes Ave. cor. Panis St., Banilad Cebu City 6000, Philippines','CEB SYS','2020-10-24 00:00:00','2020-10-24 00:00:00'),(5,'2nd Floor SM JAZZ Residences, Jupiter Corner N. Garcia Streets, Bel-Air Village, Makati City 1200 Philippines','DENSO','2020-10-24 00:00:00','2020-10-24 00:00:00'),(6,'1st Floor Unit B, Multinational Bancorporation Building 6805 Ayala Avenue, Makati City 1226 Philippines','MKT 1F','2020-10-24 00:00:00','2020-10-24 00:00:00'),(7,'3rd Floor Unit B, Multinational Bancorporation Building 6805 Ayala Avenue, Makati City 1226 Philippines','MKT 3F','2020-10-24 00:00:00','2020-10-24 00:00:00'),(8,'Other Sites','Other Sites','2020-10-24 00:00:00','2020-10-24 00:00:00');
/*!40000 ALTER TABLE `offices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `positions` (
  `_positionId` int unsigned NOT NULL AUTO_INCREMENT,
  `positionName` varchar(255) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`_positionId`),
  UNIQUE KEY `_positionId_UNIQUE` (`_positionId`),
  UNIQUE KEY `positionName_UNIQUE` (`positionName`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions`
--

LOCK TABLES `positions` WRITE;
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` VALUES (1,'Administrative Assistant','2020-10-24 00:00:00','2020-10-24 00:00:00'),(2,'Administrative Associate','2020-10-24 00:00:00','2020-10-24 00:00:00'),(3,'Administrative Staff','2020-10-24 00:00:00','2020-10-24 00:00:00'),(4,'Administrative Supervisor','2020-10-24 00:00:00','2020-10-24 00:00:00'),(5,'Application Developer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(6,'Assistant Product Quality Assurance Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(7,'Assistant Research and Development Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(8,'Assistant Software Quality Assurance Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(9,'Assistant Vice President','2020-10-24 00:00:00','2020-10-24 00:00:00'),(10,'Associate Product Quality Assurance Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(11,'Associate Research and Development Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(12,'Associate Software Quality Assurance Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(13,'CEO and President','2020-10-24 00:00:00','2020-10-24 00:00:00'),(14,'Driver','2020-10-24 00:00:00','2020-10-24 00:00:00'),(15,'Executive Vice President and Chief Operating Officer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(16,'Finance Assistant','2020-10-24 00:00:00','2020-10-24 00:00:00'),(17,'Finance Associate','2020-10-24 00:00:00','2020-10-24 00:00:00'),(18,'Finance Manager','2020-10-24 00:00:00','2020-10-24 00:00:00'),(19,'Finance Senior Associate','2020-10-24 00:00:00','2020-10-24 00:00:00'),(20,'Finance Supervisor','2020-10-24 00:00:00','2020-10-24 00:00:00'),(21,'Image Labeling Operator','2020-10-24 00:00:00','2020-10-24 00:00:00'),(22,'ISO Compliance Staff','2020-10-24 00:00:00','2020-10-24 00:00:00'),(23,'Japanese Language Advisor','2020-10-24 00:00:00','2020-10-24 00:00:00'),(24,'Japanese Language Consultant','2020-10-24 00:00:00','2020-10-24 00:00:00'),(25,'Japanese Translator','2020-10-24 00:00:00','2020-10-24 00:00:00'),(26,'Java Developer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(27,'Junior Product Quality Assurance Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(28,'Junior Programmer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(29,'Junior Research and Development Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(30,'Junior Software Quality Assurance Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(31,'Marketing Specialist','2020-10-24 00:00:00','2020-10-24 00:00:00'),(32,'Messenger','2020-10-24 00:00:00','2020-10-24 00:00:00'),(33,'MIS System Administrator','2020-10-24 00:00:00','2020-10-24 00:00:00'),(34,'Mobile Development Consultant','2020-10-24 00:00:00','2020-10-24 00:00:00'),(35,'Product Quality Assurance Advisor','2020-10-24 00:00:00','2020-10-24 00:00:00'),(36,'Product Quality Assurance Supervisor','2020-10-24 00:00:00','2020-10-24 00:00:00'),(37,'RD Staff','2020-10-24 00:00:00','2020-10-24 00:00:00'),(38,'Research and Development Advisor','2020-10-24 00:00:00','2020-10-24 00:00:00'),(39,'Research and Development Assistant Manager','2020-10-24 00:00:00','2020-10-24 00:00:00'),(40,'Research and Development Manager','2020-10-24 00:00:00','2020-10-24 00:00:00'),(41,'Research and Development Supervisor','2020-10-24 00:00:00','2020-10-24 00:00:00'),(42,'Resource Development Assistant','2020-10-24 00:00:00','2020-10-24 00:00:00'),(43,'Resource Development Associate','2020-10-24 00:00:00','2020-10-24 00:00:00'),(44,'Resource Development Supervisor','2020-10-24 00:00:00','2020-10-24 00:00:00'),(45,'Senior Administrative Assistant','2020-10-24 00:00:00','2020-10-24 00:00:00'),(46,'Senior Administrative Associate','2020-10-24 00:00:00','2020-10-24 00:00:00'),(47,'Senior Administrative Officer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(48,'Senior Assistant Product Quality Assurance Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(49,'Senior Assistant Research and Development Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(50,'Senior Assistant Software Quality Assurance Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(51,'Senior Associate Product Quality Assurance Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(52,'Senior Associate Research and Development Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(53,'Senior Associate Software Quality Assurance Engineer','2020-10-24 00:00:00','2020-10-24 00:00:00'),(54,'Senior Finance Assistant','2020-10-24 00:00:00','2020-10-24 00:00:00'),(55,'Senior Finance Manager','2020-10-24 00:00:00','2020-10-24 00:00:00'),(56,'Senior Project Manager','2020-10-24 00:00:00','2020-10-24 00:00:00'),(57,'Senior Research and Development Advisor','2020-10-24 00:00:00','2020-10-24 00:00:00'),(58,'Senior Research and Development Manager','2020-10-24 00:00:00','2020-10-24 00:00:00'),(59,'Senior Resource Development Assistant','2020-10-24 00:00:00','2020-10-24 00:00:00'),(60,'Senior Resource Development Associate','2020-10-24 00:00:00','2020-10-24 00:00:00'),(61,'Senior Technical Trainor','2020-10-24 00:00:00','2020-10-24 00:00:00'),(62,'Senior VP and Chief Financial Officer, Administration','2020-10-24 00:00:00','2020-10-24 00:00:00'),(63,'Special Assistant to the President','2020-10-24 00:00:00','2020-10-24 00:00:00'),(64,'SQA Staff','2020-10-24 00:00:00','2020-10-24 00:00:00'),(65,'Technical Training Supervisor','2020-10-24 00:00:00','2020-10-24 00:00:00'),(66,'Technical Trainor','2020-10-24 00:00:00','2020-10-24 00:00:00'),(67,'Training Staff','2020-10-24 00:00:00','2020-10-24 00:00:00'),(68,'Vice President','2020-10-24 00:00:00','2020-10-24 00:00:00'),(69,'Vice President for Finance and Administration','2020-10-24 00:00:00','2020-10-24 00:00:00');
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipts`
--

DROP TABLE IF EXISTS `receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipts` (
  `_receiptId` int unsigned NOT NULL AUTO_INCREMENT,
  `_reimbursementId` int unsigned NOT NULL,
  `type` varchar(45) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `image` longblob NOT NULL,
  PRIMARY KEY (`_receiptId`),
  UNIQUE KEY `_receiptId_UNIQUE` (`_receiptId`),
  KEY `fk_receipt_reimbursementId_idx` (`_reimbursementId`),
  CONSTRAINT `fk_receipt_reimbursementId` FOREIGN KEY (`_reimbursementId`) REFERENCES `reimbursements` (`_reimbursementId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipts`
--

LOCK TABLES `receipts` WRITE;
/*!40000 ALTER TABLE `receipts` DISABLE KEYS */;
/*!40000 ALTER TABLE `receipts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reimbursements`
--

DROP TABLE IF EXISTS `reimbursements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reimbursements` (
  `_reimbursementId` int unsigned NOT NULL AUTO_INCREMENT,
  `_userId` varchar(255) NOT NULL,
  `_managerId` varchar(255) NOT NULL,
  `_categoryId` int unsigned NOT NULL,
  `purpose` varchar(255) NOT NULL,
  `totalCost` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `plannedDate` datetime NOT NULL,
  `status` tinyint DEFAULT '0',
  `remarks` varchar(255) DEFAULT NULL,
  `approvalDate` datetime DEFAULT NULL,
  `rejectionDate` datetime DEFAULT NULL,
  `releaseDate` datetime DEFAULT NULL,
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`_reimbursementId`),
  UNIQUE KEY `_reimbursementId_UNIQUE` (`_reimbursementId`),
  KEY `fk_categoryId_idx` (`_categoryId`),
  KEY `fk_userId_idx` (`_userId`),
  KEY `fk_managerId_idx` (`_managerId`),
  CONSTRAINT `fk_categoryId` FOREIGN KEY (`_categoryId`) REFERENCES `categories` (`_categoryId`),
  CONSTRAINT `fk_managerId` FOREIGN KEY (`_managerId`) REFERENCES `users` (`_userId`),
  CONSTRAINT `fk_userId` FOREIGN KEY (`_userId`) REFERENCES `users` (`_userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reimbursements`
--

LOCK TABLES `reimbursements` WRITE;
/*!40000 ALTER TABLE `reimbursements` DISABLE KEYS */;
/*!40000 ALTER TABLE `reimbursements` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `users` VALUES (1,'071700126',8,6,58,'Bert','Norberto',NULL,'Caldit','Jr.',0,'bert','aws.teampoc@gmail.com','$2b$10$E72YQkgx8I3c1FnLW/4d5uIkUudtPWOGPoUN.1j/lTyMLGNexh22i',1,'2020-10-28 15:37:07','2020-10-28 15:37:07'),(2,'0902191173',8,6,7,'Kenny','Kenneth','Caro','Karamihan',NULL,0,'kenny','kenneth.karamihan@awsys-i.com','$2b$10$gZJbZzNLLVW7.tSfFQqNU.M1HJTINyr3XCnBgJCUzTE9F4p52mOCu',0,'2020-10-24 15:58:22','2021-01-28 20:45:49'),(3,'071017849',20,6,54,'Eunice','Eunice Rozel','Fabula','Juan',NULL,1,'eunice','eunice.juan@awsys-i.com','$2b$10$tgA9ApsK4K7nu.DQLCVBsuXLXT1PAwfhS4lgqyZZKx5P/d0O/wQoa',2,'2021-01-28 00:00:00','2021-01-28 20:48:14');
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

-- Dump completed on 2021-01-29  8:51:39
