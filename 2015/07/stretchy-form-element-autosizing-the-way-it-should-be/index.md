---
title: "Stretchy: Form element autosizing, the way it should be"
date: "2015-07-26"
tags:
  - "original"
  - "releases"
---

[![Screen Shot 2015-07-25 at 18.40.13](images/Screen-Shot-2015-07-25-at-18.40.13--300x204.png)](images/Screen-Shot-2015-07-25-at-18.40.13-.png)As you might be aware, [these days a good chunk of my time is spent working on research, at MIT](http://lea.verou.me/2014/02/im-going-to-mit/). Although it’s still too early to talk about my research project, I can say that it’s related to the Web and it will be open source, both of which are pretty awesome (getting paid to work on cool open source stuff is the dream, right?).

The one thing I _can_ mention about my project is that it involves a lot of editing of Web content. And since contentEditable is a mess, as you all know, I decided to use form controls styled like the content being edited. This meant that I needed a good script for form control autosizing, one that worked on multiple types of form controls (inputs, textareas, even select menus). In addition, I needed the script to smoothly work for newly added controls, without me having to couple the rest of my code with it and call API methods or fire custom events every time new controls were added anywhere. A quick look at the existing options quickly made it obvious that I had to write my own.

After writing it, I realized this could be released entirely separately as it was a standalone utility. So [Stretchy](https://projects.verou.me/stretchy/) was born :) I made a quick page for it, fixed a few cross-browser bugs that needed fixing anyway, put it up on Github and here it is!

[Enjoy!](https://projects.verou.me/stretchy)

PS: You can also use it as a bookmarklet, to autosize form controls on an existing page, if a form is bothering you with its poor usability. You will find it in the footer.
