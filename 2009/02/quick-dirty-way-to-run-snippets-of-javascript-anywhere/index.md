---
title: "Quick & dirty way to run snippets of JavaScript anywhere"
date: "2009-02-23"
categories:
  - "tips"
tags:
  - "debugging"
  - "js"
---

Ever wanted to run a snippet of JavaScript on a browser that doesn't support a console in order to debug something? (for instance, IE6, Opera etc)

You probably know about [Firebug Lite](http://getfirebug.com/lite.html), but this either requires you to already have the bookmarklet, or include the script in the page. Although Firebug Lite is a great tool for more in depth debugging, it can be tedious for simple tasks (eg. _"What's the value of that property?"_).

Fortunately, there is a simpler way. Do you remember the 2000 era and the `javascript:` URIs? Did you know that they also work from the address bar of **any** javascript-capable browser?

For instance, to find out the value of the global variable `foo`, you just type in the address bar `javascript:alert(foo)`. You can write any code you wish after the `javascript:` part, as long as you write it properly to fit in one line.

Of course these URIs are a no-no for websites, but they can be handy for simple debugging in browsers that don't support a console. ;)
