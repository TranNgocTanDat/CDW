-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: beprojectweb
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` binary(16) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `street` varchar(255) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKr1tcj8kqft8gecp5kmnarw7cs` (`user_id`),
  CONSTRAINT `FKr1tcj8kqft8gecp5kmnarw7cs` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `total_amount` decimal(38,2) DEFAULT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK9emlp6m95v5er2bcqkjsw48he` (`user_id`),
  CONSTRAINT `FKl70asp4l4w0jmbm1tqyofho4o` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1050000.00,_binary '���P�E����y\���');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `total_price` decimal(38,2) NOT NULL,
  `cart_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1uobyhgl1wvgt1jpccia8xxs3` (`cart_id`),
  KEY `FKjcyd5wv4igqnw413rgxbfu4nv` (`product_id`),
  CONSTRAINT `FK1uobyhgl1wvgt1jpccia8xxs3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `FKjcyd5wv4igqnw413rgxbfu4nv` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` VALUES (5,500000.00,1,2),(6,550000.00,1,3);
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `cate_id` bigint NOT NULL AUTO_INCREMENT,
  `count` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url_image` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`cate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,0,'action','Action','https://images.hdqwalls.com/wallpapers/pubg-new-season-2020-4k-io.jpg',NULL,NULL),(2,0,'Game thể thao điện tử ','Sport','https://us.v-cdn.net/6036147/uploads/A7UPGM8J41AZ/d-29-1-1-1200x675.jpg',NULL,NULL),(3,0,'Trò chơi nhập vai với sự phát triển nhân vật, cốt truyện phong phú và khả năng đưa ra quyết định. ','RPG','https://i.ytimg.com/vi/U8rwx-nnHrA/maxresdefault.jpg',NULL,NULL),(4,0,'Các trò chơi đề cao việc lập kế hoạch cẩn thận và quản lý tài nguyên để đạt được chiến thắng.','Strategy','https://media.wired.co.uk/photos/606dae60f19707fe1aef38f4/16:9/w_2560%2Cc_limit/CivilizationVI_screenshot_announce1.jpg',NULL,NULL),(5,0,'Các trò chơi dựa trên cốt truyện nhấn mạnh vào việc khám phá và giải đố trong những thế giới sống động.','Adventure','https://www.creativefabrica.com/wp-content/uploads/2022/11/25/Adventure-Game-Scene-Background-Image-Sunrise-City-Street-In-Large-48470781-1.png',NULL,NULL),(6,0,'Các trò chơi đấu trường trực tuyến nhiều người chơi, nơi hai đội thi đấu để phá hủy căn cứ của đối phương, yêu cầu chiến thuật và phối hợp đồng đội cao.','MOBA','https://firstsportz.com/wp-content/uploads/2023/04/IMG_COM_20230403_2245_43_6021-750x536.jpg',NULL,NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `product_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FK6uv0qku8gsu6x1r2jkrtqwjtn` (`product_id`),
  CONSTRAINT `FK6uv0qku8gsu6x1r2jkrtqwjtn` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_keys`
--

DROP TABLE IF EXISTS `game_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_keys` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `game_key` varchar(255) DEFAULT NULL,
  `game_name` varchar(255) DEFAULT NULL,
  `user_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_keys`
--

