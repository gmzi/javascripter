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
   - [secret_keys](##secret_keys)
6. [PYTHON](#PYTHON)
   - [venv](##venv)
   - [flask](##flask)
   - [flask-WTF](##flask-WTF)
   - [clone_project](##clone_project)
   - [global_install](##global_install)
7. [DATABASE](#DATABASE)

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
      - `pip freeze > requirements.txt`
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
  (ex. of POST request:
  `curl --header "Content-Type: application/json" \ --request POST \ --data '{"username":"xyz","password":"xyz"}' \ https://myapplication.com/login`

## local-server

- `python3 -m http.server` start server in local machine with python3.

## secret_keys

1. .gitignore:

```
secrets.py
venv/
```

2. secrets.py:

```python
API_SECRET_KEY = 'fdsfsdf234234234234'
```

3. app.py:

```python
from secrets import API_SECRET_KEY
```

4. Warn other developers to make their own secret key.

---

# PYTHON

- `pip list` list of all modules installed globally.
- `pip3 uninstall -r requirements.txt` remove all global packages in case of conflict (check venv is inactive and dir to project's folder)

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
      2. `pip install autopep8` installs package
         1. flask-sqlalchemy:
            - `pip install psycopg2-binary`
            - `pip install flask-sqlalchemy`
            - `pip install flask-bcrypt`
         2. wtforms:
            - `pip install flask-wtf`
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

## flask-WTF

1.  (check venv active)
2.  `pip install flask-wtf`

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

# DATABASE

## create_database

1. Option 1, in terminal:
   1. cd to directory
   2. `createdb my_database`
   3. `psql`
   4. `\c my_database`
   5. `\dt` for db tables
2. Option 2, in Posgres:
   - activate Postgres server
   - cd to directory
   - `psql`
   - `CREATE DATABASE my_database;`
