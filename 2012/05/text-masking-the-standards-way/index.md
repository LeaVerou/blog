---
title: "Text masking — The standards way"
date: "2012-05-04"
categories:
  - "replies"
  - "tips"
tags:
  - "web-standards"
  - "svg"
---

As much as I like .net magazine, I was recently outraged by their "[Texturizing Web Type](http://www.netmagazine.com/tutorials/texturise-web-type-css)" article. It features a way to apply a texture to text with `-webkit-mask-image`, presenting it as an experimental CSS property and misleading readers. There are even -moz-, -o- and -ms- prefixes for something that is not present in any specification, and is therefore unlikely to ever be supported by any non-WebKit browser, which further contributes to the misdirection. A while back, [I wrote](http://www.alistapart.com/articles/every-time-you-call-a-proprietary-feature-css3-a-kitten-dies/) about how detrimental to our work and industry such proprietary features can be.

A common response to such complaints is that they are merely philosophical and who cares if the feature works right now and degrades gracefully. This argument could be valid for some cases, when the style is just a minor, gracefully degrading enhancement and no standards compliant alternative is present (for example, I've used `::-webkit-scrollbar` styles myself). However, this is not the case here. We have had [a standards compliant alternative for this for the past 11 years](http://www.w3.org/TR/2001/WD-SVG11-20011030/ "Warning: This is a very early version of the SVG 1.1 spec. For reference, use the latest one.") and it's called SVG. It can also do much more than masking, if you give it a chance. Here’s an example of texturized text with SVG:

<iframe style="width: 100%; height: 600px;" src="http://dabblet.com/gist/2594420" width="320" height="240"></iframe>

**Edit:** Thanks to [@devongovett's improvements](https://twitter.com/devongovett/status/198513261333848064), the code is now simpler & shorter.

Yes, the syntax might be more unwieldy but it works in a much wider range of browsers: **Chrome, Safari, Firefox, IE9, Opera**. Also, it's trivial to make a script that generates the SVG markup from headings and applies the correct measurements for each one. When WebKit fixes [this bug](https://bugs.webkit.org/show_bug.cgi?id=65344), we can even move the pattern to a separate SVG file and reference it from there.

In case you're wondering about semantics, the <svg> element is considered "flow content" and is therefore allowed in heading elements. Also, even if search engines don't understand inline SVG, they will just ignore the tags and still see the content inside the <text> element. Based on that, you could even make it degrade gracefully in IE8, as long as you include the HTML5 fix for the <svg> element. Then the CSS rules for the typography will still apply. You'll just need to conditionally hide the <image>, since IE8 displays a broken image there (a little known fact is that, in HTML, <image> is basically equivalent to <img>, so IE8 treats it as such) .

_Credits to [David Storey](https://twitter.com/dstorey)’s [original example](http://my.opera.com/dstorey/blog/using-svg-masks-for-cut-out-text-effects) that inspired this._
