#!/bin/bash
GIT_REPO_URL=git@github.com:Nfsaavedra/Nfsaavedra.github.io.git

mkdir .deploy
cp -R $1/* .deploy
cp CNAME .deploy
cd .deploy
git init .
git remote add github $GIT_REPO_URL
git checkout -b gh-pages
git add .
git commit -am "deploy"
git push github gh-pages --force
cd ..
rm -rf .deploy