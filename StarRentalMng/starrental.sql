DROP DATABASE IF EXISTS Star_Rentals;
DROP USER IF EXISTS 'star_admin'@'localhost';
DROP USER IF EXISTS 'star_app'@'%';
DROP USER IF EXISTS 'star_readonly'@'%';

CREATE SCHEMA Star_Rentals;
USE Star_Rentals;


-- ======================
-- TABLE DECLARATIONS
-- ======================
-- 1. LOCATIONS
CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    Lname CHAR(100),
    address_line1 VARCHAR(100),
    address_line2 VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(30),
    zip_code INT,
    country VARCHAR(20),
    phone_number VARCHAR(15),
    email VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- 2. USERS
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    password_hash VARCHAR(100),
    phone_number VARCHAR(8),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth VARCHAR(50),
    driver_license_number INT,
    driver_license_state VARCHAR(20),
    address_line1 VARCHAR(100),
    address_line2 VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(30),
    zip_code INT,
    country VARCHAR(20),
    created_at TIMESTAMP
);

-- 3. PAYMENT_INFO
CREATE TABLE payment_info (
    payment_id SERIAL PRIMARY KEY,
    cardholder_name VARCHAR(100),
    card_number CHAR(16),
    exp_month CHAR(2),
    exp_year CHAR(4),
    cvv CHAR(3),
    billing_address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(2),
    zip_code CHAR(10),
    country VARCHAR(50),
    user_id BIGINT UNSIGNED
);

-- 4. VEHICLES
CREATE TABLE vehicles (
    VIN CHAR(17) PRIMARY KEY,
    license_plate VARCHAR(100),
    year INTEGER,
    make VARCHAR(100),
    model VARCHAR(100),
    body_style VARCHAR(100),
    color VARCHAR(100),
    miles INTEGER,
    rental_price FLOAT,
    location_id BIGINT UNSIGNED,
    fuel_type VARCHAR(50),
    rental_status VARCHAR(50),
    photo_url VARCHAR(512) NOT NULL
);

-- 5. RENTAL_INFO
CREATE TABLE rental_info (
    rental_id SERIAL PRIMARY KEY,
    start_mileage INT,
    return_mileage INT,
    start_date DATE,
    return_date DATE,
    VIN CHAR(17),
    user_id BIGINT UNSIGNED,
    pickup_location_id BIGINT UNSIGNED,
    dropoff_location_id BIGINT UNSIGNED,
    payment_id BIGINT UNSIGNED
);

-- 6. REPAIRS
CREATE TABLE repairs (
    repair_id SERIAL PRIMARY KEY,
    repair_description VARCHAR(1000),
    VIN CHAR(17),
    location_id BIGINT UNSIGNED
);

-- ======================
-- FOREIGN KEY DECLARATIONS
-- ======================

