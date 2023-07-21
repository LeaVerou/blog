---
title: "Yet another email hiding technique?"
date: "2009-11-29"
tags:
  - "original"
  - "tips"
  - "spam"
  - "unicode"
---

While [exploring browser-supported Unicode characters](http://lea.verou.me/2009/11/exploring-browser-supported-unicode-characters-and-a-tweet-shortening-experiment/), I noticed that apart from the usual @ and . (dot), there was another character that resembled an @ sign (0xFF20 or ＠) and various characters that resembled a period (I think 0x2024 or ․ is closer, but feel free to argue).

I'm wondering, if one could use this as another way of email hiding. It's almost as easy as the foo \[at\] bar \[dot\] com technique, with the advantage of being far less common (I've never seen it before, so there's a high chance that spambot developers haven't either) and I think that the end result is more easily understood by newbies. To encode [foo@bar.com](mailto:foo@bar.com "Linkification: mailto:foo@bar.com") this way, we'd use (in an html page):

foo&#xFF20;bar&#x2024;com

and the result is: foo＠bar․com

I used that technique on the [ligatweet page](http://lea.verou.me/demos/ligatweet/#conversions). Of course, if many people start using it, I guess spambot developers will notice, so it won't be a good idea any more. However, for some reason I don't think it will ever become that mainstream :P

By the way, if you're interested in other ways of email hiding, [here's an extensive article on the subject](http://www.csarven.ca/hiding-email-addresses) that I came across after a quick googlesearch (to see if somebody else came up with this first -- I didn't find anything).
