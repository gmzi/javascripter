## Command lines.

---

#### FILE AND FOLDER MANAGEMENT

`pwd` check current working directory.  
`cd nameofdir` head to directory.  
`mkdir nameofdir` make directory.  
`touch filename` create new empty file.  
`mv /Users/xxx/projects/nameOfDir /Users/xxx/projects/new-name-of-dir` rename directory.  
`ls` lists the content of a directory, ex. `ls /home/george `ls -a`lists hiden directories, ex.`ls -a /home/george  
`ls -l` long list (more detail)  
`ls -lS` list sorted by size  
 `ls -lh` sorted by size in human readable format  
`ls -lt` sorted by modification time  
`src` source

# GIT

## Track project (git and github):

### Git part:

1. `cd projectname` go to project's folder.
1. - Check or set git settings:
   - `git config user.name` existing local username (none if empty)
   - `git config user.name userName` create local username
   - `git config user.email` existing local email (none if empty)
   - `git config user.email user@email.com` create local email
   - `git config --global user.name` existing global usr
   - `git config --global user.name userName` create global usr
   - `git config --global user.email` existing global email.
   - `git config --global user.email email@address.com` add global email.

   - (Create github repo)

1. `git init` initializes de local directory as Git repository
1. - `git add .` (mind the dot) stages ALL files for commit.
   - `git add filename.extension` stage ONLY that file for commit.
1. `git commit -m "Description of commit"` Commits changes and prepares them to be pushed.

   - `git status` check status ("nothing to commit" is fine). All changes will be here, if any.
   - `git log` returns commit hash of each file with changes to commit.

1. #### GO BACK IN VERSION HISORY:
   1. - `git log` see all the hashes with their descriptions, and pick the one you want to come back to. (Type `q` to exit log list).
   2. - `git checkout hashNumber` this will go back the project to the desired hash version.
1. #### BRANCHES (for experiments, new ideas, trying things before putting them in master branch)
   1. - `git branch` list of existing branches.
   2. - `git branch nameOfBranch` creates new branch.
      - `git branch` check what branch are you in
   3. - `git checkout branchName` go to master branch or any branchName.
   4. - `git add .` & `git commit -m "xx"` changes to branch.
      - (`git push -u origin branchName` pushes branch to github)
   5. - go to master branch, then: `git merge branchName` merges branchName into Master branch.
1. #### Remove git
   - `rm -rf .git` remove all git.
   - `rm -rf .git*` remove all git and metadata.

## Github part

7. Create `.gitignore` file, if needed.

   - `.file_name` in gitignore
   - `folder_name/`in gitignore

8. Create Github repo and copy it's address.
9. `git remote add origin PasteURL` sets new remote
10. `git remote -v` Verifies the new remote URL
11. `git push -u origin master` pushes changes from local repo to remote repo specified in origin.

# Open source contribution on github.

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

## Javascript

### Console

`clean()` chrome cleans console.

---

## Python file and folder management:

`pipenv --three` venv for Pyth3  
_MIND SELECTING THE CORRECT PYTHON INTERPRETER AFTER CREATING FILE_  
`printenv` to list all the environment variables currently set.  
Pipenv  
`pipenv shell` activates virtual env  
`pipenv install packagename`  
`pipenv lock -r` creates requirements.txt for a project  
`pipenv --rm` delete an environment

#### Python3 execution:

`python3 filename.py` runs file in p3

#### DJANGO

`python3 manage.py makemigrations` to create migration of db changes  
`python3 manage.py migrate` to apply changes to db.

#### SQL

`makemigrations` lists the migrations to be done
`sqlmigrate` prints migrations items without running the migration
`check` checks files before migration
`migrate` runs migration

#### ANACONDA AND JUPYTER

`/Users/xxx/opt/anaconda3/bin/jupyter_mac.command` opens jupyter notebook

---

## VS Code cool shortcuts

`! + tab`: html template  
`.classname + tab` new div with class name given.  
`⌘ + d` select word, press it again and select
next occurence of that word, and so on.  
`control + space` css context-specific options. (also `⌘ + i`)  
`option + arrows` move entire line up or down.
`⌘ + \` split windows.
`control + tab` switch opened windows.
`⌘ + 1, 2, etc` swith group of opened windows.

---

## Chrome cool shortcuts

`opt + ⌘ + i` inspector.  
`opt + ⌘ + j` JS console.  
`⌘ + k` clear console.
