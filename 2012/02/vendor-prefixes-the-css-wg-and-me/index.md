---
title: "Vendor prefixes, the CSS WG and me"
date: "2012-02-09"
categories:
  - "personal"
tags:
  - "css"
  - "web-standards"
---

The CSS Working Group is recently discussing the very serious problem that vendor prefixes have become. We have reached a point where **browsers are seriously considering to implement -webkit- prefixes**, just because authors won't bother using anything else. **This is just sad.** :( [Daniel Glazman](http://www.glazman.org/weblog/dotclear/index.php?post/2012/02/09/CALL-FOR-ACTION:-THE-OPEN-WEB-NEEDS-YOU-NOW), [Christian Heilmann](http://christianheilmann.com/2012/02/09/now-vendor-prefixes-have-become-a-problem-want-to-help-fix-it/) and others wrote about it, making very good points and hoping that authors will wake up and start behaving. If you haven't already, visit those links and read what they are saying. I'm not very optimistic about it, but I'll do whatever I can to support their efforts.

And that brings us to the other thing that made me sad these days. 2 days ago, [the CSS WG published its Minutes](http://lists.w3.org/Archives/Public/www-style/2012Feb/0313.html) (sorta like a meeting) and I was surprised to hear that I've been mentioned. My surprise quickly turned into this painful feeling in your stomach when you're being unfairly accused:

tantek: Opposite is happening right now. Web standards activists are teaching
 people to use -webkit-
tantek: People like Lea Verou.
tantek: Their demos are filled with -webkit-. You will see presentations
 from all the web standards advocates advocating people to use
 -webkit- prefixes.

**Try to picture being blamed of the very thing you hate, and you might understand how that felt.** I've always been an advocate of inclusive CSS coding that doesn't shut down other browsers. It's good for future-proofing, it's good for competition and it's the right thing to do. Heck, [I even made a popular script to help people adding all prefixes](http://leaverou.github.com/prefixfree/)! I'm even one of the few people in the industry who has **never expressed a definite browser preference**. I love and hate every browser equally, as I can see assets and defects in all of them (ok, except Safari. Safari must die :P).

When Tantek realized he had falsely accused me of this, [he corrected himself](http://krijnhoetmer.nl/irc-logs/css/20120207#l-1066) in the #css IRC room on w3.org:

\[17:27\] <tantek> (ASIDE: regarding using -webkit- prefix, clarification re: Lea Verou - she's advocated using \*both\* vendor prefixed properties (multiple vendors) and the unprefixed version after them. See her talk http://www.slideshare.net/LeaVerou/css3-a-practical-introduction-ft2010-talk from Front-Trends 2010 for example. An actual example of -webkit- \*only\* prefix examples (thus implied advocacy) is Google's http://slides.html5rocks.com/ , e.g.
\[17:27\] <tantek> http://slides.html5rocks.com/#css-columns has three -webkit- property declarations starting with -webkit-column-count )

That's nice of him, and it does help. At least I had a link to give to people who kept asking me on twitter if I was really the prefix monster he made me out to be. :P The problem is that not many read the IRC logs, but many more read the www-style archives. Especially since, with all this buzz, many people were directed into reading this discussion by the above articles. I don't know how many people will be misled by Tantek's uninformed comment without reading his correction, but I know for sure that the number is non-zero. And the worst of all is that many of them are people in the CSSWG or in the W3C in general,  people who I have great respect and admiration for. And quite frankly, that sucks.

I don't think Tantek had bad intentions. I've met him multiple times and I know he's a nice guy. Maybe he was being lazy by making comments he didn't check, but that's about it. It could happen to many people. My main frustration is that it feels there is nothing I can do about it, besides answering people when they take the time to talk to me about it. I can do nothing with the ones that won't, and that's the majority. At least, if a forum was used over a mailing list, this could've been edited or something.
