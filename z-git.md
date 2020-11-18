# GIT VCS(Version Control System)

Git tracks all version history (will stay local unless is pushed to a remote repo)

## Git :

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

8. # BRANCHES (for experiments, new ideas, trying things before putting them in master branch)

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

9. # MERGE CONFLICTS

   Go back to VSCode and fix the conflicts. Then git add . and git commit -m "description".

10. # Remove git
    - `rm -rf .git` remove all git.
    - `rm -rf .git*` remove all git and metadata.

---

## Github

### Push

7. Create `.gitignore` file, if needed.

   - `.file_name` in gitignore
   - `folder_name/`in gitignore

8. Create Github repo and copy it's url.
9. `git remote add origin ProjectsUrl` sets new remote and assigns the nickname "origin" to it.
10. `git remote -v` Verifies the new remote
11. `git push -u origin master` pushes changes from local branch to remote repo. The flag -u sets "origin" as default repo and "master" as default branch to be pushed. So in future pushes, just type `git push` and it will be done (master branch to origin repo).
12. pull the readme file!!!!!
13. `git push origin branchName` pushes branchName only.
14. `git push` pushes default branch to default repo.

### Clone

Clone a github repo into local machine, it will be your own version of the repo.

1. Copy repo's url.
2. check in terminal where you are and where you want the clone, and git status not initialized there.
3. `git clone projectUrl` clones in local folder.
4. Create or remove files and folders, stage them and commit them with no problem. Just can't push the changes unless with permission from the owner.

### Pull

Pull changes down from remote repo and applies them to the local version of the project.

1. Go to project's folder:
2. `git remote -v` check sources.
3. `git pull origin master` pulls brnachName changes, if any, into local folder.

---

# Open source contributions workflow.

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

    5.1 (`git push -u origin branchName` pushes branch to github)
