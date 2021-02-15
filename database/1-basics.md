# postgreSQL

Almost all translatable to MySql and others relational db's.
Database _is not_ a file, it's a bunch of files and folders distributed in the local computer. They're not human readable, as they're optimized for speed.

## SQL

Structured Query Language. Human-readable language for relational databases.
Syntax:
Bare in mind:

- Case sensitive.
- single quotes
- Separate queries with `;`
- Keywords ALL IN CAPS (by convention)
-

```sql

```

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
