---
title: "twee+: Longer tweets, no strings attached"
date: "2011-08-14"
categories:
  - "original"
  - "personal"
  - "releases"
tags:
  - "twitter"
---

![](images/tweeplus-300x200.png "tweeplus screenshot")As some people that have been following me for a while know, the 140 character limit on twitter bugs me a lot sometimes, and I've tried to find [a way to overcome it](http://lea.verou.me/2009/11/exploring-browser-supported-unicode-characters-and-a-tweet-shortening-experiment/) previously as well. The most common ways these days seems to be either cutting down the long tweet into multiple pieces (yuck) or using a service to host the longer tweet and post a summary with a link to it.

The latter isn't an entirely horrible option. However, I see 3 big downsides:

1. I'm not very comfortable with the idea of some external service hosting my content which could close down any time due to failure to monetize their website. In that case, I'd be left with some dead links that are of no value and my content would be lost forever. Yes, they usually warn you in advance in such cases, but such news could be missed for a number of reasons.
2. People (including yours truly) don't plan those things in advance. They just seek services like that at the exact moment when they want to post a long tweet. Being greeted with a prompt to use Twitter Connect is NOT nice. For starters, it slows me down. Also, I don't want to give permission to every website on the effing interwebs to post on my twitter timeline. I owe it to my followers to be responsible and not risk filling their timelines with crap.
3. Most of these websites look like someone puked and what came out happened to be HTML and CSS. The only exception I've found is [twtmore](http://twtmore.com/), but it still suffers from #1 and #2.

So, like every developer with a healthy amount of NIH syndrome, I decided to write my own :D

My goals were:

1. It had to be entirely client-side (except initially getting downloaded from the server of course). This way, whoever is concerned can download the full website and decode their tweets with it if it ever goes down. Also, being entirely client side allows it to scale very easily, as serving files is not a very resource intensive job (compared to databases and the like).
2. No Twitter Connect, the tweets would get posted through [Twitter Web Intents](https://dev.twitter.com/docs/intents).
3. It had to look good. I'm not primarily a designer, so I can't make something that looks jaw-droppingly amazing, but I can at least make it look very decent.
4. If I was gonna go through all the hassle of making this, I may as well try to keep it under 10K, so that I could take part in the [10K apart contest](http://10k.aneventapart.com/). (I haven't submitted it yet, I'll submit a few days before the deadline, as it seems you can't make changes to your submission and I want to polish the code a bit, especially the JS — I'm not too proud about it)

I managed to succeed in all my goals and I really liked the result. I ended up using it for stuff I never imagined, like checking if a twitter username corresponds to the account I think (as it shows the avatars). So I went ahead and came up with a name, bought a domain for it, and [tweeplus.com](http://tweeplus.com) was born :)

## twee+? Seriously?

Yes, I like it. The plus means "more", which is fitting and + kinda looks like a t, so it could be read as "tweet" as well. Yes, I know that the word "twee" has some negative connotations, but oh well, I still like the name. Whoever doesn't can just not use it, I won't get depressed, I promise. :P

## Geeky stuff

### How it works

- A relatively new feature, Twitter automatically wraps URLs in [t.co](http://t.co) links, making them only 20 characters long.
- All the text of the tweet is stored in the URL hash (query string will also work, although the output uses a hash). Some research revealed that actually [browsers can handle surprisingly long URLs](http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url). Essentially, the only limit (2083 characters) is enforced by Internet Explorer. I decided to limit tweets to 2000 characters (encoded length), not only because of the IE limit, but also because I wouldn't like people to post whole books in t.co links. We don't want Twitter to start taking measures against this, do we? :)
- A hard part was deciding which encoding to use (twitter is quite limited in the characters it parses as part of a URL).
    - My first thought was base64, but I quickly realized this was not a very good idea:
        - The encoding & decoding functions (`btoa()` and `atob()` respectively) are relatively new and therefore not supported by older browsers. I'm fine with the app hardly working in old browsers, but existing links must as a minimum be readable.
        - It uses approximately 1.34 characters per ASCII character. Unicode characters need to be URL-encoded first, otherwise an Exception is thrown. URL-encoding them uses 6 characters, which would result in 8 characters when they're base64 encoded.
    - Then I thought of using URL-encoding for the whole thing. The good thing with it is that for latin alphanumeric characters (which are the most) it doesn't increase the string length at all. For non-alphanumeric characters it takes up 3 characters and 6 characters for Unicode ones. Also, it's much more readable.
    - Still, implementing it was tricky. It doesn't encode some characters (like the dot), even though twitter doesn't accept them as part of a URL. Also, escape() and encodeURI() behave differently and [the Unicode encoding returned by the former isn't accepted by Twitter](http://twitter.com/#!/LeaVerou/status/101348203756130304). So I had to combine the two and do some substitutions manually.
- When the textarea changes, the hash does too. The whole thing is a form with action="http://twitter.com/intent/tweet", so submitting it does the right thing naturally. I keep a hidden input with the tweet and the textarea has no name, so it doesn't get submitted.
- Usernames, hashtags and URLs get extracted and linkified. Usernames also get an avatar (it's dead easy: Just use twitter.com/api/users/profile\_image?screen\_name={username} where {username} is the user's username)
- Internal "pages" (like "About" or "Browser support") are essentially long "tweets" too.
- A little easter egg is that if the browser supports radial gradients, the gradient follows the mouse, creating a spotlight effect. This looks nice on Chrome and Firefox, and really shitty on IE10, probably due to bugs in the gradient implementation (which I have to reduce & report sometime).

### Buzzword compliance

This little app demonstrates quite a lot new open web technologies (HTML5, CSS3 etc), such as:

- textarea maxlength
- placeholder
- autofocus (edit: I had to remove it cause it triggered a Webkit bug in Safari)
- required inputs
- New input types (url)
- History API
- oninput event (with [keyup fallback](http://mathiasbynens.be/notes/oninput))
- hashchange event
- SVG
- Common CSS3 (border-radius, shadows, transitions, rgba, media queries)
- CSS3 gradients
- CSS3 animations
- CSS3 resize
- :empty

Let me know if I forgot something.

Oh yeah, I did forget something. There it is: [twee+](http://tweeplus.com/)
