GIT UPDATE COMMANDS
===================

Use these commands in the VS Code terminal to synchronize your portfolio
between GitHub and VS Code.


GITHUB → VS CODE
================

To download the latest changes from GitHub to your VS Code project:

git pull

This updates your local files with the latest version from GitHub.


VS CODE → GITHUB
================

Use these commands whenever you update the portfolio website in VS Code.

1. Add all changes:

git add .

2. Commit the changes:

git commit -m "Update portfolio"

3. Push the changes to GitHub:

git push


QUICK COMMANDS
==============

VS Code → GitHub:

git add .
git commit -m "Update portfolio"
git push


GitHub → VS Code:

git pull


WORKFLOW
========

GitHub → VS Code
git pull

VS Code → GitHub
git add .
git commit -m "Update portfolio"
git push