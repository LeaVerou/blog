---
title: "Is the current tab active?"
date: "2021-05-24"
categories:
  - "rants"
defaultLanguage: "js"
---

Today I ran into an interesting problem. Interesting because it's one of those very straightforward, deceptively simple questions, that after a fair amount of digging, does not appear to have a definite answer (though I would love to be wrong!).

The problem was to determine **if the current tab is active**. Yes, as simple as that.

## Why? (i.e. my use case)

I was working on my slide deck framework, [Inspire.js](https://github.com/leaverou/inspire.js). There is a [presenter mode plugin](https://github.com/LeaVerou/inspire.js/tree/master/plugins/presenter), which spawns a new window with your slides ("projector view"), whereas your current window becomes a "presenter view", with open notes, preview of the next slide, optional progress indicator for time etc.

However, this plugin was _not very good_. The two windows are synced, but only if you use presenter view to navigate slides. If you use the projector view to advance slides, the syncing breaks. Why would you use the projector mode? Many reasons, e.g. to interact with a live demo, or even play a video. If you have a live demo heavy presentation, you may even want to mirror your screen and only ever interact with the projector mode, while having the presenter mode on a secondary screen, just to look at.

The way the plugin worked was that every time the slide changed in the presenter view, it propagated the change in the projector view. To make the syncing bidirectional, it would be good to know if the current window is the active tab, and if so, propagate all slide navigation to the other one, regardless of which one is the projector view and which one is the presenter view.

And this, my friends, is how I ended up in this rabbit hole.

_(Yes, there are other solutions to this particular problem. I could just always propagate regardless and have checks in place to avoid infinite loops. But that's beside the point.)_
<!-- more -->
## What about the Visibility API?

In most resources around the Web, people were rejoicing about how the [Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) makes this problem trivial. "Just use `document.hidden`!" people would gleefully recommend to others.

Yes, the Visibility API is great, when you want to determine whether the current tab is _visible_. That is **not** the same as whether it is _active_.

You may have two windows side by side, both visible, but only one of them is active. You may even have a window entirely obscuring another window, but you can still tab through to it and make it active. Active and visible are entirely orthogonal states, which are only loosely correlated.

In my use case, given that both the projector view and presenter view would be visible at all times, this is a no-go that doesn't even solve a subset of use cases.

## What about focus and blur events on window?

The other solution that was heavily recommended was using the `[focus](https://developer.mozilla.org/en-US/docs/Web/API/Window/focus_event)` and `[blur](https://developer.mozilla.org/en-US/docs/Web/API/Window/blur_event)` events on `window`. This does get us partway there. Indeed, when the current tab _becomes_ active, the `focus` event fires. When another tab becomes active, the `blur` event fires.

Notice the emphasis on "becomes". **Events notify us about a state change, but they are no help for determining the _current state_.** If we get a `focus` or `blur` event, we know whether our tab is active or not, but if we don't get any, we simply don't know. A tab can start off as active or not, and there is no way to tell.

_How can a tab possibly start off as inactive_? One easy way to reproduce this is to hit Return on the address bar and immediately switch to another window. The tab you just loaded just starts off as inactive and no `blur` event is ever fired.

## What about document.activeElement?

The `[document.activeElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement)` property will always return the currently focused element in a page. Can we use it to determine if a window currently has focus? Nope, cause that would be too easy.

Run `setTimeout(() => console.log(document.activeElement), 2000)` in the console and quickly switch windows. Return >2 seconds later and see what was logged. It's the `<body>` element!

Wait, maybe we can assume that if the currently focused element is a `<body>` element then the current window is inactive? Nope, you get the same result in an active tab, if you simply haven't focused anywhere.

## What about document.hasFocus()?

When I discovered `[document.hasFocus()](https://developer.mozilla.org/en-US/docs/Web/API/Document/hasFocus)` I thought that was the end of it. Surely, this is exactly what I need?!? [The spec](https://html.spec.whatwg.org/multipage/interaction.html#dom-document-hasfocus) made it sound so promising. I quickly switched to my [about:blank](about:blank) tab that I use for trying things out, and ran it in the console.

```
> document.hasFocus()
< false
```

🤦🏽‍♀️🤦🏽‍♀️🤦🏽‍♀️

Neeeext!

**Edit:** `document.hasFocus()` may be the solution after all! As [pointed](https://twitter.com/_AlK/status/1396800328088133633) [out](https://twitter.com/outofroutine/status/1396800341648318472) [to me](https://twitter.com/jaffathecake/status/1396802975151054849) on Twitter, the problem above was that unlike I did with `document.activeElement`, I ran this synchronously in the console and it returned `false` because the console as the active window. An asynchronous log while I make sure the actual window is focused would do the trick.

## The anti-climactic conclusion

**Edit:** I left this section in because the moral is still valid for other cases, but it looks like `document.hasFocus()` was the solution after all.

If you're expecting this to end with a revelation of an amazing API that I had originally missed and addresses this, you will be disappointed. If there is such a silver bullet, I did not find it. Maybe someone will point it out to me after publishing this blog post, in which case I will update it so that you don’t struggle like I did.

But in my case, I simply gave up trying to find a general solution. Instead, I took advantage of the knowledge my code had in this specific situation: I knew what the other window was, and I primarily cared which one of the two (if any) had focus.

```
// Track whether presenter or projector is the active window
addEventListener("focus", _ => {
	Inspire.isActive = true;

	// If this window is focused, no other can be
	if (Inspire.projector) {
		Inspire.projector.Inspire.isActive = false;
	}
	else if (Inspire.presenter) {
		Inspire.presenter.Inspire.isActive = false;
	}
});

addEventListener("blur", _ => {
	Inspire.isActive = false;

	// If this window is not focused,
	// we cannot make assumptions about which one is.
});
```

Given that the presenter view calls `window.focus()` after opening the projector view, in practice this was pretty bulletproof.

What's the moral of this story?

- Sometimes simple questions do not have a good answer when it comes to the Web Platform
- If your code cannot answer the general question correctly in all cases, maybe it can answer a specific one that solves your particular problem, even if that leads to a less elegant solution.

That’s it folks.
