---
title: "Awesomplete: 2KB autocomplete with zero dependencies"
date: "2015-02-19"
categories:
  - "releases"
tags:
  - "autocomplete"
  - "awesomplete"
  - "javascript"
  - "typeahead"
---

[![awesomplete](images/awesomplete-300x248.png)](http://leaverou.github.io/awesomplete)Sorry for the lack of posts for the past 7 (!) months, I’ve been super busy working on [my book](http://shop.oreilly.com/product/0636920031123.do), which up to a certain point, I couldn’t even imagine finishing, but I’m finally there! I’ve basically tried to cram all the CSS wisdom I’ve accumulated over the years in it :P (which is partly why it took so long, I kept remembering more things that just \*had\* to be in it. Its page count on the O’Reilly website had to be updated 3 times, from 250 to 300 to 350 and it looks like the final is gonna be closer to 400 pages) and it’s gonna be super awesome ([preorder here!](http://shop.oreilly.com/product/0636920031123.do)) :D . I have been posting a few CSS tricks now and then on [my twitter account](http://twitter.com/leaverou), but haven’t found any time to write a proper blog post.

Anyhow, despite being super busy with MIT (which btw is amazing, challenging in a good way, and full of fantastic people. So glad to be here!) and the book, I recently needed an autocomplete widget for something. Surprisingly, I don’t think I ever had needed to choose one in the past. I’ve worked with apps that had it, but in those cases it was already there.

At first, I didn’t fret. Finally, a chance to use the [HTML5 <datalist>](http://blog.teamtreehouse.com/creating-autocomplete-dropdowns-datalist-element), so exciting! However, the more I played with it, the more my excitement was dying a slow death, taking my open web standards dreams and hopes along with it. Not only it’s incredibly inconsistent across browsers (e.g. Chrome matches only from the start, Firefox anywhere!), it’s also not hackable or customizable in any way. Not even if I got my hands dirty and used proprietary CSS, I still couldn’t do anything as simple as changing how the matching happens, styling the dropdown or highlighting the matching text!

So, with a heavy heart, I decided to use a script. However, when I looked into it, everything seemed super bloated for my needs and anything with half decent usability required jQuery, which results in even more bloat.

So, I did what every crazy person with a severe case of [NIH Syndrome](http://en.wikipedia.org/wiki/Not_invented_here) would: **I wrote one**. It was super fun, and I don’t regret it, although now I’m even more pressed for time to meet my real deadlines. I wrote it primarily for myself, so even if nobody else uses it, ho hum, it was more fun than alternative ways to take a break. However, it’s my duty to put it on Github, in case someone else wants it and in case the community wants to take it into its loving, caring hands and pull request the hell out of it.

To be honest, I think it’s both pretty and pretty useful and even though it won’t suit complex needs out of the box, it’s pretty hackable/extensible. I even wrote quite a bit of [documentation](http://leaverou.github.io/awesomplete/) at some point this week when I was too sleepy to work and not sufficiently sleepy to sleep — because apparently that’s what was missing from my life: even more technical writing.

I saved the best for last: It’s so lightweight you might end up chasing it around if there’s a lot of wind when you download it. It’s currently **a little under 1.5KB** minified & gzipped (the website says 2KB because it will probably grow with commits and I don’t want to have to remember to update it all the time), with **zero dependencies**! :D

And it’s even been verified to work in **IE9 (sorta), IE10+, Chrome, Firefox, Safari 5+, Mobile Safari**!

[’Nuff said. Get it now!](http://leaverou.github.io/awesomplete)

PS: If you’re about to leave a comment on how it’s not called “_autocomplete_”, but “_typeahead_”, please go [choke on a bucket of cocks](http://tirania.org/blog/archive/2011/Feb-17.html) instead. :P
