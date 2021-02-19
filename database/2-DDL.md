DDL (Data Definition Language)
Schema Design.
Create, Update, Remove databases and tables.

1. [syntax](#syntax)
2. [deletion](#deletion_behavoir)
3. [alter](#alter_table)
4. [datatypes](#sql_datatypes)
   - INT
   - FLOAT
   - TEXT
   - VARCHAR[(n)]
   - TIMESTAMP
   - SERIAL
5. [null](#NULL)
6. [constraints](#constraints)
7. [default_values](#default_values)
8. [indexing](#indexing)
9. [crows_foot_notation](#Crows_Foot_Notation)
10. [create_database](#create_database)
11. [normalization](#normalization)

# syntax

- create a .sql file, or a .pgsql file for cool vsCode linter.

```sql
DROP DATABASE IF EXISTS  movies_example;

CREATE DATABASE movies_example;

\c movies_example -- connects to db--

-- ONE TO MANY --
CREATE TABLE movies
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  release_year INTEGER,
  runtime INTEGER,
  rating TEXT,
  studio_id INTEGER REFERENCES studios
);


-- CONSTRAINS --
CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- 'primary key' means UNIQUE NOT NULL--
    username VARCHAR(15) UNIQUE,
    team_id INTEGER REFERENCES teams, --by default references to 'id' col of table 'teams'.--
    matches INTEGER REFERENCES matches(won), -- references to col 'won' of table 'matches' --
    phone_number TEXT UNIQUE,
    password TEXT NOT NULL,
    account_balance FLOAT CHECK (account_balance > 0)
);


-- DEFAULT VALUES --
CREATE TABLE subreddits (
    id SERIAL PRIMARY KEY,
    subscribers INTEGER DEFAULT 1,
    is_private BOOLEAN DEFAULT false
);


-- MANY TO MANY
CREATE TABLE roles
(
  id SERIAL PRIMARY KEY,
  movie_id INTEGER REFERENCES movies ON DELETE CASCADE,
  actor_id INTEGER REFERENCES actors ON DELETE SET NULL
);

---------------------

-- INSERTS --
INSERT INTO movies
  (title, release_year, runtime, rating, studio_id)
VALUES
  ('Star Wars: The Force Awakens', 2015, 136, 'PG-13', 1),
  ('Avatar', 2009, 160, 'PG-13', 2),
  ('Black Panther', 2018, 140, 'PG-13', 1),
  ('Jurassic World', 2015, 124, 'PG-13', 3),
  ('Marvel’s The Avengers', 2012, 142, 'PG-13', 1);

INSERT INTO roles
  (movie_id, actor_id)
VALUES
  (1, 1),
  (1, 2),
  (3, 2);
```

# deletion_behavoir

Delete a table that has reference to another table.

- Option 1:
  ```sql
  CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    ...
    studio_id INTEGER REFERENCES studios ON DELETE SET NULL
  ); -- MIND THAT CAN'T BE A 'NOT NULL' CONSTRAINT IN THE REFERENCED TABLE --
  ```
- OPTION 2:
  ```sql
  CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE, --this will delete the referencing row also --
  );
  ```

# alter_table

Add, drop, rename columns

```sql
ALTER TABLE books ADD COLUMN in_paperback BOOLEAN DEFAULT 'something' ;

ALTER TABLE books DROP COLUMN in_paperback; -- data is gone, no undo option --

ALTER TABLE books RENAME COLUMN page_count TO num_pages;
```

# drop

Can't undo it, no backup.

```sql
DROP DATABASE my_database
```

# sql_datatypes

Column datatypes:
[full_list](https://www.postgresql.org/docs/9.5/datatype.html)

- integer or int
- float
- text
- varchar [(n)] or character varying [(maximum number of characters)]
- Timestamp (date and time)
- Serial (auto incrementing numbers, used for primary keys)

# NULL

To select null values in tables:

- `SELECT * FROM subreddits WHERE name IS NULL;`

# constraints

Basic forms of data validations.
Constraints are:

- Primary Key (every table must have a unique identifier)
- Unique (prevent duplicates in the column)
- NOT NULL (prevent null in the column)
- Check (do a logical condition before inserting/updating)
- Foreign Key (column values must reference values in another table)

Example:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- 'primary key' means UNIQUE NOT NULL--
    username VARCHAR(15) UNIQUE,
    team_id INTEGER REFERENCES teams, --by default references to 'id' col of table 'teams'.--
    matches INTEGER REFERENCES matches(won), -- references to col 'won' of table 'matches' --
    phone_number TEXT UNIQUE,
    password TEXT NOT NULL,
    account_balance FLOAT CHECK (account_balance > 0)
);
```

# default_values

```sql
CREATE TABLE subreddits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(15) NOT NULL,
    description TEXT,
    subscribers INTEGER DEFAULT 1,
    is_private BOOLEAN DEFAULT false
);
```

# indexing

The database index stores column values to speed up retrieval via SELECT and WHERE queries.
You want to add an index to a column that you know that you'll query.
Indexing takes time and space.

1. Create index:

   ```sql
   -- SINGLE COLUMN INDEX--
   CREATE INDEX index_name ON table_name (column_name);

   -- MULTI COLUMN INDEX --
   CREATE INDEX index_name ON table_name (column1_name, column2_name);
   ```

2. Check if index created:

   - `\d table_name`
     It should be under 'indexes' below the primary key index.

3. Drop index:

   ```sql
   DROP INDEX index_name;
   ```

# Crows_Foot_Notation

Notation used specifically for database design.
![image](/images/crows-notation.jpg)

[full_syntax](https://www.joshrodriguez.com/data-management/designing-an-entity-relationship-diagram-erd/)

# create_database

1. Option 1, in terminal:
   - cd to directory
   - `createdb my_database`
2. Option 2, in Posgres:
   - activate Postgres server
   - cd to directory
   - `psql`
   - `CREATE DATABASE my_database`

# normalization

A design database technique to reduce redundancy and dependency of data. Divides larger tables into smaller tables and links them using relationships.
Basically, split up duplicated data into small tables referencing each other.
