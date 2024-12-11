---
title: "Styling elements based on sibling count"
date: "2011-01-17"
tags:
  - "replies"
  - "tips"
  - "css"
  - "selectors"
---

The [original idea belongs to André Luís](http://andr3.net/blog/post/142), but I think it could be improved to be much less verbose.

André's solution is like this:

```
/* one item */
li:nth-child(1):nth-last-child(1) {
	width: 100%;
}

/* two items */
li:nth-child(1):nth-last-child(2),
li:nth-child(2):nth-last-child(1) {
	width: 50%;
}

/* three items */
li:nth-child(1):nth-last-child(3),
li:nth-child(2):nth-last-child(2),
li:nth-child(3):nth-last-child(1) {
	width: 33.3333%;
}

/* four items */
li:nth-child(1):nth-last-child(4),
li:nth-child(2):nth-last-child(3),
li:nth-child(3):nth-last-child(2),
li:nth-child(4):nth-last-child(1) {
	width: 25%;
}
```

It's based on the relationship between :nth-child and :nth-last-child. As you can see, the number of total rules is O(N) and the number of selectors in every rule is also O(N).

However, what you really want, is to just target the first element. The others can be targeted with just a sibling selector. With my improvement, the number of total rules is still O(N), but the number of selectors in every rule becomes just 2, making this trick practical for far larger numbers of children:

/\* one item \*/
li:first-child:nth-last-child(1) {
	width: 100%;
}

/\* two items \*/
li:first-child:nth-last-child(2),
li:first-child:nth-last-child(2) ~ li {
	width: 50%;
}

/\* three items \*/
li:first-child:nth-last-child(3),
li:first-child:nth-last-child(3) ~ li {
	width: 33.3333%;
}

/\* four items \*/
li:first-child:nth-last-child(4),
li:first-child:nth-last-child(4) ~ li {
	width: 25%;
}

And here's a fiddle to prove it:

<iframe style="width: 100%; height: 300px" src="https://jsfiddle.net/leaverou/HdfaT/embedded/result,css,html"></iframe>

Yes, I know that with Flexbox and the other layout modules, techniques such as these are soon becoming obsolete, but I think they are still useful right now. I'm also aware that you can emulate this particular example with table display modes, but a) Table display modes have other implications that are sometimes undesirable and b) Widths are just an example, you could come up with other ways to style the elements based on their total count, which can't be emulated by CSS tables.