-- VEHICLES → LOCATIONS
ALTER TABLE vehicles
ADD CONSTRAINT fk_vehicle_location
FOREIGN KEY (location_id)
REFERENCES locations(location_id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- PAYMENT_INFO → USERS
ALTER TABLE payment_info
ADD CONSTRAINT fk_payment_user
FOREIGN KEY (user_id)
REFERENCES users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RENTAL_INFO → VEHICLES
ALTER TABLE rental_info
ADD CONSTRAINT fk_rental_vehicle
FOREIGN KEY (VIN)
REFERENCES vehicles(VIN) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RENTAL_INFO → USERS
ALTER TABLE rental_info
ADD CONSTRAINT fk_rental_user
FOREIGN KEY (user_id)
REFERENCES users(user_id) ON DELETE SET NULL ON UPDATE CASCADE;

-- RENTAL_INFO → LOCATIONS (pickup & dropoff)
ALTER TABLE rental_info
ADD CONSTRAINT fk_rental_pickup_location
FOREIGN KEY (pickup_location_id)
REFERENCES locations(location_id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE rental_info
ADD CONSTRAINT fk_rental_dropoff_location
FOREIGN KEY (dropoff_location_id)
REFERENCES locations(location_id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RENTAL_INFO → PAYMENT_INFO
ALTER TABLE rental_info
ADD CONSTRAINT fk_rental_payment
FOREIGN KEY (payment_id)
REFERENCES payment_info(payment_id) ON DELETE SET NULL ON UPDATE CASCADE;

-- REPAIRS → VEHICLES
ALTER TABLE repairs
ADD CONSTRAINT fk_repair_vehicle
FOREIGN KEY (VIN)
REFERENCES vehicles(VIN) ON DELETE CASCADE ON UPDATE CASCADE;

-- REPAIRS → LOCATIONS
ALTER TABLE repairs
ADD CONSTRAINT fk_repair_location
FOREIGN KEY (location_id)
REFERENCES locations(location_id) ON DELETE SET NULL ON UPDATE CASCADE;

-- ======================
-- DATA INSERTS
-- ======================

-- 1. LOCATIONS
INSERT INTO locations VALUES
(DEFAULT, 'Downtown Branch', '123 Main St', NULL, 'Providence', 'RI', 02903, 'USA', '401-555-1000', 'downtown@rentalco.com', NOW(), NOW()),
(DEFAULT, 'Airport Branch', '1 Airport Rd', 'Terminal A', 'Warwick', 'RI', 02886, 'USA', '401-555-2000', 'airport@rentalco.com', NOW(), NOW()),
(DEFAULT, 'East Side Branch', '88 Thayer St', NULL, 'Providence', 'RI', 02906, 'USA', '401-555-3000', 'eastside@rentalco.com', NOW(), NOW()),
(DEFAULT, 'Newport Branch', '45 Ocean Ave', NULL, 'Newport', 'RI', 02840, 'USA', '401-555-4000', 'newport@rentalco.com', NOW(), NOW()),
(DEFAULT, 'Boston Branch', '500 Beacon St', NULL, 'Boston', 'MA', 02115, 'USA', '617-555-5000', 'boston@rentalco.com', NOW(), NOW()),
(DEFAULT, 'Cranston Branch', '200 Park Ave', NULL, 'Cranston', 'RI', 02910, 'USA', '401-555-2200', 'cranston@rentalco.com', NOW(), NOW());

-- 2. USERS
INSERT INTO users VALUES
(DEFAULT, 'jdoe', 'hash123', '5551234', 'John', 'Doe', '1988-04-10', 10012345, 'RI', '12 Elm St', NULL, 'Providence', 'RI', 02903, 'USA', NOW()),
(DEFAULT, 'asmith', 'hash456', '5555678', 'Alice', 'Smith', '1992-07-21', 20054321, 'MA', '90 Pine Rd', NULL, 'Boston', 'MA', 02115, 'USA', NOW()),
(DEFAULT, 'bwilson', 'hash789', '5559012', 'Bob', 'Wilson', '1985-11-02', 30098765, 'RI', '44 Oak Ave', NULL, 'Newport', 'RI', 02840, 'USA', NOW()),
(DEFAULT, 'cjohnson', 'hash234', '5553456', 'Carol', 'Johnson', '1990-02-18', 40067890, 'RI', '777 Hope St', NULL, 'Providence', 'RI', 02906, 'USA', NOW()),
(DEFAULT, 'dlee', 'hash890', '5557890', 'David', 'Lee', '1995-05-14', 50011223, 'MA', '321 River St', NULL, 'Cambridge', 'MA', 02139, 'USA', NOW());

-- 3. PAYMENT_INFO
INSERT INTO payment_info VALUES
(DEFAULT, 'John Doe', '4111111111111111', '05', '2027', '123', '12 Elm St', 'Providence', 'RI', '02903', 'USA', 1),
(DEFAULT, 'Alice Smith', '5555555555554444', '11', '2026', '456', '90 Pine Rd', 'Boston', 'MA', '02115', 'USA', 2),
(DEFAULT, 'Bob Wilson', '378282246310005', '09', '2025', '789', '44 Oak Ave', 'Newport', 'RI', '02840', 'USA', 3),
(DEFAULT, 'Carol Johnson', '6011000990139424', '03', '2028', '234', '777 Hope St', 'Providence', 'RI', '02906', 'USA', 4),
(DEFAULT, 'David Lee', '3530111333300000', '12', '2029', '890', '321 River St', 'Cambridge', 'MA', '02139', 'USA', 5);

-- 4. VEHICLES
INSERT INTO vehicles VALUES
('1HGCM82633A123456', 'RI1234', 2020, 'Toyota', 'Camry', 'Sedan', 'Blue', 30000, 49.99, 1, 'Gasoline', 'Available', 'https://upload.wikimedia.org/wikipedia/commons/c/c7/%28USA-Massachusetts%29_Private_Toyota_Camry_NJ-Z22UKZ_2024-06-06.jpg'),
('1FTFW1EF1EFA23456', 'RI5678', 2021, 'Ford', 'F-150', 'Truck', 'Red', 22000, 59.99, 2, 'Gasoline', 'Rented', 'https://www.repairerdrivennews.com/wp-content/uploads/2020/06/2021-f-150-lariat-scaled.jpg'),
('1C4RJFAG1FC123456', 'RI9012', 2022, 'Jeep', 'Grand Cherokee', 'SUV', 'Black', 15000, 69.99, 3, 'Gasoline', 'Available', 'https://static.overfuel.com/photos/795/328955/e5959fb4d37442beaf9e4e19f209fa76.webp'),
('5NPE24AF7FH123456', 'RI3456', 2019, 'Hyundai', 'Sonata', 'Sedan', 'White', 40000, 44.99, 4, 'Gasoline', 'Maintenance', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6x-HmJV9Sd_m8U_Ol6-dnAZEEN9Dg1tTuAw&s'),
('3FA6P0LU0HR123456', 'MA7890', 2023, 'Tesla', 'Model 3', 'Sedan', 'Silver', 10000, 89.99, 5, 'Electric', 'Available', 'https://images.dealersync.com/3/Photos/1199920/20241012055642264_IMG_4397.jpg?_=bdc11c681b1ee181f191d4a58d94e731ab8c4f36'),
('1G1ZD5ST5LF123457', 'RI1122', 2020, 'Chevrolet', 'Malibu', 'Sedan', 'Gray', 28000, 45.99, 6, 'Gasoline', 'Available', 'https://hips.hearstapps.com/hmg-prod/images/2019-chevrolet-malibu-rs-117-1568289288.jpg?crop=0.758xw:0.696xh;0.125xw,0.188xh&resize=2048:*'),
('2T3ZFREV4FW123458', 'RI2233', 2021, 'Toyota', 'RAV4', 'SUV', 'Blue', 18000, 64.99, 1, 'Gasoline', 'Rented', 'https://file.kelleybluebookimages.com/kbb/base/evox/CP/13369/2020-Toyota-RAV4-front_13369_032_1834x906_8W9_cropped.png'),
('1N4BL4BV3LC123459', 'RI3344', 2022, 'Nissan', 'Altima', 'Sedan', 'Black', 12000, 47.99, 2, 'Gasoline', 'Available', 'https://upload.wikimedia.org/wikipedia/commons/5/59/2024_Nissan_Altima_SR%2C_front_left%2C_05-05-2025.jpg'),
('5YJ3E1EA5KF123460', 'RI4455', 2023, 'Tesla', 'Model Y', 'SUV', 'White', 8000, 94.99, 3, 'Electric', 'Available', 'https://upload.wikimedia.org/wikipedia/commons/5/5e/2023_Tesla_Model_Y_Long_Range_All-Wheel_Drive_in_Pearl_White_Multi-Coat%2C_front_right%2C_2024-09-25.jpg'),
('1C6RR7FG1KS123461', 'RI5566', 2019, 'Ram', '1500', 'Truck', 'Red', 35000, 69.99, 4, 'Gasoline', 'Maintenance', 'https://www.ramtrucks.com/mediaserver/iris?COSY-EU-100-1713uLDEMTV1r9s%25WBXaBKFmfKSLC9gIQALMc6UhVk6GBfM9IW2VRkr72kVsd9poKwXGXQpMTV1rUh4g6OQCckPquBhS1U%25jzbTllxA0kdIlnaQFmwpEkpd2LYBoM4ljVm7yT8ZuV3jf7wg68ZprPxHTHsS1s8PJ&&pov=fronthero&width=860&height=484&bkgnd=white&resp=jpg&cut='),
('3KPF24AD3KE123462', 'RI6677', 2020, 'Kia', 'Forte', 'Sedan', 'Silver', 25000, 39.99, 5, 'Gasoline', 'Available', 'https://hips.hearstapps.com/hmg-prod/images/2022-kia-forte-gt-104-1633972551.jpg?crop=0.814xw:0.688xh;0.0401xw,0.127xh&resize=2048:*'),
('1FM5K8D87LGA23463', 'RI7788', 2021, 'Ford', 'Explorer', 'SUV', 'Black', 22000, 72.99, 6, 'Gasoline', 'Rented', 'https://www.ford.com/acslibs/content/dam/na/ford/en_us/images/explorer/2026/jellybeans/26my_frd_epr_actv_ps34_wrk.webp'),
('JM3KFBDM6M0123464', 'RI8899', 2022, 'Mazda', 'CX-5', 'SUV', 'Red', 14000, 68.99, 1, 'Gasoline', 'Available', 'https://www.topgear.com/sites/default/files/cars-car/image/2021/02/cx-5-skyactiv-g-awd-gt-sport-auto-action-3.jpg'),
('WAUFMAF45KN123465', 'RI9900', 2020, 'Audi', 'A6', 'Sedan', 'White', 30000, 109.99, 2, 'Gasoline', 'Available', 'https://hips.hearstapps.com/hmg-prod/images/2020-audi-a6-mmp-1-1567713400.jpg?crop=1.00xw:0.846xh;0,0.135xh&resize=1200:*'),
('WBA5A7C52FG123466', 'RI1010', 2019, 'BMW', '528i', 'Sedan', 'Gray', 42000, 119.99, 3, 'Gasoline', 'Rented', 'https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/11q4/424156/2012-bmw-528i-first-drive-review-car-and-driver-photo-424740-s-original.jpg?fill=1:1&resize=1200:*');


-- 5. RENTAL_INFO
INSERT INTO rental_info VALUES
(DEFAULT, 30000, 30500, '2025-07-01', '2025-07-05', '1HGCM82633A123456', 1, 1, 2, 1),
(DEFAULT, 22000, 22550, '2025-06-10', '2025-06-15', '1FTFW1EF1EFA23456', 2, 2, 2, 2),
(DEFAULT, 15000, 15250, '2025-08-20', '2025-08-23', '1C4RJFAG1FC123456', 3, 3, 3, 3),
(DEFAULT, 40000, 40320, '2025-05-10', '2025-05-12', '5NPE24AF7FH123456', 4, 4, 4, 4),
(DEFAULT, 10000, 10200, '2025-09-02', '2025-09-06', '3FA6P0LU0HR123456', 5, 5, 1, 5);

-- 6. REPAIRS
INSERT INTO repairs VALUES
(DEFAULT, 'Oil change and tire rotation', '5NPE24AF7FH123456', 4),
(DEFAULT, 'Brake pad replacement', '1HGCM82633A123456', 1),
(DEFAULT, 'Battery replacement', '3FA6P0LU0HR123456', 5),
(DEFAULT, 'Windshield replacement', '1FTFW1EF1EFA23456', 2),
(DEFAULT, 'Engine diagnostic', '1C4RJFAG1FC123456', 3);

SELECT * from LOCATIONS;
SELECT * from USERS;
SELECT * from payment_info;
SELECT * from VEHICLES;
SELECT * from RENTAL_INFO;
SELECT * from REPAIRS;

-- ======================
-- DATA UPDATES
-- ======================
-- 1) Vehicle returned: mark the Ford F-150 as Available and sync mileage from rental #2
SELECT * from VEHICLES;
UPDATE vehicles
SET rental_status = 'Available',
    miles = 22550
WHERE VIN = '1FTFW1EF1EFA23456';
SELECT * from VEHICLES;

-- 2) Extend a rental and adjust its return mileage (rental #5)
SELECT * from RENTAL_INFO;
UPDATE rental_info
SET return_date = '2025-09-07',
    return_mileage = 10280
WHERE rental_id = 5;
SELECT * from RENTAL_INFO;

-- 3) Adjust daily price for the Tesla Model 3
SELECT * from vehicles;
UPDATE vehicles
SET rental_price = 94.99
WHERE VIN = '3FA6P0LU0HR123456';
SELECT * from vehicles;

-- 4) Update a user's contact info (Alice Smith)
SELECT * from users;
UPDATE users
SET phone_number = '5557777',
    address_line2 = 'Apt 4B'
WHERE user_id = 2;
SELECT * from users;

-- 5) Refresh card expiration for payment #3 (Bob Wilson)
SELECT * from payment_info;
UPDATE payment_info
SET exp_month = '10',
    exp_year  = '2026'
