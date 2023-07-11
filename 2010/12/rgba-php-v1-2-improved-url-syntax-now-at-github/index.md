---
title: "rgba.php v1.2: Improved URL syntax, now at Github"
date: "2010-12-08"
categories:
  - "news"
  - "original"
tags:
  - "colors"
  - "css3"
  - "css3-values"
  - "php"
  - "rgba"
---

[![](images/Screen-shot-2011-11-15-at-15.19.14--300x187.png "rgba.php project page screenshot")](images/Screen-shot-2011-11-15-at-15.19.14-.png)I wrote the first version of rgba.php as a complement to [an article on RGBA that I posted on Februrary 2009](http://lea.verou.me/2009/02/bulletproof-cross-browser-rgba-backgrounds/). Many people seemed to like the idea and started using it. With their valuable input, I made many changes and [released v.1.1](http://lea.verou.me/2009/10/new-version-of-rgba-php-is-out/) (1.1.1 shortly after I posted the article due to another little fix) on October 2009. More than a year after, quite a lot of people still ask me about it and use it, so I decided to make [a github repo for it](https://github.com/LeaVerou/rgba.php) and release a new version, with a much easier to use syntax for the URL, which lets you just copy and paste the color instead of rewriting it:

background: url('rgba.php/rgba(255, 255, 255, 0.3)');
background: rgba(255, 255, 255, 0.3);

instead of:

background: url('rgba.php?r=255&g=255&b=255&a=30');
background: rgba(255, 255, 255, 0.3);

I also made [a quick about/demo page for it](http://lea.verou.me/rgba.php/). Enjoy :)
