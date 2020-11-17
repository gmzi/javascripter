# GIT VCS(Version Control System)

## Git part:

1. `cd projectname` go to project's folder.
2. `git init` initialize repo.
3. git settings:

   - `git config user.name` existing local username (none if empty)
   - `git config user.name userName` create local username
   - `git config user.email` existing local email (none if empty)
   - `git config user.email user@email.com` create local email
   - `git config --global user.name` existing global usr
   - `git config --global user.name userName` create global usr
   - `git config --global user.email` existing global email.
   - `git config --global user.email email@address.com` add global email.

4. - Create github repo.

5. `git add .` (mind the space and dot) stages ALL files for commit.

   - `git add filename.extension` stage ONLY that file for commit.

6. `git commit -m "Description of commit"` Commits changes and prepares them to be pushed.

   - `git status` check status ("nothing to commit" is fine). All changes will be here, if any.
   - `git log` returns commit hash of each file with changes to commit.

7. # GO BACK IN VERSION HISORY:
   1. `git log` see all the hashes with their descriptions, and pick the one you want to come back to. (Type `q` to exit log list).
   2. `git checkout hashNumber` this will go back the project to the desired hash version.
8. # BRANCHES (for experiments, new ideas, trying things before putting them in master branch)
   1. `git branch` list of existing branches.
   2. `git branch nameOfBranch` creates new branch.
   3. `git branch` check what branch are you in
   4. `git checkout branchName` go to master branch or any branchName.
   5. `git add .` & `git commit -m "xx"` changes to branch.
      5.1 (`git push -u origin branchName` pushes branch to github)
   6. go to master branch, then: `git merge branchName` merges branchName into Master branch.
9. # Remove git
   - `rm -rf .git` remove all git.
   - `rm -rf .git*` remove all git and metadata.

### Github part

7. Create `.gitignore` file, if needed.

   - `.file_name` in gitignore
   - `folder_name/`in gitignore

8. Create Github repo and copy it's address.
9. `git remote add origin PasteURL` sets new remote
10. `git remote -v` Verifies the new remote URL
11. `git push -u origin master` pushes changes from local repo to remote repo specified in origin.

--

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
