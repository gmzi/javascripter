DML (Data Modification Language)

1. [postgreSQL](#postgreSQL)
   1. Create and navigate:
   - [create_db](##create_db)
   - [seed_db](##seed_db)
   - [navigate](##navigate)
   - [backup_db](##backup_db)
   - [drop_db](##drop_db)
   2. CRUD:
   - [INSERT...INTO](##INSERT...INTO)
   - [SELECT...FROM](##SELECT...FROM)
     - [WHERE](###WHERE)
     - [GROUP_BY](###GROUP_BY)
     - [HAVING](###HAVING)
     - [ORDER_BY](###ORDER_BY)
     - [LIMIT](###LIMIT)
     - [OFFSET](###OFFSET)
   - [UPDATE](##UPDATE)
   - [DELETE](##DELETE)
   3. OPERATORS
   - [operators](#SQL_operators)
   - IS
   - IS NOT
   - IN
   - NOT IN
   - BETWEEN
   - AND
   - OR
   - LIKE
   - ILIKE
   4. AGGREGATE FUNCTIONS
   - [AG_FUNCS](#aggregate_functions)
     - COUNT
     - MIN
     - MAX
     - SUM
     - AVG
   5. [JOIN](#JOIN)
      One to many:
      - JOIN
      - LEFT JOIN
      - RIGHT JOIN
      - FULL JOIN
        Many to many:
      - [many:many](## many:many)
   6. [ALIAS](#alias)
   7. [quotation_marks](#quotation_marks)
   8. [comments](#comments)

# postgreSQL

Almost all translatable to MySql and others relational db's.
Database _is not_ a file, it's a bunch of files and folders distributed in the local computer. They're not human readable, as they're optimized for speed.

## subclasses order of execution `[]` FOR NOT REQUIRED

- 1.  FROM
- 2.  [WHERE]
- 3.  [GROUP BY]
- 4.  SELECT
- 5.  [HAVING]
- 6.  [ORDER BY]
- 7.  [LIMIT]
- 8.  [OFFSET]`

1. navigate

## create_db

1. Option 1, in terminal:
   - cd to directory
   - `createdb my_database`
2. Option 2, in Posgres:
   - activate Postgres server
   - cd to directory
   - `psql`
   - `CREATE DATABASE my_database;`

## seed_db

(Starter data for an app.)

0. open Postgres app and run server.
1. cd to directory (check psql runing but not active in terminal)
2. - `psql < my_database_file.sql` fill database with starter data.
3. - `psql name_of_database` run database

## navigate

- `psql` check if server running
- `\q` quit server
- `\l` list all databases in local Postgres
- `\c db_name` connect to DB_NAME / switch to db_name
- `\dt` List all tables (in current db)
- `\d table_name` details about table_name
- `\d+ table_name` more details.
- `\x auto;` view adjusted to size of display

## drop_db

Delete database completely
Opotion 1: 0. psql active

1. cd out database
2. `DROP DATABASE my_database;`

   Option2 :

- `dropdb my_database_name`

## backup_db

Makes a file with all the data and schemas to recreate a database

- `pg_dump -C -c -O my_database_name > backup.sql` creates backup file.
- `psql < backup.sql` restores database from backup file (creates it and stores it)

---

2. # CRUD

CRUD:
C (create) `INSERT INTO`
R (Read) `SELECT ...FROM`
U (Update) ` UPDATE ...SET`
D (Delete) `DELETE FROM`

## INSERT...INTO

Insert new rows in our tables.

- `INSERT INTO books (title, author) VALUES ('The Iliad', 'Homer');`
- `INSERT INTO books (title, author) VALUES ('chickens', 'John Chicken'), ('animals', 'Darwin'), ('birds', 'charly bird');`

Retrieve an array with JSON from db: `{name, hobbies: [hobby, ...]}`

```sql
SELECT name, json_agg(hobby) AS hobbies
FROM users AS u
  JOIN hobbies AS h ON (u.name = h.user_name)
GROUP BY name;

```

## SELECT...FROM

- `SELECT * FROM table_name;` all cols and rows of table
- `SELECT column_name FROM table_name` column from tabl

### WHERE

- `SELECT * FROM students WHERE IsActive`
- `SELECT col_name FROM table_name WHERE condition`
- `SELECT title FROM books WHERE price = ('8.59');`
- `SELECT title, price FROM books WHERE price < 10;`
- `SELECT title FROM books WHERE page_count > 80 AND page_count <= 300`

### GROUP_BY

- `SELECT author, COUNT(*) FROM books GROUP BY author;`
  No duplicates in new list:
- `SELECT continent FROM world GROUP BY continent;`
  Total items in category:
- `SELECT category, COUNT(*) FROM analytics GROUP BY category;`

### HAVING

(Cool For functions aggregates)

- `SELECT publisher, COUNT(*) FROM books GROUP BY publisher HAVING COUNT(*) >= 2;` "take the publisher col, and the number of rows in which every publisher appears, and make a new table that has only the publishers that occurs 2 or more tan 2 times".
- `SELECT author, AVG(page_count) FROM books GROUP BY author HAVING AVG(page_count) > 650;`

### ORDER_BY

- `SELECT id, author FROM books ORDER BY id;` numbs sort in ascending order
- `SELECT id, author FROM books ORDER BY author;` str sorts in alphabetical order
- `SELECT id, author FROM books ORDER BY author desc;` descending order
- `SELECT id, author FROM books ORDER BY author asc;` ascending order
- `SELECT author, title FROM books ORDER BY author, title;` order by author, title and for duplicates order by author,title
- `SELECT app_name, reviews, min_installs, min_installs / reviews AS proportion FROM analytics WHERE min_installs >= 100000 ORDER BY proportion DESC LIMIT 1;`

### LIMIT

- `SELECT author, title FROM books LIMIT 5;` limit results to 5 rows.
- `SELECT * FROM books WHERE page_count > 500 ORDER BY page_count desc LIMIT 2;`

### OFFSET

Skip amount of rows for pagination

- `SELECT id, author FROM books LIMIT 5 OFFSET 15;` will result rows 16 to 20

## UPDATE

- `UPDATE books SET price = 0;` update all (warning)
- `UPDATE books SET author = 'caca' WHERE author = 'J. K. Rowling';` will pick the JK Rowling occurences and replace the 'author' column by the new 'caca' value

## DELETE

- `DELETE FROM books WHERE page_count > 500;`
- `DELETE FROM books WHERE title LIKE 'The%' OR title LIKE 'My%';`
- `DELETE FROM books;` (warning, erases all table)

---

3. # SQL_operators

# SQL_operators

- IS NOT `SELECT * FROM analytics WHERE min_installs <= 50 AND rating IS NOT null;`
- IN `SELECT id, title FROM books WHERE id IN (1, 7, 9);`
- NOT IN `SELECT id, title FROM books WHERE id NOT IN (1, 7, 9);`
- BETWEEN (range) `SELECT id, title FROM books WHERE id BETWEEN 20 and 25;` will throw rows with id 20 to 25 only.
  - `SELECT id, title FROM books WHERE id NOT BETWEEN 20 and 25;` all the rest except 20 to 25
- AND `SELECT yr, subject, winner FROM nobel WHERE subject = 'Physics' AND yr = 1980 OR subject = 'Chemistry' AND yr = 1984;`
- OR `SELECT yr, subject, winner FROM nobel WHERE subject = 'Medicine' AND yr < 1910 OR subject = 'Literature' AND yr >= 2004;`
- LIKE `SELECT id, title FROM books WHERE title LIKE 'T%';` "title starts wit "T" and not matter what letter comes after"
  - `SELECT id, title FROM books WHERE title LIKE '%t%';` "has a "t" anywere in title"
- ILIKE (non-case sensitive) `SELECT id, title FROM books WHERE title ILIKE '%harry%';` all 'Harry' or 'harry'
  - `SELECT author FROM books WHERE author ILIKE '% % %';` author name with two blank spaces between characters

---

4. # aggregate_functions

# aggregate_functions

- `SELECT COUNT(*) FROM books;` 40
- `SELECT MIN(price) FROM books;` $2.99
- `SELECT MAX(price) FROM books;` $43
- `SELECT SUM(PRICE) FROM books;` 432432423
- `SELECT AVG(page_count) FROM books;` 371.65000000
- `SELECT AVG(page_count) FROM books WHERE author = 'J. K. Rowling';`

[list_of_functions](https://www.postgresql.org/docs/9.5/functions-aggregate.html)

5. # alias

# JOIN

1. inner joins

```sql
SELECT title, name
   -- referencing table:--
   FROM movies
   -- referenced table:--
   JOIN studios
     ON movies.studio_id = studios.id;
     --"in the Movies table, the 'studio_id' field is referencing the 'studios.id' field in        the Studios table"--

-- JOIN FULL TABLES --
 SELECT * FROM movies JOIN studios ON movies.studio_id = studios.id;

 -- JOIN SELECTED FIELDS FROM TWO TABLES --
SELECT col_of_table_1, col_of_table_2 FROM table_1 JOIN table_2ONtable_1.name_of_coL = table_2.name_of_col;

SELECT title, founded_in FROM movies JOIN studios ON moviesstudio_id= studios.id;

 -- JOIN TABLES WITH SAME FIELD NAME --
 SELECT movies.id, studios.id FROM movies JOIN studios ONmoviesstudio_id = studios.id;
```

2. Outer join

```sql
-- LEFT JOIN --
SELECT title, name AS studio_name FROM movies LEFT JOIN studios Omovies.studio_id = studios.id

--RIGHT JOIN--
SELECT title, name AS studio_name FROM movies RIGHT JOIN studioON movies.studio_id = studios.id

--FULL JOIN--
SELECT title, name AS studio_name FROM movies FULL JOIN studios Omovies.studio_id = studios.id;
```

## many:many

```sql
SELECT title, first_name, last_name FROM roles JOIN actors ON roles.actor_id = actors.id JOIN movies ON roles.movie_id = movies.id;

SELECT * FROM roles JOIN actors ON roles.actor_id = actors.id JOIN movies ON roles.movie_id = movies.id;

--SELECT COLUMNS USING TABLE ALIAS--
SELECT m.title, a.first_name, a.last_name
FROM movies m
JOIN roles r
ON m.id = r.movie_id
JOIN actors a
ON r.actor_id = a.id;
```

Outer join:

```sql
SELECT *
FROM roles r
FULL JOIN movies m
ON r.movie_id = m.id
FULL JOIN actors a
ON r.actor_id = a.id;
```

---

# alias

Name the result columns to make data easier to understand.

1.  alias:

- `SELECT AVG(price) AS caca FROM books;` column with name "caca" and avg price number.
- `SELECT AVG(page_count) AS pages_average, AVG(price) AS price_average FROM books GROUP BY author;` two columns with their custom names

2.  alias and reference:

- `SELECT author, SUM(page_count) AS caquita FROM books GROUP BY author ORDER BY caquita;`
- `SELECT age AS age, COUNT(age) AS total_people FROM people GROUP BY age HAVING COUNT(age) >= 10`

6. # quotation_marks

- `SELECT * FROM nobel WHERE winner = 'EUGENE O''NEILL';`

7. # comments

```sql
-- this is a comment-comment --
```

---

# more

## join

### join_1:M

Join one to many tables

Create table in memory that combines information from different tables. Data from tables is matched according to join condition. Join condition involves comparing a foreign key from one table and a primary key in another table.

1. Inner join (default type of join `join` === `inner join`)
   Gets only the data that is overlaped between the two tables, leaves out the data existing in only one of the tables.

   ```sql
   SELECT title, name
   -- referencing table:--
   FROM movies
   -- referenced table:--
   JOIN studios
     ON movies.studio_id = studios.id;
     --"in the Movies table, the 'studio_id' field is referencing the 'studios.id' field in        the Studios table"--

    -- JOIN FULL TABLES --
     SELECT * FROM movies JOIN studios ON movies.studio_id = studios.id;

     -- JOIN SELECTED FIELDS FROM TWO TABLES --
    SELECT col_of_table_1, col_of_table_2 FROM table_1 JOIN table_2 ON table_1.name_of_coL = table_2.name_of_col;
    SELECT title, founded_in FROM movies JOIN studios ON movies.studio_id = studios.id;

     -- JOIN TABLES WITH SAME FIELD NAME --
     SELECT movies.id, studios.id FROM movies JOIN studios ON movies.studio_id = studios.id;
   ```

1. Outer Join
   For data that doesn't overlap. "Left": first table, "Right": second table.

   - left join
     Overlaped data plus data existing only in left table.
   - righ join
     Overlaped data plus data existing only in left table.
   - full join
     All data from both sides, overlaped or not.

   ```sql
    -- LEFT JOIN --
     SELECT title, name AS studio_name FROM movies LEFT JOIN studios ON movies.studio_id = studios.id;

     --RIGHT JOIN--
     SELECT title, name AS studio_name FROM movies RIGHT JOIN studios ON movies.studio_id = studios.id;

     --FULL JOIN--
     SELECT title, name AS studio_name FROM movies FULL JOIN studios ON movies.studio_id = studios.id;
   ```

### join_M:N

Join multiple tables.

```sql
SELECT title, first_name, last_name FROM roles JOIN actors ON roles.actor_id = actors.id JOIN movies ON roles.movie_id = movies.id;

SELECT * FROM roles JOIN actors ON roles.actor_id = actors.id JOIN movies ON roles.movie_id = movies.id;

--SELECT COLUMNS USING TABLE ALIAS--
SELECT m.title, a.first_name, a.last_name
FROM movies m
JOIN roles r
ON m.id = r.movie_id
JOIN actors a
ON r.actor_id = a.id;
```

Outer join:

```sql
SELECT *
FROM roles r
FULL JOIN movies m
ON r.movie_id = m.id
FULL JOIN actors a
ON r.actor_id = a.id;
```

## insert_data

```sql
INSERT INTO studios
  (name, founded_in)
VALUES
  ('Walt Disney Studios Motion Pictures', '1953-06-23'),
  ('20th Century Fox', '1935-05-31'),
  ('Universal Pictures', '1912-04-30');

INSERT INTO movies
  (title, release_year, runtime, rating, studio_id)
VALUES
  ('Star Wars: The Force Awakens', 2015, 136, 'PG-13', 1),
  ('Avatar', 2009, 160, 'PG-13', 2),
  ('Black Panther', 2018, 140, 'PG-13', 1),
  ('Jurassic World', 2015, 124, 'PG-13', 3),
  ('Marvel’s The Avengers', 2012, 142, 'PG-13', 1);
```

## relations

1. One to many (1:M)
   "one author has many books, but many books have only one author".

   - Primary Key: often is the same as the id of an element. One per row. Is the unique identifier of a row.
   - Foreign key: a key coming from a foreign table.
   - Referencing table: the table that contains foreign keys pointing to another table
   - Referenced table: the table being "called" by its primary keys.

   ## foreign_key_constrained_row_delete

   Delete an item that is being referenced elsewhere:
   OPTION 1:

   ```sql
    UPDATE movies SET studio_id=NULL WHERE studio_id=1;
    DELETE FROM studios WHERE id=1;
   ```

   OPTION 2:

   ```sql
    DELETE FROM movies WHERE studio_id=1;
    DELETE FROM studios WHERE id=1;
   ```

2. Many to Many (M:N)
   ![graphic](/images/many_to_many.jpg)
   "One movie has many actors, and one actor has many movies".
   Structured table, stored in database, third join table that combines data from the other two tables.

---

For syntax check z-terminal.md

Almost all translatable to MySql and others relational db's.
Database _is not_ a file, it's a bunch of files and folders distributed in the local computer. They're not human readable, as they're optimized for speed.

CRUD:
C (create) `INSERT INTO`
R (Read) `SELECT ...FROM`
U (Update) ` UPDATE ...SET`
D (Delete) `DELETE FROM`

## SQL

Structured Query Language. Human-readable language for relational databases.
Syntax:
Bare in mind:

- Case sensitive.
- single quotes
- Separate queries with `;`
- Keywords ALL IN CAPS (by convention)

## Connect to db:

- `psql` check if server running
- `\q` quit server

## create_db

- `createdb my_database_name` create database
- FROM HOME DIRECTORY: `psql name_of_database` connects to database

## navigate

- `\l` list all databases
- `\c DB_NAME` connect to DB_NAME / switch to db_name
- `\dt` List all tables (in current db)
- `\d TABLE_NAME` details about table_name

## seed_db

(Starter data for an app.)

- `psql < my_database_name.sql` fill database with starter data.

## drop_db

Delete database completely

- `dropdb my_database_name`

## backup_db

Makes a file with all the data and schemas to recreate a database

- `pg_dump -C -c -O my_database_name > backup.sql` creates backup file.
- `psql < backup.sql` restores database from backup file (creates it and stores it)

## install

1. Install from postgres website. Configure $PATH. Initialize from mac app. Once server is running:
2. In terminal: `psql` If it opens postgres connection you're ok.
3. `\q` exits the postgres server

# databases

## table

The spreadsheet-like columns and rows that organize the data:

- column: a table attribute (id, title, genre, year)
- row: the recorded values for each column (2, "The shinining", Terror, 1979).

## SQL

Structured Query Language. Human-readable language for querying the database in search for certain query terms. (Delete all movies, give me best rated movies by user, add new movie, etc. )

## RDBMS

Relational Database Management System. Is the software that we run to comunicate with the database. Postgres is a RDBMS.

## schema

A logial representation of a database including its tables. This is the pattern in which the data will be organized. The "format" in which our data will be distributed.

Types of databases:

1. Relational:

- Stores data in tables (rows and columns of tabular data, similar to spreadsheet). Each table is related to other tables. (non human readable). Are sql:
- Postgres
- MySQL
- SQLite

2. Non sql, no sequel.

- Use Key-value, or graph, or column, or other different ways to store the data. They are less structured. Are non sql:
- MongoDB

Is a collection of data organized to be efficiently sotred, accessed and managed.
People says database also to refer to the server software that serves the database, and also to the physical machine that stores the data.

![client-server-db](/images/client-server-db.jpg)
