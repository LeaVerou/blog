---
title: "Why tabs are clearly superior"
date: "2012-01-17"
date_updated: 2023-11-07
tags:
  - "rants"
  - "coding-standards"
page_css: true
body_classes: "show-invisibles"
---

If you follow me [on twitter](https://twitter.com/leaverou) or have heard one of my talks you'll probably know I despise spaces for indentation with a passion. However, I've never gone into the details of my opinion on stage, and twitter isn't really the right medium for advocacy.
I always wanted to write a blog post about my take on this old debate, so here it is.

## Tabs for indentation, spaces for alignment

Let’s get this out of the way: **Tabs should *never* be used for alignment.**
**Using tabs for alignment is actively worse than using spaces for indentation** and is the base of all arguments against tabs.
But using tabs for alignment is misuse, and negates their main advantage: personalization.
It’s like trying to eat soup with a fork and complaining because it doesn’t scoop up liquid well.

Consider this code snippet:

```js
if (something) {
	let x = 10,
	    y = 0;
}
```

Each line inside the conditional is indented with a tab, but the variables are aligned with four spaces.
Change the tab size to see how everything adapts beautifully:

<label id="tab_size">
Tab size:
<input type=range min="1" max="8" value="4" oninput="this.nextSibling.textContent = document.body.style.tabSize = this.value;">
4
</label>

And yes, of course using tabs for alignment is a mess, because that’s not what they’re for:

```js
if (something) {
	let x = 10,
		y = 0;
}
```

Another example: remember CSS vendor prefixes?

```css
div {
	-webkit-transition: 1s;
	   -moz-transition: 1s;
	    -ms-transition: 1s;
	     -o-transition: 1s;
	        transition: 1s;
}
```

## 1. Tabs can be personalized

The width of a tab character can be adjusted per editor. This is not a disadvantage of tabs as commonly evangelized, but **a major advantage**.
**People can view your code in the way they feel comfortable with, not in the way \*you\* prefer.**
Tabs are one step towards decoupling the code's presentation from its logic, just like CSS decouples presentation from HTML.
They give more power to the reader rather than letting the author control everything.
Basically, using spaces is like saying "I don't care about how you feel more comfortable reading code, I will force you to use _my_ preferences because it's _my_ code".

Personalization is incredibly valuable when a team is collaborating, as different engineers can have different opinions.
Some engineers prefer their indents to be 2 spaces wide, some prefer them to be 4 spaces wide.
With spaces for alignment, a lead engineer imposes their preference on the entire team; with tabs everyone gets to choose what *they* feel comfortable with.

## 2. You don't depend on certain tools

When using spaces, you depend on your editor to abstract away the fact that an indent is actually N characters instead of one.
You depend on your editor to insert N spaces every time you press the Tab key and to delete N characters every time you press backspace or delete near an indent.
I have never seen an editor where this abstraction did not [leak](https://en.wikipedia.org/wiki/Leaky_abstraction) at all.
If you’re not careful, it’s easy to end up with indentation that is not an integer multiple of the indent width, which is a mess.
With tabs, the indent width is simply the number of tabs at the beginning of a line.
You don’t depend on tools to hide anything, and change the meaning of keyboard keys.
Even in the most basic of plain text editors, you can use the keyboard to navigate indents in integer increments.

## 3. Tabs encode strictly more information about the code

Used right, tabs are only used for a singular purpose: indentation.
This makes them easy to target programmatically, e.g. through regular expressions or find & replace.
Spaces on the other hand, have many meanings, so programmatically matching indents is a non-trivial problem.
Even if you only match space characters at the beginning of a line, there is no way of knowing when to stop, as spaces are also used for alignment.
Being able to tell the difference requires awareness about the semantics of the language itself.

## 4. Tabs facilitate portability

As [pointed out by Norbert Süle in the comments](http://lea.verou.me/2012/01/why-tabs-are-clearly-superior/#comment-415098853), when you copy and paste code that's indented with spaces, you have to manually adjust the indentation afterwards, unless the other person also _happens_ to prefer the same width indents as you.
With tabs, there is no such issue, as it's always tabs so it will fit in with your (tabbed) code seamlessly. The world would be a better place if everyone used tabs.

## 5. Tabs take up less space

One of the least important arguments here, but still worth mentioning.
Tabs take up only one byte, while spaces take up as many bytes as their width, usually 2-4x that.
On large codebases this can add up. E.g. in a codebase of 1M loc, averaging 1 indent per line (good luck computing these kinds of stats with spaces btw, see 3 above), with an indent width of 4 spaces, you would save 3MB of space by using tabs instead of spaces.
It’s not a tremendous cost if spaces actually offered a benefit, but it’s unclear what the benefit is.

## The downsides of using tabs for indentation

Literally all downsides of using tabs for indentation stem from how vocal their opponents are and how pervasive spaces are for indentation.
To the point that [using spaces for indentation is associated with *significantly* higher salaries](https://arstechnica.com/information-technology/2017/06/according-to-statistics-programming-with-spaces-instead-of-tabs-makes-you-rich/)!

### In browsers

It is unfortunate that most UAs have declared war to tabs by using a default tab size of 8, far too wide for any practical purpose.
For code you post online, you can use the [`tab-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size) property to set tab size to a more reasonable value, e.g. 4.
It’s [widely supported](https://caniuse.com/css3-tabsize).

For reading code on other websites, you can use an extension like [Stylus](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne) to set the tab size to whatever you want.
I have this rule applying on all websites:

```css
/* ==UserStyle==
@name           7/22/2022, 5:43:07 PM
@namespace      *
@version        1.0.0
@description    A new userstyle
@author         Me
==/UserStyle== */

* {
	tab-size: 4 !important;
}
```

### In tooling

Editors that handle smart tabs correctly are few and far between.
Even VS Code, the most popular editor right now, [doesn’t handle them correctly](https://github.com/microsoft/vscode/issues/33974),
though there are extensions ([Tab-Indent Space-Align](https://marketplace.visualstudio.com/items?itemName=j-zeppenfeld.tab-indent-space-align), [Smart Tabs](https://marketplace.visualstudio.com/items?itemName=Valsorym.smart-tabs#:~:text=Smart%20Tabs%20for%20Visual%20Studio,a%20multitude%20of%20open%20files.), and others)

## What does it matter, tabs, spaces, whatever, it's just a pointless detail

Sure, in the grand scheme of things, using spaces for indentation will not kill anyone.
But it’s a proxy for a greater argument:
that technology should make it possible to read code in the way *you* prefer,
without having to get team buy-in on your preferences.
There are other ways to do this (reformatting post-pull and pre-commit), but are too heavyweight and intrusive.
If we can’t even get people to see the value of not enforcing the same indentation width on everyone,
how can we expect them to see the value in further personalization?

## Further reading

- [Tabs. Spaces. Indentation. Alignment.](https://lb-stuff.com/tabs)
- [Indentation With Spaces Considered Harmful](http://mystilleef.blogspot.com/2006/11/indentation-with-spaces-considered.html)
- [Tabs vs spaces for code indentation](http://www.rizzoweb.com/java/tabs-vs-spaces.html)
- [Why I love having tabs in source code](http://derkarl.org/why_to_tabs.html)
- [Tabs vs spaces](http://blogs.msdn.com/b/cyrusn/archive/2004/09/14/229474.aspx)
- [Indent with tabs, align with spaces](https://dmitryfrank.com/articles/indent_with_tabs_align_with_spaces)
- Relevant: [Elastic tabstops](http://nickgravgaard.com/elastictabstops/)

*Thanks to [Oli](https://twitter.com/boblet) for proofreading the first version of this post.*