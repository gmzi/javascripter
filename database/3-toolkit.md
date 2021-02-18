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
