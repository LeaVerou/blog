---
title: "Easily keep gh-pages in sync with master"
date: "2011-10-13"
tags:
  - "tips"
  - "github"
  - "git"
---

I always loved Github's ability to publish pages for a project and get the strain out of your server. However, every time I tried it, I struggled to keep the gh-pages branch up to date. Until I discovered the awesome `git rebase`.

Usually my github workflow is like this:

git add .
git status // to see what changes are going to be commited
git commit -m 'Some descriptive commit message'
git push origin master

Now, when I use gh-pages, there are only a few more commands that I have to use after the above:

git checkout gh-pages // go to the gh-pages branch
git rebase master // bring gh-pages up to date with master
git push origin gh-pages // commit the changes
git checkout master // return to the master branch

I know this is old news to some of you (I'm a github n00b, struggling with basic stuff, so my advice is probably for other n00bs), but if I had read this a few months ago, it would've saved me big hassles, so I'm writing it for the others out there that are like me a few months ago.

Now if only I find an easy way to automate this... :)
