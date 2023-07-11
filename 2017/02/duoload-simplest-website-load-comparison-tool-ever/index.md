---
title: "Duoload: Simplest website load comparison tool, ever"
date: "2017-02-03"
categories:
  - "releases"
---

[![](images/Screen-Shot-2017-02-02-at-23.49.02-300x190.png)](images/Screen-Shot-2017-02-02-at-23.49.02.png)Today I needed a quick tool to compare the loading progression (not just loading time, but also incremental rendering) of two websites, one remote and one in my localhost. Just have them side by side and see how they load relative to each other. Maybe even record the result on video and study it afterwards. That's all. No special features, no analysis, no stats.

So I did what I always do when I need help finding a tool, I asked Twitter:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Is there any website that lets you load two websites side by side &amp; observe which loads faster/smoother? I recall something by <a href="https://twitter.com/jaffathecake">@jaffathecake</a></p>— Lea Verou (@LeaVerou) <a href="https://twitter.com/LeaVerou/status/827327249305178113">February 3, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Most suggested complicated tools, some non-free and most unlikely to work on local URLs. I thought damn, what I need is a very simple thing! I could code this in 5 minutes! So I did and [here it is](http://duoload.verou.me/), in case someone else finds it useful! The (minuscule amount of) code is of course on [Github](https://github.com/LeaVerou/duoload).

[Duoload](http://duoload.verou.me/)

Of course it goes without saying that this is probably a bit inaccurate. Do not use it for mission-critical performance comparisons.

Credits for the name [Duoload](http://duoload.verou.me/) to [Chris Lilley](http://svgees.us/) who came up with it in the 1 minute deadline I gave him :P
