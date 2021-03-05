-- Comments in SQL Start with dash-dash --
SELECT * FROM analytics WHERE id = 1880;

SELECT id, app_name FROM analytics WHERE last_updated = '2018-08-01';

SELECT category, COUNT(*) FROM analytics GROUP BY category;

SELECT app_name, reviews FROM analytics ORDER BY reviews desc LIMIT 5;

SELECT app_name, reviews, rating FROM analytics WHERE rating >= 4.8 ORDER BY reviews desc LIMIT 1;

SELECT category, AVG(rating) AS avg_rating FROM analytics GROUP BY category ORDER BY avg_rating desc;

SELECT app_name, price, rating FROM analytics WHERE rating < 3 ORDER BY price desc LIMIT 1;

SELECT * FROM analytics WHERE min_installs <= 50 AND rating IS NOT null ORDER BY rating desc;

SELECT app_name FROM analytics WHERE rating < 3 AND reviews >= 1000;

SELECT * FROM analytics WHERE price BETWEEN 0.10 and 1.00 ORDER BY reviews desc LIMIT 10;

SELECT MIN(last_updated) AS last_update, app_name FROM analytics GROUP BY app_name  ORDER BY MIN(last_updated) asc LIMIT 1;

SELECT app_name, price FROM analytics ORDER BY price desc LIMIT

SELECT COUNT(reviews) FROM analytics;

SELECT category FROM analytics GROUP BY category HAVING COUNT(*) > 300;

SELECT app_name, reviews, min_installs,  min_installs / reviews AS proportion FROM analytics WHERE min_installs >= 100000 ORDER BY proportion DESC LIMIT 1;