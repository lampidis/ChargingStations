USE `chstations`;

INSERT INTO ACCOUNT (`username`, `mail`, `password`, `account_type`)
VALUES ('loukas', 'louk@ev.com', '1234', 'basic');

INSERT INTO ACCOUNT (`username`, `mail`, `password`, `account_type`)
VALUES ('demo_user', 'demo_user@ev.com', '1234', 'basic');

INSERT INTO COMPANY (`name`)
VALUES ('Tesla');

INSERT INTO CHARGING_TYPE (`type`)
VALUES ('CCS');

INSERT INTO EV (`car_company`, `model`, `type`)
VALUES ('Tesla', 'model 3', 'CCS');
INSERT INTO EV (`car_company`, `model`, `type`)
VALUES ('Tesla', 'model S', 'CCS');



INSERT INTO CHARGING_STATION (`name`,`latitude`, `longitude`,`schedule`,`nearby_restrooms`)
VALUES ('Tesla Supercharger', 38.32447723, 21.86919166, '24 hour', 'cafe');

INSERT INTO CHARGER (`status`, `cost`, `kW`, `quantity`, `available`, `type`, `station_id`)
VALUES ('in use', 0, 120, 2, 1, 'CCS', 1);


INSERT INTO Posses (`user_id`, `car_id`, `battery`)
VALUES (1,1,100);

INSERT INTO Own (`company_id`, `station_id`)
VALUES (1,1);

