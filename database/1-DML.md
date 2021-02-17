# postgreSQL

DML (Data Modification Language)

## relations

1. One to many (1:M)
   "one author has many books, but many books have only one author".

   - Primary Key: often is the same as the id of an element. One per row. Is the unique identifier of a row.
   - Foreign key: a key coming from a foreign table.
   - Referencing table: the table that contains foreign keys pointing to another table
   - Referenced table: the table being "called" by its primary keys.

   ## foreign_key_constraint_setup

   `references` keyword will prevent the referencing table from creating an id that doesn'texist in the referenced table, and from deleting a foreign ID pointing to the referencedtable.

   ```sql
   -- the referenced table: --
   CREATE TABLE studios
   (
   id SERIAL PRIMARY KEY,
   name TEXT NOT NULL,
   founded_in DATE
   );
   -- the referencing table: --
   CREATE TABLE movies
   (
   id SERIAL PRIMARY KEY,
   title TEXT NOT NULL,
   release_year INTEGER,
   runtime INTEGER,
   rating TEXT,
   studio_id INTEGER REFERENCES studios
   );
   ```

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

   ## setup_constraints

   ```sql
   create TABLE roles
    (id SERIAL PRIMARY KEY,
      movie_id INTEGER REFERENCES MOVIES (id),
      actor_id INTEGER REFERENCES actors (id));
   ```

## join

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

2. Outer Join
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

```

```
