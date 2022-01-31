USE `chstations`;

INSERT INTO ACCOUNT (`username`, `mail`, `password`, `account_type`)
VALUES ('loukas', 'louk@ev.com', '1234', 'basic');

INSERT INTO ACCOUNT (`username`, `mail`, `password`, `account_type`)
VALUES ('demo_user', 'demo_user@ev.com', '1234', 'basic');

INSERT INTO COMPANY (`name`)
VALUES ('Tesla');



INSERT INTO CHARGING_TYPE (`type`)
VALUES ('CCS');
INSERT INTO CHARGING_TYPE (`type`)
VALUES ('Type 2');
INSERT INTO CHARGING_TYPE (`type`)
VALUES ('CHAdeMO');


INSERT INTO EV (`car_company`, `model`, `type`)
VALUES ('Tesla', 'model 3', 'CCS');
INSERT INTO EV (`car_company`, `model`, `type`)
VALUES ('Tesla', 'model S', 'CCS');


INSERT INTO CHARGING_STATION (`name`,`latitude`, `longitude`,`schedule`,`nearby_restrooms`)
VALUES ('Tesla Supercharger', 38.32447723, 21.86919166, '24 hour', 'coffee');
INSERT INTO CHARGING_STATION (`name`,`latitude`, `longitude`,`schedule`)
VALUES ('Virta Charging Station', 38.21172980928588, 21.745871338903054, '24 hour');
INSERT INTO CHARGING_STATION (`name`,`latitude`, `longitude`,`schedule`)
VALUES ('Virta Charging Station', 38.24478818220628, 21.738144776689342, '24 hour');
INSERT INTO CHARGING_STATION (`name`,`latitude`, `longitude`,`schedule`,`nearby_restrooms`)
VALUES ('Liikennevirta Oy (CPO) Charging Station', 38.235605533645476, 21.756352981217677, '24 hour', 'patisserie');
INSERT INTO CHARGING_STATION (`name`,`latitude`, `longitude`,`schedule`,`nearby_restrooms`)
VALUES ('AE Charging Station', 38.22714974732962, 21.72880789278686, '24 hour', 'coffee, restaurant');
INSERT INTO CHARGING_STATION (`name`,`latitude`, `longitude`,`schedule`,`nearby_restrooms`)
VALUES ('Virta Charging Station', 38.27813122219404, 21.763498442675914, '24 hour', 'coffee, restaurant');
INSERT INTO CHARGING_STATION (`name`,`latitude`, `longitude`,`schedule`,`nearby_restrooms`)
VALUES ('AE Charging Station', 38.27987264237111, 21.76559897859816, '24 hour', 'coffee');
INSERT INTO CHARGING_STATION (`name`,`latitude`, `longitude`,`schedule`,`nearby_restrooms`)
VALUES ('SHELL inCharge', 38.26022138165225, 21.749247750978643, '24 hour', 'coffee, restaurant');



INSERT INTO CHARGER (`status`, `cost`, `kW`, `quantity`, `available`, `type`, `station_id`)
VALUES ('parcialy occupied', 0, 120, 2, 1, 'CCS', 1);
INSERT INTO CHARGER (`status`, `cost`, `kW`, `quantity`, `available`, `type`, `station_id`)
VALUES ('free', 0, 22, 1, 1, 'Type 2', 2);
INSERT INTO CHARGER (`status`, `cost`, `kW`, `quantity`, `available`, `type`, `station_id`)
VALUES ('free', 0, 22, 2, 2, 'Type 2', 3);
INSERT INTO CHARGER (`status`, `cost`, `kW`, `quantity`, `available`, `type`, `station_id`)
VALUES ('parcialy occupied', 0, 22, 2, 1, 'Type 2', 4);
INSERT INTO CHARGER (`status`, `cost`, `kW`, `quantity`, `available`, `type`, `station_id`)
VALUES ('free', 0, 22, 2, 2, 'Type 2', 5);
INSERT INTO CHARGER (`status`, `cost`, `kW`, `quantity`, `available`, `type`, `station_id`)
VALUES ('parcialy occupied', 0, 22, 1, 1, 'Type 2', 6);
INSERT INTO CHARGER (`status`, `cost`, `kW`, `quantity`, `available`, `type`, `station_id`)
VALUES ('out of order', 0, 22, 1, 1, 'Type 2', 7);
INSERT INTO CHARGER (`status`, `cost`, `kW`, `quantity`, `available`, `type`, `station_id`)
VALUES ('parcialy occupied', 0, 22, 2, 1, 'Type 2', 8);
INSERT INTO CHARGER (`status`, `cost`, `kW`, `quantity`, `available`, `type`, `station_id`)
VALUES ('free', 0, 80, 1, 1, 'CHAdeMO', 8);



INSERT INTO Posses (`user_id`, `car_id`, `battery`)
VALUES (1,1,100);

INSERT INTO Own (`company_id`, `station_id`)
VALUES (1,1);

