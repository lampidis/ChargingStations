USE `chargingstations`;

drop table if exists `Posses`;
drop table if exists `Works`;
drop table if exists `Fav_Company`;
drop table if exists `Own`;
drop table if exists `Fav_station`;
drop table if exists `Check_in`;
drop table if exists `Comment`;
drop table if exists `Review`;
drop table if exists `ACCOUNT`;
drop table if exists `EV`;
drop table if exists `CHARGING TYPE`;
drop table if exists `CHARGER`;
drop table if exists `CHARGING STATION`;
drop table if exists `COMPANY`;

CREATE TABLE `ACCOUNT` (
	`user_id` INT NOT NULL AUTO_INCREMENT unique,
	`username` varchar(255) NOT NULL UNIQUE,
	`mail` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL UNIQUE,
	`account_type` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`user_id`)
);

CREATE TABLE `EV` (
	`car_id` INT NOT NULL AUTO_INCREMENT,
	`car_company` varchar(255) NOT NULL,
	`model` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	PRIMARY KEY (`car_id`)
);

CREATE TABLE `CHARGING TYPE` (
	`type` varchar(255) NOT NULL,
	PRIMARY KEY (`type`)
);

CREATE TABLE `CHARGER` (
	`charger_id` INT NOT NULL AUTO_INCREMENT,
	`status` varchar(255) NOT NULL,
	`cost` FLOAT NOT NULL,
	`kW` FLOAT NOT NULL,
	`quantity` INT(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`station_id` INT(255) NOT NULL,
	PRIMARY KEY (`charger_id`)
);

CREATE TABLE `CHARGING STATION` (
	`station_id` INT NOT NULL AUTO_INCREMENT,
	`weather` varchar(255) NOT NULL,
	`location` varchar(255) NOT NULL,
	`notes` varchar(255) NOT NULL,
	`schedule` varchar(255) NOT NULL,
	`nearby_restrooms` varchar(255) NOT NULL,
	`photos_rep` varchar(255) NOT NULL,
	PRIMARY KEY (`station_id`)
);

CREATE TABLE `COMPANY` (
	`company_id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	PRIMARY KEY (`company_id`)
);

CREATE TABLE `Posses` (
	`user_id` INT NOT NULL,
	`car_id` INT NOT NULL,
	PRIMARY KEY (`user_id`,`car_id`)
);

CREATE TABLE `Works` (
	`user_id` INT NOT NULL,
	`company_id` INT NOT NULL,
	PRIMARY KEY (`user_id`,`company_id`)
);

CREATE TABLE `Fav_Company` (
	`user_id` INT NOT NULL,
	`company_id` INT NOT NULL,
	PRIMARY KEY (`user_id`,`company_id`)
);

CREATE TABLE `Own` (
	`company_id` INT NOT NULL,
	`station_id` INT NOT NULL,
	PRIMARY KEY (`company_id`,`station_id`)
);

CREATE TABLE `Fav_station` (
	`user_id` INT NOT NULL,
	`station_id` INT NOT NULL,
	PRIMARY KEY (`user_id`,`station_id`)
);

CREATE TABLE `Check_in` (
	`user_id` INT NOT NULL,
	`station_id` INT NOT NULL,
	PRIMARY KEY (`user_id`,`station_id`)
);


CREATE TABLE `Comment` (
	`user_id` INT NOT NULL,
	`station_id` INT NOT NULL,
	PRIMARY KEY (`user_id`,`station_id`)
);


CREATE TABLE `Review` (
	`user_id` INT NOT NULL,
	`station_id` INT NOT NULL,
	PRIMARY KEY (`user_id`,`station_id`)
);


ALTER TABLE `EV` ADD CONSTRAINT `EV_fk0` FOREIGN KEY (`type`) REFERENCES `CHARGING TYPE`(`type`);

ALTER TABLE `CHARGER` ADD CONSTRAINT `CHARGER_fk0` FOREIGN KEY (`type`) REFERENCES `CHARGING TYPE`(`type`);

ALTER TABLE `CHARGER` ADD CONSTRAINT `CHARGER_fk1` FOREIGN KEY (`station_id`) REFERENCES `CHARGING STATION`(`station_id`);

ALTER TABLE `Posses` ADD CONSTRAINT `Posses_fk0` FOREIGN KEY (`user_id`) REFERENCES `ACCOUNT`(`user_id`);

ALTER TABLE `Posses` ADD CONSTRAINT `Posses_fk1` FOREIGN KEY (`car_id`) REFERENCES `EV`(`car_id`);

ALTER TABLE `Works` ADD CONSTRAINT `Works_fk0` FOREIGN KEY (`user_id`) REFERENCES `ACCOUNT`(`user_id`);

ALTER TABLE `Works` ADD CONSTRAINT `Works_fk1` FOREIGN KEY (`company_id`) REFERENCES `COMPANY`(`company_id`);

ALTER TABLE `Fav_Company` ADD CONSTRAINT `Fav_Company_fk0` FOREIGN KEY (`user_id`) REFERENCES `ACCOUNT`(`user_id`);

ALTER TABLE `Fav_Company` ADD CONSTRAINT `Fav_Company_fk1` FOREIGN KEY (`company_id`) REFERENCES `COMPANY`(`company_id`);

ALTER TABLE `Own` ADD CONSTRAINT `Own_fk0` FOREIGN KEY (`company_id`) REFERENCES `COMPANY`(`company_id`);

ALTER TABLE `Own` ADD CONSTRAINT `Own_fk1` FOREIGN KEY (`station_id`) REFERENCES `CHARGING STATION`(`station_id`);

ALTER TABLE `Fav_station` ADD CONSTRAINT `Fav_station_fk0` FOREIGN KEY (`user_id`) REFERENCES `ACCOUNT`(`user_id`);

ALTER TABLE `Fav_station` ADD CONSTRAINT `Fav_station_fk1` FOREIGN KEY (`station_id`) REFERENCES `CHARGING STATION`(`station_id`);

ALTER TABLE `Check_in` ADD CONSTRAINT `Check_in_fk0` FOREIGN KEY (`user_id`) REFERENCES `ACCOUNT`(`user_id`);

ALTER TABLE `Check_in` ADD CONSTRAINT `Check_in_fk1` FOREIGN KEY (`station_id`) REFERENCES `CHARGING STATION`(`station_id`);

ALTER TABLE `Comment` ADD CONSTRAINT `Comment_fk0` FOREIGN KEY (`user_id`) REFERENCES `ACCOUNT`(`user_id`);

ALTER TABLE `Comment` ADD CONSTRAINT `Comment_fk1` FOREIGN KEY (`station_id`) REFERENCES `CHARGING STATION`(`station_id`);

ALTER TABLE `Review` ADD CONSTRAINT `Review_fk0` FOREIGN KEY (`user_id`) REFERENCES `ACCOUNT`(`user_id`);

ALTER TABLE `Review` ADD CONSTRAINT `Review_fk1` FOREIGN KEY (`station_id`) REFERENCES `CHARGING STATION`(`station_id`);