WHERE payment_id = 3;
SELECT * from payment_info;

-- ======================
-- DATA DELETES
-- ======================
-- 1) Remove a stored payment method
DELETE FROM payment_info
WHERE payment_id = 2;

Select * from payment_info;
-- 2) Archive/clean old rentals (e.g., rentals completed before July 1, 2025)
DELETE FROM rental_info 
WHERE
    return_date < '2025-07-01';

-- 3) Clear repair records for vehicles currently available (DELETE with JOIN)
DELETE r
FROM repairs r
JOIN vehicles v ON v.VIN = r.VIN
WHERE v.rental_status = 'Available';

-- ======================
-- QUERIES
-- ======================

-- Availabe cars at a certain location
SELECT 
    *
FROM
    vehicles
WHERE
    location_id = 1 AND rental_status = 'Available';
    
-- Average miles between all cars
Select AVG(miles) as Average_miles 
From vehicles;

-- How many cars are currently in inventory per location?
SELECT 
    l.Lname AS location_name,
    COUNT(v.VIN) AS vehicle_count
FROM 
    vehicles v
JOIN 
    locations l ON v.location_id = l.location_id
GROUP BY 
    l.location_id, l.Lname;
    
-- Find which vehicles are located in which branch.
SELECT 
    v.make,
    v.model,
    v.license_plate,
    v.color,
    l.Lname AS location_name
