CREATE DATABASE  IF NOT EXISTS `autocar` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `autocar`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: autocar
-- ------------------------------------------------------
-- Server version	9.4.0

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
-- Table structure for table `billet`
--

DROP TABLE IF EXISTS `billet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billet` (
  `id_billet` int NOT NULL AUTO_INCREMENT,
  `id_voyage` int NOT NULL,
  `id_utilisateur` int NOT NULL,
  PRIMARY KEY (`id_billet`),
  KEY `id_voyage` (`id_voyage`),
  KEY `id_utilisateur` (`id_utilisateur`),
  CONSTRAINT `billet_ibfk_1` FOREIGN KEY (`id_voyage`) REFERENCES `voyages` (`id_voyage`) ON DELETE CASCADE,
  CONSTRAINT `billet_ibfk_2` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billet`
--

LOCK TABLES `billet` WRITE;
/*!40000 ALTER TABLE `billet` DISABLE KEYS */;
/*!40000 ALTER TABLE `billet` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `check_capacite_car` BEFORE INSERT ON `billet` FOR EACH ROW begin
	declare capacite_max int;
	declare billets_vendus int;
	select c.capacite into capacite_max
	from voyages V, car c
	where V.id_car = c.id_car and v.id_voyage = new.id_voyage;
	select count(*) into billets_vendus
	from billet
	where id_voyage = new.id_voyage;
	if billets_vendus >= capacite_max then
		signal sqlstate '45000'
		set message_text = 'erreur: autocar complet.';
	end if;

end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `id_car` int NOT NULL AUTO_INCREMENT,
  `capacite` int NOT NULL,
  `immatriculation` varchar(20) NOT NULL,
  PRIMARY KEY (`id_car`),
  UNIQUE KEY `immatriculation` (`immatriculation`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (1,50,'AB-123-CD'),(2,30,'EF-456-GH'),(3,60,'JK-789-LM');
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gare`
--

DROP TABLE IF EXISTS `gare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gare` (
  `id_gare` int NOT NULL AUTO_INCREMENT,
  `nom_gare` varchar(100) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  PRIMARY KEY (`id_gare`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gare`
--

LOCK TABLES `gare` WRITE;
/*!40000 ALTER TABLE `gare` DISABLE KEYS */;
INSERT INTO `gare` VALUES (1,'Rabat',' Rabat'),(2,'Casa',' Casablanca'),(3,'Kénitra','Kénitra'),(4,'Oujda','Oujda');
/*!40000 ALTER TABLE `gare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trajet`
--

DROP TABLE IF EXISTS `trajet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trajet` (
  `id_trajet` int NOT NULL AUTO_INCREMENT,
  `duree` time NOT NULL,
  `id_gare_depart` int NOT NULL,
  `id_gare_arrivee` int NOT NULL,
  PRIMARY KEY (`id_trajet`),
  KEY `id_gare_depart` (`id_gare_depart`),
  KEY `id_gare_arrivee` (`id_gare_arrivee`),
  CONSTRAINT `trajet_ibfk_1` FOREIGN KEY (`id_gare_depart`) REFERENCES `gare` (`id_gare`) ON DELETE CASCADE,
  CONSTRAINT `trajet_ibfk_2` FOREIGN KEY (`id_gare_arrivee`) REFERENCES `gare` (`id_gare`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trajet`
--

LOCK TABLES `trajet` WRITE;
/*!40000 ALTER TABLE `trajet` DISABLE KEYS */;
INSERT INTO `trajet` VALUES (1,'05:30:00',1,2),(2,'01:45:00',2,3),(3,'07:15:00',1,3),(4,'06:00:00',1,4),(5,'08:00:00',4,1),(6,'00:00:07',1,4),(7,'00:00:03',1,4),(8,'00:00:08',2,4),(9,'00:00:04',1,4),(10,'00:00:02',2,1);
/*!40000 ALTER TABLE `trajet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id_utilisateur` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'utilisateur',
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateurs` (
  `id_utilisateur` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'utilisateur',
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateurs`
--

LOCK TABLES `utilisateurs` WRITE;
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` VALUES (5,'Amrani','ALAEEDDINE','amranialae@gmail.com','2006','admin'),(6,'Alami','Amine','amine@gmail.com','2013','utilisateur'),(8,'Maliki','Imad','imad@gmail.com','2016','utilisateur');
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voyages`
--

DROP TABLE IF EXISTS `voyages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voyages` (
  `id_voyage` int NOT NULL AUTO_INCREMENT,
  `date_depart` datetime NOT NULL,
  `statut` varchar(20) DEFAULT 'PREVU',
  `id_car` int NOT NULL,
  `id_trajet` int NOT NULL,
  `prix` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id_voyage`),
  KEY `id_car` (`id_car`),
  KEY `id_trajet` (`id_trajet`),
  CONSTRAINT `voyages_ibfk_1` FOREIGN KEY (`id_car`) REFERENCES `car` (`id_car`) ON DELETE CASCADE,
  CONSTRAINT `voyages_ibfk_2` FOREIGN KEY (`id_trajet`) REFERENCES `trajet` (`id_trajet`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voyages`
--

LOCK TABLES `voyages` WRITE;
/*!40000 ALTER TABLE `voyages` DISABLE KEYS */;
INSERT INTO `voyages` VALUES (9,'2026-06-27 10:30:00','PREVU',1,9,150.00),(10,'2026-07-28 10:00:00','PREVU',1,10,160.00);
/*!40000 ALTER TABLE `voyages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-19 19:28:22
