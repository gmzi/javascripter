-- write your queries here --

SELECT * FROM owners JOIN vehicles ON owners.id = vehicles.id;

SELECT first_name, last_name, COUNT(owner_id) FROM owners JOIN vehicles ON owners.id=vehicles.owner_id GROUP BY (first_name, last_name) ORDER BY first_name;

SELECT first_name, last_name, AVG(price), COUNT(owner_id)
FROM owners 
JOIN vehicles 
ON owners.id=owner_id
GROUP BY (first_name, last_name)
HAVING
COUNT(owner_id) > 1 AND ROUND(AVG(price)) > 10000
ORDER BY first_name DESC;