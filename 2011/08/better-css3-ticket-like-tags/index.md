---
title: "Better “CSS3 ticket-like tags”"
date: "2011-08-15"
tags:
  - "replies"
  - "css-gradients"
  - "css"
  - "generated-content"
---

Today I stumbled upon [this](http://webdesign.tutsplus.com/tutorials/htmlcss-tutorials/quick-tip-create-pure-css3-ticket-like-tags/) tutorial, which from the screenshot, looked very interesting. So, I read on, and to my horror I noticed the author suggesting some questionable practices, the worst of which was using 3 HTML elements for every tag, including nonsense markup like `<span class="circle"></span>`.

So, I thought I’d take a chance at trying to recreate this effect without any extra markup. And it turned out to be quite easy, although using CSS gradients limits browser support a bit (IE10, Firefox 3.6+, Chrome, Safari 5.1).

They have the same disadvantage as the originals: They depend on the background color. However, unlike the originals, they come at less code, they're scalable without changing a million values (as shown in the "bigger" section) and of course, no extra markup.

You can see the results in [the fiddle](http://jsfiddle.net/leaverou/T9bmw/) below:

<iframe style="width: 100%; height: 400px" src="//jsfiddle.net/leaverou/T9bmw/embedded/result%2Ccss%2Chtml"></iframe>

Disclaimer: [webdesign tuts+](http://webdesign.tutsplus.com/) occasionally has some nice tutorials. I didn't write this post to attack them in any way.
