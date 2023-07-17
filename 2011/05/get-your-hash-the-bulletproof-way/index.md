---
title: "Get your hash — the bulletproof way"
date: "2011-05-23"
categories:
  - "tips"
tags:
  - "js"
  - "urls"
---

This is probably one of the things that everyone thinks they know how to do but many end up doing it wrong. After coming accross yet one more super fragile snippet of code for this, I decided a blog post was in order.

## The problem

You want to remove the pound sign (#) from `location.hash`. For example, when the hash is `"#foo"`, you want to get a string containing `"foo"`. That's really simple, right?

## Tricky cases

What most developers seem to miss is that in modern, JavaScript-heavy applications, a hash can contain any unicode character. It doesn't necessarily have to correspond to the value of an actual id attribute in the page. And even when it does, [ID attributes can now contain almost any unicode character](http://mathiasbynens.be/notes/html5-id-class). Another thing sometimes forgotten is that there might be no hash in the page. Even in a URL that ends in #, `location.hash` is actually equal to `""` (the empty string) and not `"#"`.

## Naive approaches

This one is the most recent, found in a book I was tech reviewing:

var hash = location.hash.match(/#(\\w+)/)\[1\];

which has quite a few issues:

- Returns wrong results when there is any non-latin or non-alphanumeric character in the hash. For example, for the hash `#foo@o#bar$%huh hello`, just `"foo"` would be returned.
- Throws a `TypeError` when `location.hash` is empty, since `.match()` will return `null`.

Other variations of this pattern I've seen include using explicitly defined character classes instead of `\w`, adding an anchor (`^`) before the pound sign (which is an excellent idea for performance) and checking if `.match()` actually returned something before using its result. However, they usually also fall into at least one of the 2 aforementioned issues.

Another approach a friend of mine once used was this:

var hash = location.hash.split('#')\[1\];

This also has its issues, which are ironically less than the first one, even though it seems a far more naive approach.

- With the same test hash, it would at least get the `"foo@o"` part, which means it only fails when the hash contains a pound sign
- When there's no hash, it doesn't throw an error, although it returns `undefined` instead of the empty string.

## Getting it right

The approach I usually use is far simpler than both of the above and probably looks too loose:

var hash = location.hash.substring(1);

However, let's examine it a bit:

- With our weird test hash, it actually returns the correct result: "foo@o#bar$%huh hello"
- When no hash exists, it correctly returns the empty string

"But it assumes there's a pound sign at the start of the string!" I almost hear some of you cry. Well, that could be a real concern, if we were dealing with an arbitrary string. In that case, we would have to check if there's actually a pound sign first or if the string even exists. However, with `location.hash` the only case when that is not true, is when there is no hash. And we got that case covered. ;)

**Edit:** As [pointed out](http://lea.verou.me/2011/05/get-your-hash-the-bulletproof-way/#comment-209660879) in the comments, you may also use `location.hash.slice(1)` instead of `substring`. I kinda prefer it, since it's 4 bytes shorter.

If however you're obsessed with RegExps and want to do it with them no matter what, this is just as bulletproof and almost as short:

var hash = location.hash.replace(/^#/, '');

If for some reason (OCD?) you want to do it with `.match()` no matter what, you could do this:

var match = location.hash.match(/^#?(.\*)$/)\[1\];

In that case, since the pound sign is optional, since `.match()` never returns `null`. And no, the pound sign never erroneously becomes part of the returned hash, because of the way regex engines work.

## "This is too basic, what a waste of my time!"

Sorry for that. I know that for some of you, this is elementary. But the guy who wrote that book is very knowledgable (the book is really good, apart from that code snippet) so I thought this means there are many good developers out there who get this wrong, so this post was needed to be written. If you're not one of them, you can take it as a compliment.

## "Hey, you missed something too!"

In that case, I'd love to find out what it is, so please leave a comment! :)
