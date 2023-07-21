---
title: "Why I bought a high-end MacBook Air instead of the Retina MBP"
date: "2012-06-17"
tags:
  - "personal"
  - "apple"
---

[![](images/my-mba-300x224.jpg "My new MacBook Air")](images/my-mba.jpg)After the WWDC keynote, I was convinced I would buy a new MacBook Air. I was looking forward to any announcements about new hardware during the event, as my 13" 2010 MacBook Pro (Henceforth abbreviated as MBP) was becoming increasingly slow and dated. Also, I wanted to gift my MBP to my mother, who is currently using a horrible tiny Windows XP Netbook and every time I see her struggling to work on it, my insides hurt. All tweets about my shopping plans, or, later, about my new toy (I bought it yesterday) were met with surprise and bewilderment: I was repeatedly bombarded with questions asking why I’m not getting a Retina MacBook Pro, over and over again. The fact that I paid about $2200 + tax for it (it's the best 13" Air you can currently get) made it even more weird: **If you could afford that, why wouldn't you possibly get the Retina MBP at the exact same price?**

At first, I tried to reply with individual tweets to everyone that asked. Then I got tired of that and started replying with links to the first tweets, then I decided to write a blog post. So, here are my reasons:

### Portability

I travel a lot. For me, it’s very important to be able to use my laptop in a cramped airplane seat, or while standing in a line. You can’t really do that with a 15" MacBook Pro, even with the new slimmer design. I wanted to be able to quickly pull it out of my tote bag with one hand, hold it with said hand and quickly look up something with the other hand. Usage scenarios of that sort are just unthinkable for big laptops. Of course, portability is not the only thing that matters, as I only use one laptop as my main work machine. Having two machines, one for portability and one for "real work", always seemed to me like more hassle than it’s worth. So, a 11" MacBook Air was also out of the question. Which brings us to the middle ground of a 13" laptop. All my laptops had always been around 13". It’s a perfect trade-off between power and portability and I don’t wish to change that any time soon. It was quite simple: The 13" Air is more portable than my MBP. The 15" Retina MBP was less portable. I needed more portability than I had, not less.

### I saw the Retina MBP and wasn’t too impressed

When I first went to the Apple Store to buy the MacBook Air, I saw the new Retina display. I even managed to use it a bit, despite the swarm of fellow geeks nerdgasming uncontrollably around it. I won’t lie: I was tempted at first. The display is very crisp indeed, although the difference between icons that were not updated for the Retina is quite obvious, especially next to their accompanying text (which is always crisp, since text is vector-based). I started being unsure about my decision, as [Nicole Sullivan](http://www.stubbornella.org/content/) can attest (she was with me). And then it dawned on me: Hey, I should see the MacBook I was planning to buy in person too. Maybe its screen is also quite crisp. Maybe the difference won't even be that noticeable. I was right: My simple, untrained eyes could not really tell the difference. MacBook Airs have a decently crisp screen. Of course, if you put them next to each other, I’d imagine the difference would be fairly obvious. But who does that?

However, my impression still wasn't sufficient to make a decision. I’ve learned not to trust my unreliable human senses too much. I needed numbers. Calculating the actual DPI of a monitor is actually fairly simple: All you need is the [Pythagorean theorem](http://en.wikipedia.org/wiki/Pythagorean_theorem) you learned in school, to calculate the hypotenuse of the screen in pixels, and then divide that number by the length of the diagonal in inches. The result will be the number of pixels per inch, commonly (and slightly incorrectly) referred to as DPI (PPI is more correct). If you know basic JavaScript, you don't even need a calculator, just your ol’ trusty console.

I even wrote a handy function that does it for me:

function dpi(w,h,inches) { return Math.round(Math.sqrt(w\*w + h\*h)/inches) }

For the 13" MacBook Air, the DPI is:

\> dpi(1440, 900, 13.3)
128

For the Retina MBP, it’s:

 > dpi(2880, 1800, 15.4)
 221

220 DPI is certainly higher than 130, but it’s not the kind of eyegasm-inducing difference I experienced when I moved from an iPhone 3G to an iPhone 4 (the difference there was 163 DPI vs 326 DPI).

### I don’t want to distance myself too much from the average web user

It happens more than we like to admit: We get cool new hardware, and eventually we’re carried away and think most web users are close to our level. We start designing for bigger and bigger resolutions, because it's hard to imagine that some people are still on 1024x768. We code to better CPUs, because it's hard to imagine how crappy computers many of our target users have. We don't care about bandwidth and battery, because they aren't a concern for most of us. Some of us will realize before launching, during a very painful testing session, some others will only realize after the complaints start pouring in. It's the same reason a website always looks and works better in the browser its developers use, even though almost always it gets tested in many others.

We like to think we're better than that, that we always test, that we never get carried away, but in most cases we are lying to ourselves. So, even though I recognize that I probably have much better hardware than most web users, I consciously try to avoid huge resolutions as I know I’ll get carried away. I try to keep myself as close to the average user as I can tolerate. Using IE9 on a 1024x768 resolution would be over that threshold, but not using a Retina display is easily tolerable.

### That’s all folks

Hope this makes sense. Hopefully, it might help others trying to decide between the two. I sure am very happy so far with my new Air :)