FROM vehicles v
JOIN locations l ON v.location_id = l.location_id;
 

/* ---------------------------------------------------------
   1) INDEXES on the rentals table (rental_info)
   Why: common filters/joins on VIN, user_id, dates, locations.
   --------------------------------------------------------- */
CREATE INDEX idx_rentalinfo_vin          ON rental_info (VIN);
CREATE INDEX idx_rentalinfo_user         ON rental_info (user_id);
CREATE INDEX idx_rentalinfo_dates        ON rental_info (start_date, return_date);
CREATE INDEX idx_rentalinfo_locations    ON rental_info (pickup_location_id, dropoff_location_id);
CREATE INDEX idx_rentalinfo_payment      ON rental_info (payment_id);

SHOW INDEXES FROM rental_info WHERE Key_name = 'idx_rentalinfo_vin';
/* ---------------------------------------------------------
   2) VIEWS
   --------------------------------------------------------- */

/* View #1: v_current_rentals
   Which rentals are active today, and for which customer and vehicle?
*/
CREATE OR REPLACE VIEW v_current_rentals AS
SELECT
    r.rental_id,
    r.VIN,
    v.make,
    v.model,
    r.user_id,
    u.first_name,
    u.last_name,
    r.start_date,
    r.return_date,
    DATEDIFF(COALESCE(r.return_date, CURDATE()), r.start_date) AS days_active
