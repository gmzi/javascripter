CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE region (
    id SERIAL PRIMARY KEY,
    region_name TEXT NOT NULL
);

CREATE TABLE country (
    id SERIAL PRIMARY KEY,
    country_name TEXT NOT NULL,
    region_id INT REFERENCES region
);

CREATE TABLE state_ (
    id SERIAL PRIMARY KEY,
    state_name TEXT NOT NULL,
    country_id INT REFERENCES country
);

CREATE TABLE city (
    id SERIAL PRIMARY KEY,
    city_name TEXT NOT NULL,
    zip INT,
    state_id INT REFERENCES state_
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(15) NOT NULL,
    password_ VARCHAR(20) NOT NULL,
    email TEXT,
    pref_region INT REFERENCES city
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    text_ TEXT NOT NULL,
    user_id INT REFERENCES users,
    city_id INT REFERENCES city
);
-- do a query on post table and delete all user id cases. 
-- INSERTS --

INSERT INTO region 
    (region_name)
VALUES
    ('US'),
    ('Canada'), 
    ('Europe'), 
    ('Asia/Pacific/Middle East'),
    ('Oceania'), 
    ('Latin America'), 
    ('Africa');

INSERT INTO country 
    (country_name, region_id)
VALUES
    ('US', 1),
    ('Canada', 2),
    ('Spain', 3),
    ('France', 3),
    ('Portugal', 3),
    ('Thailand', 4 ),
    ('Viet Nam', 4 ),
    ('Australia', 5),
    ('New Zeland', 5),
    ('Chile', 6),
    ('Peru', 6),
    ('Brazil', 6),
    ('South Africa', 7),
    ('Zimbawe', 7),
    ('Nigeria', 7);

INSERT INTO state_
    (state_name, country_id)
VALUES
    ('WA', 1),
    ('MO', 1),
    ('PA', 1),
    ('KS', 1),
    ('Alberta', 2),
    ('Ontario', 2),
    ('Quebec', 2),
    ('Asturias', 3),
    ('Cordoba', 3),
    ('Lyon', 4);

INSERT INTO city
    (city_name, zip, state_id)
VALUES 
    ('Aberdeen', 123456, 1),
    ('Aberdeen', 123456, 1),
    ('Springfield', 654321, 2),
    ('Columbia', 654322, 2),
    ('Wilmington', 343434, 3),
    ('Pittsburg', 353535, 3),
    ('Wichita', 121212, 4),
    ('Madrid', 100100, 11),
    ('Lyon', 9999, 10),
    ('Sevilla', 0099, 9),
    ('Zaragoza', 1111, 8);


INSERT INTO users
    (username, password_, email, pref_region)
VALUES
    ('ranger1234', 'mama', 'ranger@gmail.com', 1),
    ('motorMan', 'mama', 'motorman@gmail.com', 3),
    ('rover', 'mama', 'rover@gmail.com', 4),
    ('solo', 'mama', 'solo@gmail.com', 2);

INSERT INTO post 
    (title, text_, user_id, city_id)
VALUES
    ('Flowers', 'For sale at $100', 2, 3),
    ('Macbook air 2019', 'For sale at $1000', 2, 3),
    ('Nice truck', 'For sale at $1212121', 3, 4),
    ('Guitar', 'For sale at $50', 4, 12),
    ('Apartment for share', 'Share nice apartment room with nice view', 4, 12);



-- QUERIES -- 
SELECT city_name, state_name, country_name, region_name FROM city 
JOIN state_ ON city.state_id = state_.id
JOIN country ON state_.country_id = country.id
JOIN region ON country.region_id=region.id;


SELECT city_name, state_name, country_name, region_name FROM city 
JOIN state_ ON city.state_id = state_.id
JOIN country ON state_.country_id = country.id



SELECT title, city_name FROM post JOIN city ON post.city_id=city.id;

-- QUERY POSTS BY CITY --
SELECT title, text_, city_name, state_name  FROM post 
JOIN city ON post.city_id=city.id
JOIN state_ ON city.state_id=state_.id
WHERE city_name = 'Zaragoza';

-- QUERY POSTS BY PRODUCT--
SELECT title, username, city_name FROM post 
JOIN users ON post.user_id=users.id
JOIN city ON post.city_id = city.id
WHERE title ILIKE ('%truck%');





