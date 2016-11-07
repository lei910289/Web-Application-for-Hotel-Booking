/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50626
Source Host           : localhost:3306
Source Database       : hotelreservation

Target Server Type    : MYSQL
Target Server Version : 50626
File Encoding         : 65001

Date: 2015-12-04 00:21:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `city`
-- ----------------------------
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `s_id` int(11) NOT NULL,
  PRIMARY KEY (`c_id`),
  KEY `city_s_id` (`s_id`),
  CONSTRAINT `city_s_id` FOREIGN KEY (`s_id`) REFERENCES `state` (`s_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of city
-- ----------------------------
INSERT INTO `city` VALUES ('1', 'Dallas', '1');
INSERT INTO `city` VALUES ('2', 'Austin', '1');
INSERT INTO `city` VALUES ('3', 'San Francisco', '2');
INSERT INTO `city` VALUES ('4', 'Los Angles', '2');

-- ----------------------------
-- Table structure for `hotel`
-- ----------------------------
DROP TABLE IF EXISTS `hotel`;
CREATE TABLE `hotel` (
  `h_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `s_id` int(11) NOT NULL,
  `c_id` int(11) NOT NULL,
  `zipcode` int(8) NOT NULL,
  PRIMARY KEY (`h_id`),
  KEY `h_cid_f` (`s_id`),
  CONSTRAINT `h_cid_f` FOREIGN KEY (`s_id`) REFERENCES `city` (`c_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `h_sid_f` FOREIGN KEY (`s_id`) REFERENCES `state` (`s_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hotel
-- ----------------------------
INSERT INTO `hotel` VALUES ('1', 'Aloft Plano', 'N, 6853 Dallas Pkwy, Plano', '1', '1', '75025');
INSERT INTO `hotel` VALUES ('3', 'Extended Stay America Hotel Dallas', '8470 N. Dallas Pkwy, Plano', '1', '1', '75287');

-- ----------------------------
-- Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `ordernum` varchar(255) NOT NULL,
  `starttime` date NOT NULL,
  `endtime` date NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `total` float NOT NULL,
  `status` varchar(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `h_id` int(11) NOT NULL,
  `r_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`ordernum`),
  KEY `o_foreign` (`h_id`),
  CONSTRAINT `o_foreign` FOREIGN KEY (`h_id`) REFERENCES `hotel` (`h_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('1', '2015-11-22', '2015-11-25', 'zwj1991', null, '9729877282', '100', 'confirmed', null, '1', '9', 'weijian');
INSERT INTO `orders` VALUES ('guest5652b3b8d587c9.14141146', '2015-11-18', '2015-11-25', 'zwj1991', '', '', '100', 'cancelled', '', '1', '10', 'weijian');
INSERT INTO `orders` VALUES ('guest56560d27e30963.26021267', '2015-11-27', '2015-11-28', '', '', '9729877282', '50', 'confirmed', 'nothing', '3', '13', 'Gaolei');
INSERT INTO `orders` VALUES ('zwj1991565575f81b49e8.75444420', '2015-11-26', '2015-11-27', 'zwj1991', '', '9719222222', '30', 'confirmed', '', '1', '14', 'Weijian');
INSERT INTO `orders` VALUES ('zwj1991565e27a7621775.27412023', '2015-12-01', '2015-12-03', 'zwj1991', 'zzwj1991@126.com', '9729877282', '60', 'cancelled', '', '1', '14', 'Weiajin');

-- ----------------------------
-- Table structure for `room`
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `r_id` int(11) NOT NULL AUTO_INCREMENT,
  `num` int(11) NOT NULL,
  `rt_id` int(11) NOT NULL,
  `h_id` int(11) NOT NULL,
  PRIMARY KEY (`r_id`),
  KEY `h_id` (`h_id`),
  KEY `rt_id_f` (`rt_id`),
  CONSTRAINT `h_id` FOREIGN KEY (`h_id`) REFERENCES `hotel` (`h_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rt_id_f` FOREIGN KEY (`rt_id`) REFERENCES `roomtype` (`rt_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES ('8', '203', '1', '1');
INSERT INTO `room` VALUES ('9', '201', '1', '1');
INSERT INTO `room` VALUES ('10', '202', '1', '1');
INSERT INTO `room` VALUES ('13', '101', '3', '3');
INSERT INTO `room` VALUES ('14', '101', '4', '1');

-- ----------------------------
-- Table structure for `roomtype`
-- ----------------------------
DROP TABLE IF EXISTS `roomtype`;
CREATE TABLE `roomtype` (
  `rt_id` int(11) NOT NULL AUTO_INCREMENT,
  `h_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `price` float NOT NULL,
  `info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rt_id`),
  KEY `rtForeign` (`h_id`),
  CONSTRAINT `rtForeign` FOREIGN KEY (`h_id`) REFERENCES `hotel` (`h_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roomtype
-- ----------------------------
INSERT INTO `roomtype` VALUES ('1', '1', 'Double room', '80', 'maximum 4 people');
INSERT INTO `roomtype` VALUES ('3', '3', 'Double room', '50', 'maximum 6 people');
INSERT INTO `roomtype` VALUES ('4', '1', 'Single Room', '30', 'maximum 2 people');

-- ----------------------------
-- Table structure for `state`
-- ----------------------------
DROP TABLE IF EXISTS `state`;
CREATE TABLE `state` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of state
-- ----------------------------
INSERT INTO `state` VALUES ('1', 'TX');
INSERT INTO `state` VALUES ('2', 'CA');

-- ----------------------------
-- Table structure for `userinfo`
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `type` char(1) NOT NULL DEFAULT 'u',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('11@qq.cpm', '1234567890', 'gaolei', 'gaolei', '1111111111111', 'u');
INSERT INTO `userinfo` VALUES ('zwj1991@126.com', '9729877282', 'weijian ', 'ivan1991', 'zwj1991', 'a');
INSERT INTO `userinfo` VALUES ('zwjivan1991@hotmail.com', '9729877282', 'weijian', 'zwj1991', 'zwj1991', 'u');