FROM rental_info r
JOIN vehicles v ON v.VIN = r.VIN
JOIN users    u ON u.user_id = r.user_id
WHERE r.start_date <= CURDATE()
  AND (r.return_date IS NULL OR r.return_date >= CURDATE());
  
  Select * from v_current_rentals;

/* View #2: v_vehicle_utilization
   How heavily is each vehicle used (rental count, miles driven, average rental length)?
*/
CREATE OR REPLACE VIEW v_vehicle_utilization AS
SELECT
    v.VIN,
    v.make,
    v.model,
    COUNT(r.rental_id) AS rental_count,
    SUM(GREATEST(r.return_mileage - r.start_mileage, 0)) AS miles_driven,
    AVG(DATEDIFF(r.return_date, r.start_date)) AS avg_days_per_rental
FROM vehicles v
LEFT JOIN rental_info r ON r.VIN = v.VIN
GROUP BY v.VIN, v.make, v.model;

Select * from v_vehicle_utilization;

/* ---------------------------------------------------------
   3) JOINS
   --------------------------------------------------------- */

/* NATURAL JOIN:
   Repairs and vehicles both share columns VIN and location_id.
   Which vehicles are currently linked to repair records, with price and description?
*/
SELECT
    r.repair_id,
    v.VIN,
    v.make,
    v.model,
    v.rental_price,
    r.repair_description
FROM repairs r NATURAL JOIN vehicles v 
ORDER BY v.make, v.model;

/* INNER JOIN:
   List every rental with the customer name and vehicle details.
*/
SELECT
    r.rental_id,
    u.first_name,
    u.last_name,
    v.make,
    v.model,
    r.start_date,
    r.return_date
FROM rental_info r
INNER JOIN users    u ON u.user_id = r.user_id
INNER JOIN vehicles v ON v.VIN      = r.VIN
ORDER BY r.start_date DESC;

/* LEFT JOIN:
   What’s the latest rental (if any) for each vehicle?
*/
SELECT
    v.VIN,
    v.make,
    v.model,
    lr.last_start AS last_rental_start
