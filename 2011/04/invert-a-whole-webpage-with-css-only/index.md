---
title: "Invert a whole webpage with CSS only"
date: "2011-04-14"
categories:
  - "original"
  - "tips"
tags:
  - "css"
---

[![](images/Screen-shot-2011-04-14-at-22.24.18--300x199.png "Screenshot from the effect applied on my blog")](images/Screen-shot-2011-04-14-at-22.24.18-.png)I recently saw [Paul Irish's jQuery invert page plugin](https://gist.github.com/373253). It inverts every color on a webpage including images or CSS. This reminded me of the invert color keyword that's allowed on outlines (and sadly only supported by Opera and IE9+). So I wondered how it could be exploited to achieve the same effect through CSS alone. Turned out to be quite simple actually:

body:before {
	content:"";
	position:fixed;
	top:50%; left: 50%;
	z-index:9999;
	width:1px; height: 1px;
	outline:2999px solid invert;
}

Not even `pointer-events:none;` is needed, since outlines don't receive pointer events anyway, and there's no issue with scrollbars since they don't contribute to scrolling. So this is not even CSS3, it's just plain ol' CSS 2.1.
{% raw %}
And here's a bookmarklet to inject it into any given page: [Invert page](javascript:(function(){var%20style=document.createElement('style');style.innerHTML='body:before%20{%20content:%22%22;%20position:fixed;%20top:50%25;%20left:50%25;%20z-index:9999;%20width:1px;%20height:%201px;%20outline:2999px%20solid%20invert;%20}';document.body.appendChild(style)})();)
{% endraw %}
**Note:**This will only work on Opera and IE9+ since they're currently the only ones supporting the color keyword 'invert' on outlines. However, it's probably possible to add Firefox support too with SVG filters, since they support them on HTML elements as well.

As for why would someone want to invert a page... I guess it could be useful for people that can read white text on dark backgrounds more easily, April fools jokes, konami code fun and stuff like that.

**Update:** Mozilla is planning to **never** support `invert` because there's a [loophole in the CSS 2.1 spec](http://www.w3.org/TR/CSS21/ui.html#propdef-outline-color) that allows them to do that. However, you can push them to support it by [voting](https://bugzilla.mozilla.org/votes.cgi?action=show_user&bug_id=359497#vote_359497) on the [relevant issue](https://bugzilla.mozilla.org/show_bug.cgi?id=359497).
