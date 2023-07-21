---
title: "Exploring browser-supported Unicode characters and a tweet shortening experiment"
date: "2009-11-29"
tags:
  - "articles"
  - "original"
  - "js"
  - "ligatweet"
  - "twitter"
  - "unicode"
---

I recently wanted to post something on twitter that was just slightly over the 140 chars limit and I didn't want to shorten it by cutting off characters (some lyrics from Pink Floyd's "Hey You" that expressed a particular thought I had at the moment -- it would be barbaric to alter Roger Waters' lyrics in any way, wouldn't it? ;-)). I always knew there were some ligatures and digraphs in the Unicode table, so I thought that these might be used to shorten tweets, not only that particular one of course, but any tweet. So I wrote [a small script](http://lea.verou.me/scripts/unicode.html "Browser supported unicode characters") (warning: very rough around the edges) to explore the Unicode characters that browsers supported, find the replacement pairs and build the tweet shortening script (I even thought of a name for it: ligatweet, LOL I was never good at naming).

My observations were:

- Different browsers support different Unicode characters. I think Firefox has the best support (more characters) and Chrome the worst. By the way, it's a shame that Chrome doesn't support the Braille characters.
- The appearance of the same characters, using the same font has huge differences across browsers. A large number of glyphs are completely different. This is very apparent on dingbats (around 0x2600-0x2800).
- For some reason unknown to me, hinting suffers a great deal in the least popular characters (common examples are the unit ligatures, like ㏈ or ㎉). Lots of them looked terribly unlegible and pixelated in small sizes (and only in small sizes!!). Typophiles feel free to correct me if I'm mistaken, but judging by my brief experience with font design, I don't think bad hinting (or no hinting at all) can do that sort of thing to a glyph. These characters appeared without any anti-aliasing at all! Perhaps it has to do with Cleartype or Windows (?). If anyone has any information about the cause of this issue, I would be greatly interested.
- It's amazing what there's in the Unicode table! There are many dingbats and various symbols in it, and a lot of them work cross browser! No need to be constrained by the small subset that html entities can produce!

The tweet shortening script is here: [http://lea.verou.me/demos/ligatweet/](http://lea.verou.me/demos/ligatweet/ "Linkification: http://lea.verou.me/demos/ligatweet/")

I might as well write a bookmarklet in the future. However, I was a bit disappointed to find out that even though I got a bit carried away when picking the replacement pairs, the gains are only around 6-12% for most tweets (case sensitive, of course case insensitive results in higher savings, but the result makes you look like a douchebag), but I'm optimistic that as more pairs get added (feel free to suggest any, or improvements on the current ones) the savings will increase dramatically. And even if they don't I really enjoyed the trip.

Also, exploring the Unicode table gave me lots of ideas about scripts utilizing it, some of which I consider far more useful than ligatweet (although I'm not sure if I'll ever find the time to code them, even ligatweet was finished because I had no internet connection for a while tonight, so I couldn't work and I didn't feel like going to sleep)

By the way, In case you were wondering, I didn't post the tweet that inspired me to write the script. After coding for a while, It just didn't fit my mood any more. ;-)
