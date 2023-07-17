---
title: "Change URL hash without page jump"
date: "2011-05-13"
categories:
  - "original"
  - "tips"
tags:
  - "history-api"
  - "html5"
  - "js"
---

In modern complex layouts, sometimes the point where a hash will transport you to will be entirely different than the one you actually wanted. If you prevent the default event, you will save yourself from the page jump, but the hash won't change either. You can accept the regular behavior and change scrollTop after the jump, but the user will still see a distracting flicker. [Chris Coyier](http://css-tricks.com/) found [a great workaround](http://css-tricks.com/hash-tag-links-padding/) last year but it's not meant for every case.

## A different solution

Turns out we can take advantage of the [History API](http://www.w3.org/TR/html5/history.html#the-history-interface) to do that quite easily. It's just one line of code:

history.pushState(null, null, '#myhash');

and we can combine it with the old method of setting location.hash to cater for older browsers as well:

if(history.pushState) {
    history.pushState(null, null, '#myhash');
}
else {
    location.hash = '#myhash';
}

## Browser support?

The History API is supported by:

- Firefox 4+
- Safari 5+
- Chrome 8+
- Coming soon in Opera

Enjoy :)
