1. [git](#git)
   - [branches](##branches)
2. [github](#github)
   - [push](##push)
   - [clone_project](##clone_project)
   - [pull](##pull)
   - [Open_source_contributions_workflow](####Open_source_contributions_workflow)
3. [dirs-and-files](#dirs-and-files)
   - [list](###list)
   - [create](###create)
   - [view](###view)
   - [remove](###remove)
   - [open](###open)
   - [move/rename](###move/rename)
   - [copy](###copy)
   - [source/clear/q](###cource/clear/q)
4. [shortcuts](#shortcuts)
   - [terminal](##terminal)
   - [VSCode](##VSCode)
   - [chrome](##chrome)
   - [mac](##mac)
5. [Requests](#Requests)
   - [curl](##curl)
   - [local-server](##local-server)
6. [PYTHON](#PYTHON)
   - [venv](##venv)
   - [flask](##flask)
   - [clone_project](##clone_project)
   - [global_install](##global_install)
7. [postgreSQL](#postgreSQL)
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
      - JOIN
      - LEFT JOIN
      - RIGHT JOIN
      - FULL JOIN
   6. [ALIAS](#alias)
   7. [quotation_marks](#quotation_marks)
   8. [comments](#comments)

# git

Git tracks all version history (will stay local unless is pushed to a remote repo)

1. `cd projectname` go to project's folder.
2. `git status` to check you're not initializing a git repo inside other git repo.
3. `git init` initialize repo.
4. git settings:

   - `git config user.name` existing local username (none if empty)
   - `git config user.name userName` create local username
   - `git config user.email` existing local email (none if empty)
   - `git config user.email user@email.com` create local email
   - `git config --global user.name` existing global usr
   - `git config --global user.name userName` create global usr
   - `git config --global user.email` existing global email.
   - `git config --global user.email email@address.com` add global email.

5. (`git diff` highlight changes to be staged.)

6. `git add .` (mind the space and dot) stages ALL files for commit.

   - `git status` to check

   - `git add filename.extension` stage ONLY that file for commit.

7. `git commit -m "Description of commit"` Commits changes and prepares them to be pushed.

   - `git status` check status ("nothing to commit" is fine). All changes will be here, if any.
   - `git log` returns commit hash of each file with changes to commit.

8. ## branches

   (for experiments, new ideas, trying things before putting them in master branch)

   Check where are you branching from, new branches are nested in current branch.

   1. `git branch` list of branches (asterisc marks what branch are you in)
   2. `git branch namefBranch` create new branch.
   3. `git checkout branchName` go to new branch (or any branchName).
      - (`git checkout -b nameOfBranch` creates new branch and jumps into it).
   4. Modify project's code (add files or remove them, change code, make cool things)
   5. `git add .` stage changes in current branch.
   6. `git commit -m "description"` commit changes to current branch.
   7. `git log --oneline` check commit.
   8. Merge:
   9. Go to branch where you want the merge on.
   10. `git merge nameOfBranch` merges nameOfBranch in current branch. (fast-forward merge)
   11. Delete:
   12. `git branch -d nameOfBranch` delete branch (you must be in another branch, can't delete from current branch).

9. ## MERGE CONFLICTS

   Go back to VSCode and fix the conflicts. Then git add . and git commit -m "description".

10. ## Remove git
    - `rm -rf .git` remove all git.
    - `rm -rf .git*` remove all git and metadata.

---

# github

## push

7. Create `.gitignore` file.

   1. if python:
      - create requirements.txt
   2. :
      - `venv/` for python projects
      - `.file_name` in gitignore
      - `folder_name/`in gitignore

8. Create Github repo and copy it's url.
9. `git remote add origin ProjectsUrl` sets new remote and assigns the nickname "origin" to it.
10. `git remote -v` Verifies the new remote
11. `git push -u origin master` pushes changes from local branch to remote repo. The flag -u sets "origin" as default repo and "master" as default branch to be pushed. So in future pushes, just type `git push` and it will be done (master branch to origin repo).
12. pull the readme file!!!!!
13. `git push origin branchName` pushes branchName only.
14. `git push` pushes default branch to default repo.

## clone_project

Clone a github repo into local machine, it will be your own version of the repo.

1. Copy repo's url.
2. check in terminal where you are and where you want the clone, and git status not initialized there.
3. `git clone projectUrl` clones in local folder.
4. Create or remove files and folders, stage them and commit them with no problem. Just can't push the changes unless with permission from the owner.

## pull

Pull changes down from remote repo and applies them to the local version of the project.

1. Go to project's folder:
2. `git remote -v` check sources.
3. `git pull origin master` pulls brnachName changes, if any, into local folder.

---

## Open_source_contributions_workflow

find first issues: search `good first issues` on github.

#### To contribute to a repo:

You can contribute reporting a bug, suggesting a new feature, translating
documentation or text in general, or with actual code. These are the steps:

1.  fork the repo in to your github account.
2.  clone repo in your local computer vscode.
3.  Make the changes, stage them and push them.
4.  Now, after your changes are pushed and visible in your github, make the PULL REQUEST.
5.  Put the title and description of the change that you propose.
6.  Now the owner of the repo will decide about merging in your change or not (you should see your requeest on the owner's repo).

`git clone https://....` clone a repository in local folder

---

10. GO BACK IN VERSION HISORY: (not checked, and broke a couple of things with it so do some more research )

    1. `git log` see all the hashes with their descriptions, and pick the one you want to come back to. (Type `q` to exit log list).
    2. `git checkout hashNumber` this will go back the project to the desired hash version.

---

# dirs-and-files

- `/` root directory. (Macintosh HD)
- `~` home directory (xxx)
- `~` === `/Users/xxx`
- `pwd` print working directory.
- `cd folderName` change directory.
- `cd + firstLetter + tab` autocomplete folderName
  - `cd ~` change directory to home.
- `cd ..` go one level backwards.
- `man + commandName` manual of given command (`q` to get out of it, enter to scroll)

### list

- `ls` list all files and folders of the directory
  - `ls nameOfFolder` list content of folder (no need to cd to that folder to see the list)
  - `ls -a` lists all (hidden files)(hidden files names starts with a dot)
  - `ls -1` display in one column
  - `ls -l` long list (date and time of creation, user, files, etc)
  - `ls -al` (-a and -l combined)
  - `ls -a -l` (same as above)
  - `ls -lS` list sorted by size
  - `ls -lh` list sorted by size in human readable format
  - `ls -lt` list sorted by modification time

### create

- `mkdir folder1 folder2 folder3` make directory/ies inside the current directory.
- `touch index.html app.js style.css` create new empty file/s. (if file already exists, `touch` command will modify it's modification date and time)
- `echo "hola caca" > caca.txt` create new file and write content in it.

### view

- `cat fileName` shows file's content.
- `echo "something"` repeats what's inside quotes
- `echo "hello World" > app.js` overwrites the left hand text on the right hand file (beware it erases the previous content of the file)

### remove

- `rm name.ext` removes file permanently (beware there's no undo to this).
- `rmdir folderName` removes empty folder (if there's file in it, won't delete it, not undo once deleted)
- `rm -rf folderName` removes folder and nested files (BEWARE NO UNDO)

### open

- `open file.ext` opens file with default app.
- `open folderName` opens folder in finder.
- `open .` opens current directory in finder.
- `open ..` opens prior directory in finder.

### move/rename

- `mv file.txt ../` move file.txt to ../ (one level up).
- `mv file.txt path/to/folder` move file to folder inside current dir.
- `mv folderName path/to/folder` move folder
- `mv coca_cola_formula.txt folder1/formula.txt` move file and rename it.
- `mv fileName.txt newFileName.txt` rename file
- `mv ~/projects/nameOfDir ~/projects/new-name-of-dir` rename directory.

### copy

- `cp fileName.txt fileCopy.txt` copy file
- `cp path/to/file.txt path/to/copiedFile.txt` copy file in different location.
- `cp dull.txt ../dull_copy.txt` copy and move file.
- `cp -r Folder_Name New_Folder_Name` copy folder.
- `cp caca.txt folder6/caca_copia.txt` copy and rename file.
- `cp -r folder6 folder1/foler6_copia` copy and rename folder.

### source/clear/q

`src` source
`clear` cleans console.
`q` get out of there exit quit

---

# shortcuts

## terminal

- `option + click` move along the line with mouse.
- `ctrl + a` go to beginning of line.
- `ctrl + e` go to end of line.
- `ctrl + w` delet word (put cursor in end of word to remove it)
- `ctrl + u` delete entire line (put cursor at end).
- `option + left/right arrows` jump words.

## VSCode

- `! + tab`: html template
- `.classname + tab` new div with class name given.
- `⌘ + d` select word, press it again and select
  next occurence of that word, and so on.
- `⌘ + i` context-specific options (CSS, HTML and JS)
- `option + arrows` move entire line up or down.
- `⌘ + \` split windows.
- `control + tab` switch opened tabs.
- `⌘ + 1, 2, etc` swith group of tabs.
- "⌘ + `" switch windows.
- `opt + ⌘ + up/down arrows` add cursors.

## chrome

- `opt + ⌘ + i` inspector.
- `opt + ⌘ + j` JS console.
- `⌘ + k` clear console.

## mac

- ``⌘ + ` ` swith safari windows
- `opt + F2` display preferences
- `opt + f10` sound preferences
- `⌘ + shift + .` show hidden files and folders.

--

# Requests

- `dig website.url` IP address from hostname and DNS, if no IP, the host name is not found.
- `dig website.url +trace` detailed IP, hostname, DNS.
- `trace website.url` trace IP's from local to destination

## curl

Client url

- `curl [options] [URL...]` GET response body from server.
- `curl -v [URL]` get detailed response.
- `curl -d "string" [URL...]` POST data as string in URL server (ex. '{"username":"xyz","password":"xyz"}').
- `curl -d @file [URL...]` POST data as file in url server.
- `-X` --request to specify HTTP verb (ex. '-X POST')
- `-H` --header to specify additional headers (ex. '"Content-Type: application/json"')
  (ex. of larger request:
  "curl --header "Content-Type: application/json" \
   --request POST \
   --data '{"username":"xyz","password":"xyz"}' \
   https://myapplication.com/login")

## local-server

- `python3 -m http.server` start server in local machine with python3.

---

# PYTHON

## venv

1. create virtual environment

   1. cd to desired directory
   2. `python3 -m venv venv` ("using the 'venv' module create a folder called 'venv' and put default stuff in there)
   3. `source venv/bin/activate` ("activate the venv folder just created" (no need to cd to the venv folder))
   4. Create .gitignore file in main folder and add `venv/` in it.
   5. [every time you want to run the venv you have to source it (step 3)]
   6. [inside the venv, type `python` to run it's local python version, the venv will have the python version used when you created it.]
   7. Install packages:
      1. `(venv)` prompt in terminal? -
      2. `pip install packageName` installs package
         - `pip uninstall packageName` uninstalls package
         - `pip list` list of all installed packages
   8. `pip freeze` list all installed packages
   9. `pip freeze > requirements.txt` creates file in local dir with all the dependencies the app relies on. Needs to be updated every time a package is installed by running this same command.
   10. In GITIGNORE file: `venv/` (don't track the venv folder in github, that's why we make this)
   11. `deactivate` virtual envsource

## flask

2. Setup flask server

   1. Installing Flask
      1. mkdir or cd to directory
      2. create virtual env (`python3 -m venv venv`)
      3. activate venv (`source venv/bin/activate`)
      4. `pip install flask`
   2. Make a python file to run your code:
      1. cd to project main folder
      2. `touch app.py`
      3. in 'app.py', instantiate your app:
         - `from flask import Flask`
         - `app = Flask(__name__)`
   3. Start server:
      1. Production mode
         - `flask run` (with virtual env active)
         - `ctrl + C` stop server
      2. Development mode (debugger and restart activated):
         - `FLASK_ENV=development flask run`
         - (Set dev mode to default in local venv and not permanently:
           1. check venv active
           2. `export FLASK_ENV=development`
           3. `flask run` will run dev mode by default, until terminal window is closed.)
         - (change bash profile so it runs flask dev mode by default in all terminals):
           1. go to local .zshrc file
           2. paste `export FLASK_ENV=development`
           3. reboot all terminals
           4. `flask run` in venv will run in dev mode by default.
   4. (If flask app file isn't called 'app.py':
      - `FLASK_APP=my_custom_name.py flask run` (mind the not spaced chars))

3. Flask debug toolbar:

   1. check venv active
   2. `pip install flask-debugtoolbar`
   3. in app.py:

   ```python
   from flask_debugtoolbar import DebugToolbarExtension

   app = Flask(__name__)

   # config debugger:
   app.config['SECRET_KEY'] = "caca"
   debug = DebugToolbarExtension(app)
   # to stop debugger:
   app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
   ```

## clone_project

Clone python project

1.  cd to dir where you want the clone in
2.  `git clone http://project.url`
3.  cd to clone's folder
4.  create virtual environment
5.  activate virtual environment
6.  `pip install -r requirements.txt`
7.  enjoy!!!!!!

## global_install

8.  Global install (puaj)

    - `which python3` python version;
    - `which packageName` library version
    - `ctrl + d` quit python;
    - `q` to quit from places;
    - `python3` runs the python3 repl (read-evaluate-print-loop). It's like the JS console, but more powerful.
    - `help()` list of help topics.
    - `pip3 install package_name` installs package globally
    - `pip3 uninstall package_name` installs package globally
    - `pip3 list` lists installed packages

---

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

- `createdb my_database_name` create database
- FROM HOME DIRECTORY: `psql name_of_database` connects to database

## navigate

- `psql` check if server running
- `\q` quit server
- `\l` list all databases
- `\c DB_NAME` connect to DB_NAME / switch to db_name
- `\dt` List all tables (in current db)
- `\d TABLE_NAME` details about table_name
- `\x auto;` view adjusted to size of display

## seed_db

(Starter data for an app.)

0. open Postgres app and run server.
1. cd to directory
2. - `psql < my_database_name.sql` fill database with starter data.

## drop_db

Delete database completely

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

1. inner join

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

Cool examples:

```sql
SELECT name, COUNT(*) AS total FROM movies JOIN studios ON movies.studio_id = studios.id GROUP BY studios.name ORDER BY total;
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
