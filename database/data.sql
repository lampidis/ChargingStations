USE `chstations`;

INSERT INTO ACCOUNT (`username`, `mail`, `password`, `account_type`)
VALUES ('loukas', 'louk@ev.com', '1234', 'basic');

INSERT INTO COMPANY (`name`)
VALUES ('tesla');

INSERT INTO CHARGING_TYPE (`type`)
VALUES ('tesla_type_charger');

INSERT INTO EV (`car_company`, `model`, `type`)
VALUES ('tesla', 'model 3', 'tesla_type_charger');
INSERT INTO EV (`car_company`, `model`, `type`)
VALUES ('tesla', 'model S', 'tesla_type_charger');

INSERT INTO CHARGING_STATION (`latitude`, `longitude`,`schedule`,`nearby_restrooms`)
VALUES (38.24561869917443, 21.735494845086897, '7.00-23.00', 'cafe');
INSERT INTO CHARGING_STATION (`latitude`, `longitude`,`schedule`,`nearby_restrooms`)
VALUES (38.25633972018849, 21.74317563876464, '7.00-23.00', 'cafe, pastery');

INSERT INTO CHARGER (`status`, `cost`, `kW`, `quantity`, `type`, `station_id`)
VALUES ('in use', 0, 120, 2, 'tesla_type_charger', 1);
INSERT INTO CHARGER (`status`, `cost`, `kW`, `quantity`, `type`, `station_id`)
VALUES ('in use', 0, 120, 2, 'tesla_type_charger', 2);


INSERT INTO Posses (`user_id`, `car_id`)
VALUES (1,1);

INSERT INTO Own (`company_id`, `station_id`)
VALUES (1,1);
INSERT INTO Own (`company_id`, `station_id`)
VALUES (1,2);

