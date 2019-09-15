-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 15-09-2019 a las 19:18:24
-- Versión del servidor: 5.7.26
-- Versión de PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `standard-rent-system`
--
CREATE DATABASE IF NOT EXISTS `standard-rent-system` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `standard-rent-system`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `house`
--

DROP TABLE IF EXISTS `house`;
CREATE TABLE IF NOT EXISTS `house` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `address` text,
  `description` text,
  `phones` text,
  `rooms` int(11) DEFAULT NULL,
  `managerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_63703da7a3d21f5570ad3a6e9e0` (`managerId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `house`
--

INSERT INTO `house` (`id`, `name`, `address`, `description`, `phones`, `rooms`, `managerId`) VALUES
(1, 'Nieves Inn', '25 Sunset Boulevard, San Francisco, California', 'Beautiful seaside apartment where kids and pets are allowed', '152452477, 8878785748', 4, 1),
(2, 'At Jhon\'s', '43 Railroad Street, San Francisco, California', 'Apartment near the railyard.', '5454222588, 7745454165', 2, 1),
(3, 'Maria\'s B&B', '1 Seaside, San Francisco, California', 'The first of all seaside houses.', '5454222588, 7745454165', 4, 1),
(4, 'Jhon\'s Treehouse', '24 1/2 Brick Street, San Francisco, California', 'Half a room in a treehouse.', '56465464, 98476518', 1, 1),
(5, 'Jhon\'s Sister\'s Treehouse', '25 1/2 Brick Street, San Francisco, California', 'Half a room in another treehouse.', '56465464, 98476518', 1, 1),
(6, 'At Jhon\'s Cousins', '23 Namaste Stret, San Francisco, California', 'Wanna share another family\'s house? This one is for you.', '1184654168', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `manager`
--

DROP TABLE IF EXISTS `manager`;
CREATE TABLE IF NOT EXISTS `manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `lastName` text NOT NULL,
  `email` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `manager`
--

INSERT INTO `manager` (`id`, `name`, `lastName`, `email`) VALUES
(1, 'Jhon', 'Nieves', 'jhon@domain.com'),
(2, 'Mike', 'Ceperino', 'mike@domain.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `managerProfileId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  UNIQUE KEY `REL_29376fa5008fda63621050a8d1` (`managerProfileId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `managerProfileId`) VALUES
(1, 'jhon', 'changeme', 1),
(2, 'mike', 'mike', 2);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `house`
--
ALTER TABLE `house`
  ADD CONSTRAINT `FK_63703da7a3d21f5570ad3a6e9e0` FOREIGN KEY (`managerId`) REFERENCES `manager` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_29376fa5008fda63621050a8d13` FOREIGN KEY (`managerProfileId`) REFERENCES `manager` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
