---
title: "(byte)size matters"
date: "2009-07-31"
tags:
  - "personal"
  - "tips"
  - "bytesizematters"
---

Yesterday, I was editing a CSS file and I was wondering how many bytes/KB would a particular addition add to it, in order to decide if it was worth it. Since, I had found myself wondering about the exact same thing multiple times in the past, I decided to make a simple standalone HTML page that would compute the size of any entered text in bytes, KB, MB, etc (whatever was most appropriate). It should be simple and quick and it should account for line terminator differences across operating systems.

About half an hour later, I was done. And then it dawned on me: Someone else might need it too! Since .com domains are, so cheap, hey, let's get a domain for it as well! There are [several](http://kottke.org/08/02/single-serving-sites) [sites](http://dowebsitesneedtolookexactlythesameineverybrowser.com/) [with](http://amiawesome.com/) [a](http://r33b.net/) [domain](http://isitchristmas.com/) [that](http://justfuckinggoogleit.com/) [are](http://www.sometimesredsometimesblue.com/) [way](http://www.d-e-f-i-n-i-t-e-l-y.com/) [simpler](http://www.tired.com/) than that anyway. A friend that was sitting next to me suggested "sizematters.com" as a joke, but as it turned out, [bytesizematters.com](http://bytesizematters.com "(byte)size matters!") was free, so we registered it. And there it is, less than a day after, [it's aliiive](http://bytesizematters.com). :P

Any feedback or suggestions are greatly welcome!

For instance, should I implement a very simple minification algorithm and display bytesize for that as well, or is it too much and ruins the simplicity of it without being worth it? **\[edit: I did it anyway\]**

Should I implement a way to compare two pieces of text and find out the difference in byte size (could be useful for JavaScript refactoring)? **\[edit:** **I did it anyway****\]**
