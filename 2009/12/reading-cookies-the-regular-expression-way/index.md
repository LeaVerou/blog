---
title: "Reading cookies the regular expression way"
date: "2009-12-03"
categories:
  - "tips"
tags:
  - "cookies"
  - "js"
  - "regular-expressions"
---

While taking a look on [the 2nd 24ways article for 2009](http://24ways.org/2009/breaking-out-the-edges-of-the-browser), I was really surprised to read that _"The Web Storage API is basically cookies on steroids, a unhealthy dosage of steroids. Cookies are always a pain to work with. First of all you have the problem of setting, changing and deleting them. **Typically solved by Googling and blindly relying on PPK’s solution.**"_ (bold is mine)

Of course, there's nothing wrong with [PPK's solution](http://www.quirksmode.org/js/cookies.html#script). It works just fine. However, I always thought his readCookie() function was too verbose and complicated for no reason. It's a very common example of someone desperately trying to avoid using a regular expression. I googled for "[javascript read cookie](http://www.google.com/search?q=javascript+read+cookie)" and to my surprise, all examples found in the first results were very similar. I never understood why even experienced developers are so scared of regular expressions. Anyway, if anyone wants a shorter function to read a cookie, here's what I use:

function readCookie(name) {
    // Escape regexp special characters (thanks kangax!)
    name = name.replace(/(\[.\*+?^=!:${}()|\[\\\]\\/\\\\\])/g, '\\\\$1');

    var regex = new RegExp('(?:^|;)\\\\s?' + name + '=(.\*?)(?:;|$)','i'),
        match = document.cookie.match(regex);

    return match && unescape(match\[1\]); // thanks James!
}

**Update:** **Function updated, see comments below**.

I've been using it for years and it hasn't let me down. :)

Probably lots of other people have come up and posted something similar before me (I was actually very surprised that something like this isn't mainstream), but I'm posting it just in case. :)
