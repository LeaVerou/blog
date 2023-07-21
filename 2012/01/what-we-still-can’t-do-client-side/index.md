---
title: "What we still can’t do client-side"
date: "2012-01-09"
tags:
  - "rants"
  - "apis"
  - "web-standards"
---

With the rise of all these APIs and the browser race to implement them, you'd think that currently we can do pretty much everything in JavaScript and even if we currently can't due to browser support issues, we will once the specs are implemented. Unfortunately, that's not true. There are still things we can't do, and there's no specification to address them at the time of this writing and no way to do them with the APIs we already have (or if there is a way, it's unreasonably complicated).

### We can't do templating across pages

**Before rushing to tell me "no, we can", keep reading.** I mean have different files and re-use them accross different pages. For example, a header and a footer. If our project is entirely client-side, we have to repeat them manually on every page. Of course, we can always use (i)frames, but that solution is worse than the problem it solves. There should be a simple way to inject HTML from another file, like server-side includes, but client-side. without using JavaScript at all, this is a task that belongs to HTML (with JS we can always use XHR to do it but...). The browser would then be able to cache these static parts, with significant speed improvements on subsequent page loads.

**Update:** The [Web Components](http://webcomponents.org/) family of specs sort of helps with this, but still requires a lot of DIY and [Mozilla is against HTML imports and will not implement them](https://hacks.mozilla.org/2014/12/mozilla-and-web-components/), which is one main component of this.

### We can't do localization

At least not in a sane, standard way. Client-side localization is a big PITA. There should be an API for this. That would have the added advantage that browsers could pick it up and offer a UI for it. I can't count the number of times I've thought a website didn't have an English version just because their UI was so bad I couldn't find the switcher. Google Chrome often detects a website language and offers to translate it, if such an API existed we could offer properly translated versions of the website in a manner detectable by the browser.

**Update:** We have the [ECMAScript Globalization API](http://wiki.ecmascript.org/doku.php?id=globalization:specification_drafts), although it looks far from ideal at the moment.

### We can't do screen capture

And not just of the screen, but we can't even capture an element on the page and draw it on a canvas unless we use huge libraries that basically try to emulate a browser or SVG foreignObject which has its own share of issues. We should have a Screen Capture API, or at the very least, a way to draw DOM nodes on canvas. Yes, there are privacy concerns that need to be taken care of, but this is so tremendously useful that it's worth the time needed to go intro researching those.

### We can't get POST parameters and HTTP headers

There's absolutely NO way to get the POST parameters or the HTTP response headers that the current page was sent with. You can get the GET parameters through the location object, but no way to get POST parameters. This makes it very hard to make client-side applications that accept input from 3rd party websites when that input is too long to be on the URL (as is the case of [dabblet](http://dabblet.com) for example).

### We can't make peer to peer connections

There is absolutely no way to connect to another client running our web app (to play a game for example), without an intermediate server.

**Update:** There’s RTCPeerConnection in [WebRTC](http://w3c.github.io/webrtc-pc/), though the API is pretty horrible.

\_\_\_\_\_\_\_\_\_

Anything else we still can't do and we still don't have an API to do so in the future? Say it in the comments!

Or, if I'm mistaken about one of the above and there is actually an active spec to address it, please point me to it!

### Why would you want to do these things client-side?!

Everything that helps take load away from the server is good. The client is always one machine, everything on the server may end up running thousands of times per second if the web app succeeds, making the app slow and/or costly to run. I strongly believe in lean servers. Servers should only do things that architecturally need a server (e.g. centralized data storage), everything else is the client's job. Almost everything that we use native apps for, should (and eventually will) be doable by JavaScript.
