## Command lines.

---

1. navigate

- `/` root directory. (Macintosh HD)
- `~` home directory (xxx)
- `~` === `/Users/xxx`
- `pwd` print working directory.
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
- `cd folderName` change directory.
- `cd + firstLetter + tab` autocomplete folderName
  - `cd ~` change directory to home.
- `cd ..` go one level backwards.
- `man + commandName` manual of given command (`q` to get out of it, enter to scroll)

2. Create

- `mkdir folder1 folder2 folder3` make directory/ies inside the current directory.
- `touch index.html app.js style.css` create new empty file/s. (if file already exists, `touch` command will modify it's modification date and time)
- `echo "hola caca" > caca.txt` create new file and write content in it.

3. view

- `cat fileName` shows file's content.
- `echo "something"` repeats what's inside quotes
- `echo "hello World" > app.js` overwrites the left hand text on the right hand file (beware it erases the previous content of the file)

4. remove

- `rm name.ext` removes file permanently (beware there's no undo to this).
- `rmdir folderName` removes empty folder (if there's file in it, won't delete it, not undo once deleted)
- `rm -rf folderName` removes folder and nested files (BEWARE NO UNDO)

5.  open

- `open file.ext` opens file with default app.
- `open folderName` opens folder in finder.
- `open .` opens current directory in finder.
- `open ..` opens prior directory in finder.

6. move/rename

- `mv file.txt ../` move file.txt to ../ (one level up).
- `mv file.txt path/to/folder` move file to folder inside current dir.
- `mv folderName path/to/folder` move folder
- `mv coca_cola_formula.txt folder1/formula.txt` move file and rename it.
- `mv fileName.txt newFileName.txt` rename file
- `mv ~/projects/nameOfDir ~/projects/new-name-of-dir` rename directory.

7. copy

- `cp fileName.txt fileCopy.txt` copy file
- `cp path/to/file.txt path/to/copiedFile.txt` copy file in different location.
- `cp dull.txt ../dull_copy.txt` copy and move file.
- `cp -r Folder_Name New_Folder_Name` copy folder.
- `cp caca.txt folder6/caca_copia.txt` copy and rename file.
- `cp -r folder6 folder1/foler6_copia` copy and rename folder.

--
`src` source

`clear` cleans console.
`q` get out of there exit quit

---

# SHORTCUTS

## terminal shortcuts

- `option + click` move along the line with mouse.
- `ctrl + a` go to beginning of line.
- `ctrl + e` go to end of line.
- `ctrl + w` delet word (put cursor in end of word to remove it)
- `ctrl + u` delete entire line (put cursor at end).
- `option + left/right arrows` jump words.

## VS Code cool shortcuts

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

---

## Chrome cool shortcuts

- `opt + ⌘ + i` inspector.
- `opt + ⌘ + j` JS console.
- `⌘ + k` clear console.

## mac cool shortcuts

- ``⌘ + ` ` swith safari windows
- `opt + F2` display preferences
- `opt + f10` sound preferences
- `⌘ + shift + .` show hidden files and folders.

---

## Javascript

### Console

- `clean()` chrome cleans console.

---

## Python file and folder management:

- `pipenv --three` venv for Pyth3  
  _MIND SELECTING THE CORRECT PYTHON INTERPRETER AFTER CREATING FILE_
- `printenv` to list all the environment variables currently set.  
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

## Terminal_Shell_Zsh/Bash

- TERMINAL is the mac app that provides CLI (Command Line Interface) to interact with the computer through command lines.
- SHELL is the program that processes the commands and returns outputs.
- Zsh and Bash. Are the standard shell for linux systems, that also manages foreground and background processes. There are other shell programs.

--

## Path

Path is the way to reach a folder, it's the address of the file or folder in the machine.

### Absolute_path

Absolute path (the entire location):
option 1:

1. /Users/xxx/projects/TopSecret/coca_cola_formula.txt  
   or
2. ~/projects/TopSecret/coca_cola_formula.txt

### Relative_path

Relative to your courrent location (the location from where you are).
Relative path (from home directory): cd projects/TopSecret/coca_cola_formula.txt

### flags

Are appended to command lines to specify an action: `ls -a` (ls is the command, -a is the flag).
Combine flags: `ls -al` (ls + a + ls + l). // or `ls -a -l`

### folder naming

`mkdir "folder name"` for a folder name with a space (don't do it).
