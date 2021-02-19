DROP DATABASE example_db;
CREATE DATABASE example_db;
\c example_db;

CREATE TABLE subreddits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(15) NOT NULL,
    description TEXT, 
    subscribers INTEGER DEFAULT 1,
    is_private BOOLEAN DEFAULT false
);


CREATE TABLE users (
    id SERIAL DEFAULT 00000,
    username VARCHAR(15) UNIQUE,
    phone_number TEXT UNIQUE,
    password TEXT NOT NULL,
    account_balance FLOAT CHECK (account_balance > 0)
);


CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    ...
    studio_id INTEGER REFERENCES studios ON DELETE SET NULL
);


CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    ...
);


ALTER TABLE books ADD COLUMN in_paperback BOOLEAN;

ALTER TABLE books DROP COLUMN in_paperback;

ALTER TABLE books RENAME COLUMN page_count TO num_pages;