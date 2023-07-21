---
title: "Flexible multiline definition lists with 2 lines of CSS 2.1"
date: "2012-02-24"
tags:
  - "tips"
  - "css"
  - "generated-content"
---

If you've used definition lists (`<dl>`) you're aware of the problem. By default, `<dt>`s and `<dd>`s have `display:block`. In order to turn them into what we want in most cases (each _pair_ of term and definition on one line) we usually employ a number of different techniques:

- Using a different `<dl>` for each pair: Style dictating markup, which is bad
- Floats: Not flexible
- `display: run-in;` on the `<dt>`: Browser support is bad (No Firefox support)
- Adding a `<br>` after each `<dd>` and setting both term and definition as `display:inline`: Invalid markup. Need I say more?

If only adding `<br>`s was valid... Or, even better, **what if we could insert `<br>`s from CSS? Actually, we can!** As you might be aware, the CR and LF characters that comprise a line break are regular unicode characters that can be inserted anywhere just like every unicode character. They have the unicode codes 000D and 000A respectively. This means they can also be inserted as generated content, if escaped properly. Then we can use an appropriate white-space value to make the browser respect line breaks only in that part (the inserted line break). It looks like this:

dd:after {
	content: '\\A';
	white-space: pre;
}

Note that nothing above is CSS3. It's all good ol' CSS 2.1.

Of course, if you have multiple `<dd>`s for every `<dt>`, you will need to alter the code a bit. But in that case, this formatting probably won't be what you want anyway.

**Edit:** As [Christian Heilmann pointed out](https://twitter.com/codepo8/status/173148263124451328), HTML3 (!) [used to have a compact attribute](http://www.w3.org/MarkUp/html3/deflists.html) on `<dl>` elements, which basically did this. It is now obsolete in HTML5, like every other presentational HTML feature.

You can see a live result here:

<iframe style="width: 100%; height: 800px;" src="http://dabblet.com/gist/1901867" width="320" height="240"></iframe>

Tested to work in **IE8+, Chrome, Firefox 3+, Opera 10+, Safari 4+**.