FROM vehicles v
LEFT JOIN (
    SELECT VIN, MAX(start_date) AS last_start
    FROM rental_info
    GROUP BY VIN
) AS lr ON lr.VIN = v.VIN
ORDER BY (lr.last_start IS NULL), lr.last_start DESC;

/* RIGHT JOIN
   Return every rental and the matching customer name when available.
*/
SELECT
    r.rental_id,
    r.user_id,
    CONCAT(u.first_name, ' ', u.last_name) AS customer_name,
    r.start_date,
    r.return_date
FROM users u
RIGHT JOIN rental_info r ON u.user_id = r.user_id
ORDER BY r.rental_id;

/* ---------------------------------------------------------
   4) FILTER COMMANDS (MAX, MIN, AVG, SUM), with GROUP BY/HAVING/ORDER BY
   --------------------------------------------------------- */

/*
   What are the max/min/average daily prices for each body style?
*/
SELECT
    v.body_style,
    MAX(v.rental_price) AS max_price,
    MIN(v.rental_price) AS min_price,
    AVG(v.rental_price) AS avg_price
FROM vehicles v
GROUP BY v.body_style
ORDER BY avg_price DESC;


/*  Which pickup locations and (year, month) pairs generated > $100 in estimated revenue? */
SELECT
    l.Lname AS location_name,
    YEAR(r.start_date)  AS yr,
    MONTH(r.start_date) AS mo,
    SUM(DATEDIFF(COALESCE(r.return_date, CURDATE()), r.start_date) * v.rental_price) AS revenue_est
FROM rental_info r
JOIN vehicles  v ON v.VIN = r.VIN
JOIN locations l ON l.location_id = r.pickup_location_id
GROUP BY
    l.location_id, l.Lname,
    YEAR(r.start_date), MONTH(r.start_date)
HAVING
    SUM(DATEDIFF(COALESCE(r.return_date, CURDATE()), r.start_date) * v.rental_price) > 100
ORDER BY
    yr, mo, revenue_est DESC;

/* 
   Which customers rented more than once?
*/
SELECT
    u.user_id,
    u.first_name,
    u.last_name,
    COUNT(*) AS rentals
FROM rental_info r
JOIN users u ON u.user_id = r.user_id
GROUP BY u.user_id, u.first_name, u.last_name
HAVING rentals > 1
ORDER BY rentals DESC;

/* 
Average distance per rental, by vehicle, filtered
   Which vehicles average more than 200 miles per rental?
*/
SELECT
    v.VIN,
    v.make,
    v.model,
    AVG(GREATEST(r.return_mileage - r.start_mileage, 0)) AS avg_miles_per_rental
FROM vehicles v
JOIN rental_info r ON r.VIN = v.VIN
GROUP BY v.VIN, v.make, v.model
HAVING avg_miles_per_rental > 200
ORDER BY avg_miles_per_rental DESC;

/* 
   How many vehicles of each status are at every location?
*/
SELECT
    l.Lname AS location_name,
    v.rental_status,
    COUNT(*) AS vehicle_count
FROM vehicles v
JOIN locations l ON l.location_id = v.location_id
GROUP BY l.Lname, v.rental_status
ORDER BY l.Lname, vehicle_count DESC;

/* 
	Grant all privilegies to a super user
*/
CREATE USER 'star_admin'@'localhost' IDENTIFIED BY 'StrongAdminPassword!';

-- Give full privileges on this schema
GRANT ALL PRIVILEGES
ON Star_Rentals.*
TO 'star_admin'@'localhost'
WITH GRANT OPTION;

/*
	 Create another user with privilegies. 
     Grant, Revoke privilegies
     Drop the user
*/

CREATE USER 'star_student'@'localhost' IDENTIFIED BY 'StudentPass2025!';
-- Allow reading data from ALL tables in the DB
GRANT SELECT ON Star_Rentals.* TO 'star_student'@'localhost';

-- Allow modifying only the rental and repair related data
GRANT INSERT, UPDATE ON Star_Rentals.rental_info TO 'star_student'@'localhost';
GRANT INSERT, UPDATE, DELETE ON Star_Rentals.repairs TO 'star_student'@'localhost';

-- Allow to create views, but NOT tables or structure changes
GRANT CREATE VIEW, SHOW VIEW ON Star_Rentals.* TO 'star_student'@'localhost';

-- Revoke delete permission on repairs, but keep insert/update
REVOKE DELETE ON Star_Rentals.repairs FROM 'star_student'@'localhost';

REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'star_student'@'localhost';

DROP USER 'star_student'@'localhost';