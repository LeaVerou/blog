---
title: "Better usability in 5 minutes"
date: "2009-04-10"
categories:
  - "articles"
  - "original"
tags:
  - "css"
  - "css"
  - "selectors"
  - "css-transitions"
  - "usability"
  - "webkit"
  - "ux"
---

In this post I'm going to share some tips to increase a site's usability that are very quick to implement. Not all of them are cross-browser, but they are the icing on the cake anyway, nobody would mind without them.

### 1\. Make buttons and button-like links appear pressed

This is a personal favorite. When you use CSS to style a button, or when you use an image (either as a background image or in the <img /> tag) to depict a fancy button, it will remain the same when being pressed in some or all browsers (depending on the case). You can use this easy trick to let the user know that he actually clicked something that is, indeed, clickable:

.mybutton:active {
	position:relative;
	top: 1px;
	left: 1px;
}

which actually moves the button 1 pixel to the right and 1 pixel to the bottom when it's being clicked. Try it, it's actually quite convincing.

Other, equally quick options are: making the border inset, giving to the text a text-indent of 1px, reversing a gradient background (if you already use the reversed version somewhere else in the site, it is quick since you don't have to use an image editor just for that), or a combination of them.

### 2\. Smooth transitions

This is a webkit-only tip, but as I said, it's just the icing on the cake, so who cares? If a smooth transition is crucial to your design, by all means, write a script for that or use a library. If you were planning to go the CSS-only way anyway, this will significantly increase the user experience for webkit users.

Let's suppose that the links in your page are normally blue, and red on hover. To make the transition from blue to red smooth for webkit users, only 2 lines are needed in the CSS:

a {
	color:blue;
 **transition-property: color;
	transition-duration: 1s;**
}

a:hover {
	color:red;
}

The first one (`transition-property`) tells the browser which CSS property to smoothly transition and the second one (`transition-duration`) how long you want the whole effect to last. It's important to place those in the normal CSS rule and not the one with the :hover pseudoclass, because otherwise there will be no transition when the user mouses out of the element. Please note that you currently need to also include browser prefixes for these properties or just use [\-prefix-free](http://leaverou.github.com/prefixfree).

### 3\. Add dingbats to buttons that depict their functionality

We all know that most browsers don't like dingbat-only fonts. However, there are some dingbats that are available in most web-safe unicode fonts. For instance, review the following examples:

#### Without dingbats:

Next Previous Done Favorite

#### With dingbats:

Next → ← Previous ✔ Done ♥ Favorite

There are named html entities for some of them, others have to be used by their hex unicode index like &#xABCD;  (you have to test the last ones a lot, since not all are web-safe enough).

You can find many such dingbats with their unicode hex codes in [http://www.copypastecharacter.com/](http://www.copypastecharacter.com/ "Linkification: http://www.copypastecharacter.com/") and http://www.alanwood.net/unicode/dingbats.html.

Of course, if you have the time, by all means, use normal icons. If you don't however, I find symbols to be a handy alternative. Sometimes I also use them as icon placeholders in work in progress until I find the time to design real icons.

### 4\. Zebra rows

This won't work on IE and Firefox 3. You can increase readability of tables and some types of lists by slightly alternating the background color of the rows. You've probably seen this effect numerous times and it's usually done via JavaScript or the server side code that generates the table. You can quickly do it with plain CSS3 however, if you don't mind it not working in IE and older browser versions or don't have the time for a complete cross-browser solution:

table.stats tr {
	background:white;
}

table.stats tr:nth-child(odd) {
	background:#f4f4f4;
}

### 5\. Highlight the current target

This won't work in IE and older browser versions. If a particular page has lots of content, navigable by anchors (for example a FAQ page), you can use the CSS3 :target pseudo-class to let the user know where they landed:

h3:target {
	background:#FFFBCC;
}

The h3 will only get a #FFFBCC background when it's actually the landing point for the user. For example, if it has the id "foo", it will get an #FFFBCC background when the user navigates to #foo.

### That's all folks

Did it actually take more than 5 minutes? ;)
