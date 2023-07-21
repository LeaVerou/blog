---
title: "On URL readability"
date: "2011-08-30"
tags:
  - "thoughts"
  - "urls"
---

Yesterday, I was watching some season 6 episodes of Futurama (btw, this is their best season ever!) and I noticed the URLs in the website I was in (let's call it foo.com). They were like:

http://foo.com/futurama/season/6/episode/9

I thought to myself "hey, this looks very clean and readable". And then I noticed that it only has 1 less character than its non-rewritten counterpart:

http://foo.com/?futurama&season=6&episode=9

However, I'm pretty sure you agree that the second one is much harder to read. I [asked for opinions on twitter](http://twitter.com/#!/LeaVerou/status/108356094467915776), and got many interesting replies. Apart from the ones that completely missed the point, these were the core explanations:

- \= and especially & are more complex and look more like letters, so our brain has trouble tuning them out ([@feather](http://twitter.com/#!/feather/status/108358461888270337) [@robert\_tilt](http://twitter.com/#!/robert_tilt/status/108410782777229312) [@rexxars](http://twitter.com/#!/rexxars/status/108427976768622592) [@mrtazz](http://twitter.com/#!/mrtazz/status/108431965241360384) [@manchurian](http://twitter.com/#!/manchurian/status/108545434011705344))
- Slashes have more whitespace around them, so they are less obtrusive ([@feather](http://twitter.com/#!/feather/status/108357826916794368) [@stevelove](http://twitter.com/#!/stevelove/status/108393480488878080) [@kenny1987](http://twitter.com/#!/kenny1987/status/108415712292388864) [@janl](http://twitter.com/#!/janl/status/108432181549989888))
- They're all visual noise, but we always have slashes in a URL, so using the slash to separate keys and values as well only introduces 1 separator instead of 3 ([@bugster](http://twitter.com/#!/Bugster/status/108356318741528577) [@craigpatik](http://twitter.com/#!/craigpatik/status/108360564924874752) [@nyaray](http://twitter.com/#!/nyaray/status/108409202522861568))
- Slashes imply hierarchy, which our brains process easier than key-value pairs. Key-value pairs could be in any order, paths have a specified order. ([@sggottlieb](http://twitter.com/#!/sggottlieb/status/108356697109700609) [@edwelker](http://twitter.com/#!/edwelker/status/108357422292283393) [@stevenhay](http://twitter.com/#!/stephenhay/status/108410752469180417) [@jwasjsberg](http://twitter.com/#!/jwajsberg/status/108420275258916864) [@stazybohorn](http://twitter.com/#!/stazybohorn/status/108518754878623744))
- Ampersands and equal signs are harder to type than slashes. They're both in the top row and ampersands even need the Shift key as well. ([@feather](http://twitter.com/#!/feather/status/108358640787927040))
- Ampersands and equal signs have semantic meaning in our minds, whereas slashes not as much ([@snadon](http://twitter.com/#!/snadon/status/108394403164467200))

Regarding hierarchy and RESTful design, the first example isn't exactly correct. If it was hierarchical, it should be foo.com/futurama/season**s**/6/episode**s**/9. As it currently stands, it's key-value pairs, masquerading as hierarchical. However, it still reads better.

So I'm leaning towards the first three explanations, although I think all of them have a grain of truth. Which makes me wonder: Did we choose the wrong characters for our protocol? Could we have saved ourselves the hassle and performance overhead of URL rewriting if we were a bit more careful in choosing the separators back then?

Also, some food for thought: Where do you think the following URLs stand in the legibility scale?

http://foo.com/futurama/season=6/episode=9

http://foo.com/futurama/season:6/episode:9

http : //foo.com/futurama-season-6-episode-9  (suggested by Ben Alman)

Do you think there are there any explanations that I missed?
