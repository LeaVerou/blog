---
title: "On CSS counters plus a CSS3 Reversi UI"
date: "2010-04-01"
tags:
  - "articles"
  - "original"
  - "css-counters"
  - "css"
  - "user-interfaces-in-css"
---

CSS Counters have a lot more potential than most web developers seem to think. The common use case consists of something like:

```css
somecontainer { counter-reset: foocount; }
Ε { counter-increment: foocount; }
Ε::before { content: counter(foocount) ". "; }
```

commonly used to add numbering to section headings or re-create an <ol>'s counters in order to style them (since browser support for ::marker is ridiculous).

Have you ever thought of applying the counter to **different** elements than the ones being counted? This way we're able to count elements and display their total count somewhere with CSS alone! (and with the variety of selectors in CSS3, I see great potential here...). I'm referring to something like:

```css
ul { counter-reset:foo; }
li { counter-increment:foo; }
p::after { content:counter(foo); }
```

From my tests, this works flawlessly in Firefox, Safari, Opera and Chrome (I've only checked the latest stable though), **as long as the element that displays the count comes after the elements being counted (in the markup)**.

Another underutilized aspect of CSS counters (well, far less underused than the above, but still) is how we can combine multiple in the same pseudoelement. For instance, to count rows and cells of a table and display the count inside each cell:

```css
table {
	counter-reset:row;
}

tr {
	counter-increment:row;
	counter-reset:cell;
}

td {
	counter-increment:cell;
}

td::after {
	content:counter(row, upper-alpha) counter(cell);
}
```

Which displays counters like A1, A2, A3, B1, B2, B3, etc in the cells. When the content property is more properly implemented, you wouldn't even need the last rule.

Last but not least, a [CSS3 Reversi UI](http://lea.verou.me/demos/Reversi/) (no images used!) I created a while ago that demonstrates the above (and various other things, like --finally-- a use case for **:empty** :P ). _Looks_ fine only in Firefox and Opera 10.5, due to lack of support for inset box shadows in Safari and [buggy](https://bugs.webkit.org/show_bug.cgi?id=36939) support in Chrome. _Works_ fine in all 4 of them (IE is out of the question anyway).

[![Screenshot of the UI](http://lea.verou.me/demos/Reversi/screenshot.png "Screenshot from Firefox 3.6")](http://lea.verou.me/demos/Reversi/)

The displayed counts of each player's pieces (top right corner) are just CSS counters. Same goes for every cell's name. This is mostly a proof of concept, since it's impossible to determine if someone won by CSS alone, so we would have to count the pieces in JS too.

As a game it's not finalized, you are basically only able to play against yourself and it doesn't know when somebody won, so it's not very useful or enjoyable. If someone wants to take it up and develop it further be my guest.

**Note to avoid confusion:** CSS Counters are **not** CSS 3. They are perfectly valid **CSS 2.1**. The "CSS3" in the title ("CSS3 Reversi") is due to other techniques used in it's UI.
