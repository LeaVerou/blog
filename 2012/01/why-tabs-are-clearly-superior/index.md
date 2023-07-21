---
title: "Why tabs are clearly superior"
date: "2012-01-17"
tags:
  - "rants"
  - "coding-standards"
---

If you follow me [on twitter](https://twitter.com/leaverou) or have heard one of my talks you'll probably know I despise spaces for indentation with a passion. However, I've never gone into the details of my opinion on stage, and twitter isn't really the right medium for advocacy. I always wanted to write a blog post about my take on this old debate, so here it is.

### Tabs take up less space

Yes, this might be an insignificant difference after gzipping and a nonexistent one after minification. But it means you need these processes to keep your code size reasonable. You depend on them, for no reason. Comments for example are useful, and it's worth having them even if you knew you couldn't minify or gzip your code. Tabs could do the same thing as spaces, so you're just bloating your code for no reason.

### Tabs can be personalized

The width of a tab character can be adjusted per editor. This is not a disadvantage of tabs as commonly evangelized, but a major advantage. **People can view your code in the way they feel comfortable with, not in the way \*you\* prefer.** Tabs decouple the code's presentation from its logic, just like CSS decouples presentation from HTML. They give more power to the reader rather than letting the author control everything. Basically, using spaces is like saying "I don't give a rat's ass about how you feel more comfortable reading code. I will force you to use _my_ preferences because it's _my_ code".

### Tabs are better for collaboration

Personalization is incredibly valuable when a team is collaborating, as different coders can have different opinions. Some coders prefer their indents to be 2 spaces wide, some coders prefer them to be 4 spaces wide. Rather than manually or automatically converting the code post-pull, and then back pre-commit, it would be adjusted automatically, depending on the editor's tab-width setting, so every coder could start editing right away, with their favorite type of indent.

### You don't depend on certain tools

When using spaces, you depend on your editor to hide the fact that an indent is actually N characters instead of one. You depend on your editor to insert N spaces every time you press the Tab key and to delete N characters every time you press backspace or delete near an indent. When you have to use something that's not your editor (for example when writing a snippet of code on a webapp that embeds something like codemirror) you will have to face the ugliness of your decision. Especially with codemirror, everyone else will have to face the ugliness of spaces too, as it converts tabs to spaces :(

### Tabs are easy to select

Assume for some reason you want to select all indents and double them or convert them to spaces. This is very easy with tabs, because that's their sole meaning. Tabs were invented for this sort of thing. Spaces on the other hand, have many meanings, so you can't just find & replace space characters. And how do we usually call the practice of using things for a different purpose than they were made for? Yup, that's right, **using spaces for indentation is a hack**.

### Code indented with tabs is easier to copy & paste

As [pointed out by Norbert Süle in the comments](http://lea.verou.me/2012/01/why-tabs-are-clearly-superior/#comment-415098853), when you copy and paste code that's indented with spaces, you have to manually adjust the indentation afterwards, unless the other person also _happens_ to prefer the same width indents as you. With tabs, there is no such issue, as it's always tabs so it will fit in with your (tabbed) code seamlessly. The world would be a better place if everyone used tabs.

### But what about the web? Tabs are super wide there!

This used to be a big problem, and even the enlightened coders that prefer tabs usually convert them to spaces before posting code online. However, CSS3 solves this problem, with the [tab-size property](https://developer.mozilla.org/en/CSS/tab-size). It's supported by Opera, Firefox and [very soon by WebKit](https://bugs.webkit.org/show_bug.cgi?id=52994) too. It also degrades gracefully: The code is less pretty, but still perfectly readable.

### Are spaces always evil?

Spaces are the best choice for aligning, rather than indenting. For example, in the following code snippet:

var x = 10,
    y = 0;

you need 4 spaces to make the variables line up. If you used tabs, they would only line up when the tab width is 4 and the formatting would look messed up in every other case. However, if this code snippet was also indented, the indents could (and should) still be tabs.

Another example is aligning CSS3 properties with different vendor prefixes. The indent should be done with tabs, but the aligning with spaces, like so:

div {
	-webkit-transition: 1s;
	   -moz-transition: 1s;
	    -ms-transition: 1s;
	     -o-transition: 1s;
	        transition: 1s;
}

### It's just a pointless detail, are you seriously that obsessed?

Um, ok I am exaggerating a bit when I say how spaces suck. I do think they suck, although I admit the world has much bigger problems than coders who use spaces for indentation.

For example, coders that don't name their variables properly. Or the ones that prefer Emacs over Vim ;)

### Further reading

- [Indentation With Spaces Considered Harmful](http://mystilleef.blogspot.com/2006/11/indentation-with-spaces-considered.html)
- [Tabs vs spaces for code indentation](http://www.rizzoweb.com/java/tabs-vs-spaces.html)
- [Why I love having tabs in source code](http://derkarl.org/why_to_tabs.html)
- [Tabs vs spaces](http://blogs.msdn.com/b/cyrusn/archive/2004/09/14/229474.aspx)
- Relevant: [Elastic tabstops](http://nickgravgaard.com/elastictabstops/)

Update: More reasons from commenters

Thanks to [Oli](https://twitter.com/boblet)  for his proofreading!

### Update: More reasons from commenters

1. **Tabs reduce typing effort** (Yes, editors will insert groups of spaces automatically when you press tab, but cursor movement and deletions must be done one at a time).
2. **Tabs make typing consistent - inserting/deleting/moving past an indent is always a single keypress.** With spaces, one keypress creates an indent, but then you need to press delete an \*indeterminate number of times\* to remove the indent. That means I have to watch what I'm doing and press delete until my cursor lines up with the previous line, or (3) occurs.
3. **Tabs are indivisible.** With spaces it is easy to end up on a non-tab column, and then you have either messy code or waste time tidying up the indentation. Tabs eliminate this problem by "snapping" code to the correct indentation column automatically.
