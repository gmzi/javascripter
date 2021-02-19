Cool lines:

```sql
-- COUNT, JOIN, GROUP BY ORDER BY --
SELECT first_name, last_name, COUNT(*) as total_roles FROM roles JOIN actors ON roles.actor_id = actors.id GROUP BY actors.id ORDER BY total_roles DESC;


--MULTIPLE JOIN and tricks--
SELECT m.title, a.first_name, a.last_name
FROM movies m
JOIN roles r
ON m.id = r.movie_id
JOIN actors a
ON r.actor_id = a.id
WHERE release_year < 2000
ORDER BY m.release_year, a.first_name;
```

Cool examples:

```sql
-- NESTED QUERIES--
SELECT title, name
	FROM movie JOIN casting ON (movieid=movie.id AND ord=1)
		        JOIN actor ON (actorid=actor.id)
WHERE movie.id IN (
	SELECT movieid FROM casting
	  WHERE actorid IN (
		SELECT id FROM actor
		 WHERE name='Julie Andrews'))


SELECT first_name, last_name, AVG(price), COUNT(owner_id)
FROM owners
JOIN vehicles
ON owners.id=owner_id
GROUP BY (first_name, last_name)
HAVING
COUNT(owner_id) > 1 AND ROUND(AVG(price)) > 10000
ORDER BY first_name DESC;


SELECT name, COUNT(*) AS total FROM movies JOIN studios ON movies.studio_id = studios.id GROUP BY studios.name ORDER BY total;

SELECT first_name, last_name, COUNT(owner_id) FROM owners JOIN vehicles ON owners.id=vehicles.owner_id GROUP BY (first_name, last_name) ORDER BY first_name;
```