LOCK TABLES `game_keys` WRITE;
/*!40000 ALTER TABLE `game_keys` DISABLE KEYS */;
INSERT INTO `game_keys` VALUES (1,'afe59ce4','Eternal Quest IX',_binary '���P�E����y\���'),(2,'be2f4477','Medieval Legends',_binary 'M\�-�\�3E;��I�wƍ'),(3,'a369095a','Cyber Nexus 2077',_binary 'M\�-�\�3E;��I�wƍ'),(4,'134fb555','Cyber Nexus 2077',_binary 'M\�-�\�3E;��I�wƍ'),(5,'7f84914a','Medieval Legends',_binary 'M\�-�\�3E;��I�wƍ'),(6,'c568e3ce','Eternal Quest IX',_binary '���P�E����y\���'),(7,'50412e2e','Cyber Nexus 2077',_binary '���P�E����y\���'),(8,'d99736d1','Galaxy Warriors',_binary '���P�E����y\���'),(9,'2a546614','Galaxy Warriors',_binary '���P�E����y\���'),(10,'20edfd6b','Eternal Quest IX',_binary '���P�E����y\���');
/*!40000 ALTER TABLE `game_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_custom`
--

DROP TABLE IF EXISTS `order_custom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_custom` (
  `id` binary(16) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `paid_at` datetime(6) DEFAULT NULL,
  `quantity` int NOT NULL,
  `quoted_price` decimal(38,2) DEFAULT NULL,
  `status` enum('AWAITING_PAYMENT','CANCELED','PAID','PENDING_QUOTE','QUOTED','REJECTED') DEFAULT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKepp6edvmf0k8yuio9ub1gv282` (`user_id`),
  CONSTRAINT `FKepp6edvmf0k8yuio9ub1gv282` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_custom`
--

LOCK TABLES `order_custom` WRITE;
/*!40000 ALTER TABLE `order_custom` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_custom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_custom_file_urls`
--

DROP TABLE IF EXISTS `order_custom_file_urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_custom_file_urls` (
  `order_custom_id` binary(16) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  KEY `FK88ug5u4p8joupdhpg9jeqp301` (`order_custom_id`),
  CONSTRAINT `FK88ug5u4p8joupdhpg9jeqp301` FOREIGN KEY (`order_custom_id`) REFERENCES `order_custom` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_custom_file_urls`
--

LOCK TABLES `order_custom_file_urls` WRITE;
/*!40000 ALTER TABLE `order_custom_file_urls` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_custom_file_urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `total_price` decimal(38,2) DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt4dc2r9nbvbujrljv3e23iibt` (`order_id`),
  KEY `FK551losx9j75ss5d6bfsqvijna` (`product_id`),
  CONSTRAINT `FK551losx9j75ss5d6bfsqvijna` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `FKt4dc2r9nbvbujrljv3e23iibt` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,550000.00,1,3),(2,500000.00,2,2);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` binary(16) NOT NULL,
  `item_price` double DEFAULT NULL,
  `quantity` int NOT NULL,
  `order_id` binary(16) NOT NULL,
  `product_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKocimc7dtr037rh4ls4l95nlfi` (`product_id`),
  CONSTRAINT `FKocimc7dtr037rh4ls4l95nlfi` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `payment_at` datetime(6) DEFAULT NULL,
  `payment_method` varchar(255) NOT NULL,
  `status` enum('CANCELLED','COMPLETED','PAID','PENDING') DEFAULT NULL,
  `total_price` decimal(38,2) DEFAULT NULL,
  `user_id` binary(16) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `expected_delivery_date` datetime(6) DEFAULT NULL,
  `order_date` datetime(6) DEFAULT NULL,
  `order_status` enum('CANCELLED','PAID','PENDING','SHIPPED') NOT NULL,
  `total_amount` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`),
  CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2025-06-16 18:12:19.529028',NULL,'MOMO','PAID',550000.00,_binary '���P�E����y\���',NULL,NULL,NULL,NULL,'CANCELLED',0),(2,'2025-06-18 10:04:45.893122',NULL,'MOMO','PAID',500000.00,_binary '���P�E����y\���',NULL,NULL,NULL,NULL,'CANCELLED',0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `stock` int NOT NULL,
  `cate_id` bigint DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FKll9b6w9lwjkhiymqatom6jbd` (`cate_id`),
  CONSTRAINT `FKll9b6w9lwjkhiymqatom6jbd` FOREIGN KEY (`cate_id`) REFERENCES `category` (`cate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Liên Minh Huyền Thoại (League of Legends) là tựa game MOBA nổi tiếng toàn cầu, nơi người chơi tham gia vào các trận đấu 5v5 đầy chiến thuật, phối hợp đồng đội, và kỹ năng để phá huỷ nhà chính của đối phương.','https://images3.alphacoders.com/136/1369675.jpeg',200000.00,'Liên Minh Huyền Thoại',5,3,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(2,'Phần mới nhất trong loạt game JRPG huyền thoại. Hãy bắt đầu một hành trình sử thi xuyên qua những vùng đất kỳ ảo, chiến đấu với những quái vật đáng sợ và khám phá những bí mật của thế giới cổ đại.','https://repacklab.com/wp-content/uploads/2024/01/Heroes-of-Eternal-Quest-Video-Game-Free-Download-Repacklab-2.jpg',500000.00,'Eternal Quest IX',5,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(3,'Một trò chơi mô phỏng chiến đấu không gian đưa bạn vào buồng lái của các chiến đấu cơ tinh vi. Bảo vệ phe phái của bạn, hoàn thành các nhiệm vụ và thống trị thiên hà trong những trận dogfight căng thẳng.','https://upload.mguwp.net/store/GalaxyWarriors/s1.jpg',550000.00,'Galaxy Warriors',5,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(4,'Một trò chơi chiến lược lấy cảm hứng từ lịch sử, nơi bạn xây dựng vương quốc của mình, tạo liên minh, tiến hành chiến tranh và điều hướng chính trị phức tạp của châu Âu thời Trung cổ.','https://upload.mguwp.net/store/GalaxyWarriors/s1.jpg',350000.00,'Medieval Legends',50,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(5,'Phần mới nhất trong loạt game JRPG huyền thoại. Hãy bắt đầu một hành trình sử thi xuyên qua những vùng đất kỳ ảo, chiến đấu với những quái vật đáng sợ và khám phá những bí mật của thế giới cổ đại.','https://repacklab.com/wp-content/uploads/2024/01/Heroes-of-Eternal-Quest-Video-Game-Free-Download-Repacklab-2.jpg',600000.00,'Cyber Nexus 2077',1,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(16,'Một game hành động góc nhìn thứ ba với các pha chiến đấu chặt chém đẹp mắt, người chơi vào vai những thợ săn quỷ đầy phong cách.','https://tse2.mm.bing.net/th?id=OIP.FvAOJwcwYFzEyuAUWGXY_gHaEK&pid=Api&P=0&h=220',420000.00,'Devil May Cry 5',5,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(17,'Kratos trở lại trong một cuộc phiêu lưu đẫm máu và cảm xúc cùng con trai của mình, khám phá thế giới Bắc Âu đầy huyền bí và nguy hiểm.','https://coolwallpapers.me/picsup/5838981-kratos-god-of-war-4-god-of-war-games-ps-games-hd-artstation.jpg',550000.00,'God of War',5,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(18,'Một game hành động lén lút pha trộn chiến đấu kiếm đạo trong thời kỳ Sengoku của Nhật Bản, nơi kỹ năng và chiến thuật là sống còn.','https://cdn.mobygames.com/covers/6251820-sekiro-shadows-die-twice-xbox-one-front-cover.jpg',480000.00,'Sekiro: Shadows Die Twice',5,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(19,'Một tựa game hành động hack-and-slash tốc độ cao với nhân vật chính là nữ phù thủy chiến đấu bằng các đòn combo mãn nhãn.','https://imgix.ranker.com/user_node_img/3162/63220916/original/63220916-photo-u14?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=650',300000.00,'Bayonetta',5,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(20,'Game hành động chặt chém tốc độ cao kết hợp với phong cách cyberpunk đặc trưng, nơi người chơi điều khiển Raiden chiến đấu với các cyborg.','https://m.media-amazon.com/images/M/MV5BODg0MjgzN2EtMTU0Yi00NGFmLTgzNWItNzk0ODM4NzYxNTgzXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg',370000.00,'Metal Gear Rising: Revengeance',5,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(21,'Một siêu phẩm hành động nhập vai thế giới mở kết hợp giữa Dark Souls và thế giới thần thoại kỳ bí.','https://assets-prd.ignimgs.com/2021/06/12/elden-ring-button-03-1623460560664.jpg',790000.00,'Elden Ring',5,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(22,'Tựa game hành động roguelike nhanh, đẹp và có chiều sâu cốt truyện cực kỳ hấp dẫn.','https://image.jeuxvideo.com/medias/161367/1613665411-7537-jaquette-avant.png',320000.00,'Hades',5,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(23,'Hành trình của một Samurai chống lại quân xâm lược Mông Cổ trên đảo Tsushima tuyệt đẹp.','https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/09/ghost-of-tsushima-poster.jpg',780000.00,'Ghost of Tsushima',5,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(24,'Hoá thân thành Batman chiến đấu chống lại tội phạm trong Gotham đầy u ám.','https://m.media-amazon.com/images/G/02/aplusautomation/vendorimages/ba6c1c37-5d9b-47a5-95f2-c1d55fb5903b.jpg._CB329418280_.jpg',310000.00,'Batman: Arkham Knight',5,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(25,'Trải nghiệm thế giới mở của New York trong vai Người Nhện với những pha hành động mượt mà.','https://cdn1.epicgames.com/offer/4bc43145bb8245a5b5cc9ea262ffbe0e/EGS_MarvelsSpiderManRemastered_InsomniacGamesNixxesSoftware_S2_1200x1600-76424286902489f4d9639ac9b735c2b2',740000.00,'Marvel\'s Spider-Man Remastered',5,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(26,'Game hành động sinh tồn zombie với cơ chế parkour và chiến đấu kịch tính.','https://assets.altarofgaming.com/wp-content/uploads/2023/04/dying-light-2-stay-human---deluxe-edition-game-poster-altar-of-gaming-489-726x1024.jpg',690000.00,'Dying Light 2',5,1,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(28,'Tựa game bóng đá nổi tiếng nhất thế giới với đồ họa chân thực, chế độ chơi đa dạng và bản quyền từ các giải đấu lớn.','https://ucuzoyuncun.com/img/oyun-kapak/ea-fc-24-fifa-24-kapak.jpg',750000.00,'FIFA 24',5,2,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(29,'Trò chơi bóng rổ đỉnh cao với đồ họa siêu thực và gameplay mô phỏng hoàn hảo NBA.','https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2023/07/NBA-2K24-Black-Mamba-Edition-Cover-Art-Vertical.jpg',690000.00,'NBA 2K24',5,2,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(30,'Trò chơi bóng đá miễn phí từ Konami với lối chơi thiên về chiến thuật và kỹ thuật.','https://pop.proddigital.com.br/wp-content/uploads/sites/8/2023/09/01-17.jpg',0.00,'eFootball 2024',5,2,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(31,'Game đấu vật giải trí cực kỳ chân thật với dàn đô vật nổi tiếng và các chế độ hấp dẫn.','https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6532/6532780_sd.jpg',540000.00,'WWE 2K23',5,2,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(32,'Game trượt ván huyền thoại trở lại với bản làm lại đẹp mắt và gameplay gây nghiện.','https://cdn.mobygames.com/covers/9527527-tony-hawks-pro-skater-1-2-playstation-4-front-cover.jpg',390000.00,'Tony Hawk\'s Pro Skater 1+2',5,2,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(33,'Game mô phỏng quản lý bóng đá đỉnh cao, nơi bạn điều hành một đội bóng từ chiến thuật đến tài chính.','https://pressakey.com/gfxgames/boxart/full/Football-Manager-2024-8518-1694601609.jpg',720000.00,'Football Manager 2024',5,2,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(34,'Trò chơi trượt ván với cơ chế vật lý chân thật, cho phép người chơi tự do biểu diễn kỹ năng.','https://s.yimg.com/ny/api/res/1.2/5p.1XPkVzbEQs80uRbPaxw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2020-08/a8079520-d731-11ea-817d-cdfc8d8e3514',270000.00,'Skater XL',5,2,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(35,'Game tennis chuyên sâu với hệ thống mô phỏng chi tiết và các giải đấu lớn trên thế giới.','https://cdn.cdkeys.com/700x700/media/catalog/product/a/o/ao_tennis_2_xbox.jpg',310000.00,'AO Tennis 2',5,2,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(36,'Tựa game thể thao mạo hiểm thế giới mở với đua xe đạp, trượt tuyết, bay dù lượn,...','https://image.api.playstation.com/vulcan/img/rnd/202112/2100/7eEv1gTTKw9GA5OWi00yyT3s.png',650000.00,'Riders Republic',5,2,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(37,'Game đá bóng kết hợp xe hơi siêu tốc, mang lại trải nghiệm độc đáo và vui nhộn.','https://cdn2.unrealengine.com/egs-rocketleague-psyonixllc-s2-1200x1600-b1aecb2c82d9.jpg',0.00,'Rocket League',5,2,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(38,'Theo chân Geralt trong hành trình săn quái vật và tìm kiếm con gái nuôi Ciri.','https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png',399000.00,'The Witcher 3: Wild Hunt',50,3,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(39,'Cùng Noctis và đồng đội khám phá thế giới đầy phép thuật và công nghệ.','https://howlongtobeat.com/games/53142_Final_Fantasy_XV_Pocket_Edition.jpg',379000.00,'Final Fantasy XV',35,3,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(40,'Xây dựng nhóm chiến binh và giải cứu thế giới Thedas.','https://image.api.playstation.com/cdn/UP0006/CUSA00220_00/IbsDPt3UP6hVS5RC4FGTydyXZ50Qp4uA.png',299000.00,'Dragon Age: Inquisition',45,3,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(41,'RPG theo lượt với lối chơi tự do và cốt truyện sâu sắc.','https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/d/divinity-original-sin-2-definitive-edition-switch/hero',349000.00,'Divinity: Original Sin 2',30,3,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(42,'Trọn bộ 3 phần của loạt game Mass Effect với đồ họa nâng cấp.','https://cdn.kobo.com/book-images/65003280-783f-4dda-af01-a57004946a6e/1200/1200/False/mass-effect-2-legendary-edition-strategy-guide.jpg',399000.00,'Mass Effect Legendary Edition',20,3,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(43,'Game nhập vai theo lượt dựa trên Dungeons & Dragons.','https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/ba706e54d68d10a0eb6ab7c36cdad9178c58b7fb7bb03d28.png',499000.00,'Baldur\'s Gate 3',25,3,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(44,'Hành trình của nhóm Phantom Thieves chống lại xã hội mục ruỗng.','https://gamefaqs.gamespot.com/a/box/8/0/0/892800_front.jpg',369000.00,'Persona 5 Royal',30,3,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(45,'Huyền thoại nhập vai với thế giới mở rộng lớn và mod đa dạng.','https://www.mobygames.com/images/covers/l/843359-the-elder-scrolls-v-skyrim-special-edition-xbox-one-front-cover.jpg',329000.00,'Skyrim Special Edition',60,3,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(46,'Game chiến thuật thời gian thực huyền thoại với đồ họa hiện đại và chiến dịch lịch sử hấp dẫn.','https://i.gadgets360cdn.com/products/large/MV5BOTU4Nzc3Y2UtMzU5OS00ODM5LWEwMjYtYzEwZGEyMzYxNDQxXkEyXkFqcGdeQXVyMTI0MzA4NTgw.-V1-FMjpg-UX1000-1000x1500-1666788948.jpg',429000.00,'Age of Empires IV',40,4,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(47,'Lãnh đạo nền văn minh từ thời tiền sử đến tương lai, xây dựng đế chế của bạn.','https://image.api.playstation.com/vulcan/img/cfn/11307Hs8nlMsvWNuv_O2AC7tY7gdGyoYbRX1Effyn1qc2IR0XFvHXcdhJsAZMc00hW_0lukWIajDGsKsB7uK5LAFiCsjoVSW.png',399000.00,'Civilization VI',35,4,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(48,'Kết hợp giữa chiến thuật theo lượt và chiến đấu thời gian thực trong thế giới giả tưởng.','https://cdn.mobygames.com/covers/10698407-total-war-warhammer-iii-windows-apps-front-cover.jpg',459000.00,'Total War: WARHAMMER III',20,4,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(49,'Game chiến thuật không gian đối kháng giữa ba chủng tộc: Terran, Zerg, và Protoss.','https://wallpapercave.com/wp/XSH0h3y.jpg',0.00,'StarCraft II',100,4,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(50,'Bản nâng cấp của series chiến thuật kinh điển thời kỳ đầu.','https://wallpapercave.com/wp/wp6423509.jpg',259000.00,'Command & Conquer: Remastered',45,4,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(51,'Chỉ huy lực lượng kháng chiến trong cuộc chiến chống lại người ngoài hành tinh.','https://cdn1.epicgames.com/offer/7ec453d446194b8f8afe82aaa9561211/XCOM2_Set_Up_Assets_1200x1600_1200x1600-4b0c6e42af847235877992095e154563_1200x1600-4b0c6e42af847235877992095e154563',349000.00,'XCOM 2',30,4,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(52,'Chiến thuật thời gian thực trong bối cảnh Thế Chiến II, tập trung vào Ý và Bắc Phi.','https://static1.thegamerimages.com/wordpress/wp-content/uploads/company-of-heroes-3.jpg',419000.00,'Company of Heroes 3',25,4,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(53,'Game chiến thuật quản lý tài nguyên và lãnh thổ với chủ đề Bắc Âu và Viking.','https://cdn2.unrealengine.com/egs-northgard-shirogames-g1a-00-1920x1080-315584a1b3b7.jpg',289000.00,'Northgard',40,4,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(54,'Game sinh tồn và chiến thuật xây dựng thành phố trong thế giới băng giá hậu tận thế.','https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_Frostpunk2_11bitstudios_S1_2560x1440-f299c3673e92cfe6c73c6ed2fd6bc35a',309000.00,'Frostpunk',50,4,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(55,'Game đại chiến chiến thuật toàn cầu trong Thế Chiến II, quản lý quân sự, chính trị và sản xuất.','https://www.gamespot.com/a/uploads/scale_medium/1197/11970954/2423430-hearts_of_iron_iv_packshot.png',369000.00,'Hearts of Iron IV',30,4,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(56,'Một hành trình phiêu lưu trong thế giới mở rộng lớn với nhiều bí ẩn, sinh tồn và chiến đấu.','https://www.akibagamers.it/wp-content/uploads/2017/03/the-legend-of-zelda-breath-of-the-wild-recensione-boxart.jpg',990000.00,'The Legend of Zelda: Breath of the Wild',25,5,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(57,'Khám phá miền Tây nước Mỹ trong vai cao bồi sống ngoài vòng pháp luật với thế giới mở chân thực.','https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/09/red-dead-redemption-2-poster.jpg',890000.00,'Red Dead Redemption 2',30,5,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(58,'Theo chân Nathan Drake trong chuyến phiêu lưu cuối cùng để săn tìm kho báu huyền thoại.','https://image.api.playstation.com/vulcan/img/rnd/202010/2620/BYDPo5By4M1MYN0401ZDHtA7.png',649000.00,'Uncharted 4: A Thief\'s End',40,5,NULL,_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` binary(16) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `status` enum('ACTIVE','DELETEDs','INACTIVE') DEFAULT NULL,
  `stock` int NOT NULL,
  `cate_id` binary(16) NOT NULL,
  `url_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` binary(16) NOT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `enabled` bit(1) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  `verification_expiration` datetime(6) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (_binary 'M\�-�\�3E;��I�wƍ',NULL,'tranngoctandat12@gmail.com',_binary '','đạt trần ngọc tấn',NULL,NULL,'tranngoctandat12@gmail.com',NULL,NULL,NULL,NULL),(_binary 'X\\��\�O��\�<3�K\�',NULL,'21130314@st.hcmuaf.edu.vn',_binary '',NULL,NULL,'$2a$10$WBAPN6IrXMRgopMzlFHiYugqqSZ8LGO9HtQBTXo6v0cosZyIYrxcy','Tran Ngoc Tan Dat',NULL,NULL,NULL,NULL),(_binary '�.vH�Cڪ~S\�/�',NULL,'admin@gmail.com',_binary '\0',NULL,NULL,'$2a$10$SBDIwTCpug3qJj9Yqvz6GuxdxY5Med7HEwxyFhPiWensD9Qq930GC','admin',NULL,NULL,NULL,NULL),(_binary '���P�E����y\���',NULL,'hettendatuk@gmail.com',_binary '','Tan','Dat','$2a$10$1Jag.U0V1GH40GZ47B2IzO4ySGcY8Ts/ppB65B9dk10DkSmZZA5Xm','tandat2',NULL,NULL,'123','/uploads/avatars/f304c0b8-50ab-45b6-b0bf-bb79eb0cb39b_1750216417126.png'),(_binary '�Cڝ\�N�j1l �oh',NULL,'21130295@st.hcmuaf.edu.vn',_binary '',NULL,NULL,'$2a$10$wA8BI1xGTlnIejEWmwZAc.s6huJxqc6xSh.GahWAMWnqC//G7kqWy','chihtt',NULL,NULL,'123',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` binary(16) NOT NULL,
  `roles` varchar(255) DEFAULT NULL,
  KEY `FK55itppkw3i07do3h7qoclqd4k` (`user_id`),
  CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (_binary 'X\\��\�O��\�<3�K\�','ADMIN'),(_binary '���P�E����y\���','USER'),(_binary 'M\�-�\�3E;��I�wƍ','USER'),(_binary '�.vH�Cڪ~S\�/�','ADMIN'),(_binary '�Cڝ\�N�j1l �oh','USER');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-05 21:10:40
