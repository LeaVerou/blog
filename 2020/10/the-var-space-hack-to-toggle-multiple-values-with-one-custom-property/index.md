---
title: "The -​-var: ; hack to toggle multiple values with one custom property"
date: "2020-10-12"
tags:
  - "original"
  - "tips"
  - "css"
  - "css-variables"
---

What if I told you you could use a single property value to turn multiple different values on and off across multiple different properties and even across multiple CSS rules?

What if I told you you could turn this flat button into a glossy skeuomorphic button by just tweaking one custom property `--is-raised`, and that would set its border, background image, box and text shadows in one fell swoop?

![](images/image-1.png)

<iframe src="https://dabblet.com/gist/055d4c1d9590250d6633bdf63e37f9ca" style="border: 0; width: 100%; min-height: 500px"></iframe>

_How_, you may ask?

The crux of this technique is this: There are two custom property values that work almost everywhere there is a `var()` call with a fallback.

The more obvious one that you probably already know is the `initial` value, which makes the property just apply its fallback. So, in the following code:

```
background: var(--foo, linear-gradient(white, transparent)) hsl(220 10% 50%);
border: 1px solid var(--foo, rgb(0 0 0 / .1));
color: rgb(0 0 0 var(--foo, / .8));
```

We can set `--foo` to `initial` to enable these "fallbacks" and append these values to the property value, adding a gradient, setting a border-color, and making the text color translucent in one go. But what to do when we want to turn these values _off_? Any non-initial value for `--foo` (that doesn't create cycles) should work. But is there one that works in all three declarations?

It turns out there _is_ another value that works everywhere, in every property a `var()` reference is present, and you'd likely never guess what it is (unless you have watched any of my CSS variable talks and have a good memory for passing mentions of things).

_Intrigued?_

It's whitespace! **Whitespace is significant in a custom property.** When you write something like this:

```
--foo: ;
```

This is **not** an invalid declaration. This is a declaration where the value of `--foo` is literally one space character. However, whitespace is valid in every CSS property value, everywhere a `var()` is allowed, and does not affect its computed value in any way. So, we can just set our property to one space (or even a comment) and not affect any other value present in the declaration. E.g. this:

```
--foo: ;
background: var(--foo, linear-gradient(white, transparent)) hsl(220 10% 50%);
```

produces the same result as:

```
background: hsl(220 10% 50%);
```

We can take advantage of this to essentially turn `var()` into a single-clause `if()` function and conditionally append values based on a single custom property.

As a proof of concept, here is the two button demo refactored using this approach:

<iframe src="https://dabblet.com/gist/4524674b9b8c49d88808b10f1d9ce3ec" style="border: 0; width: 100%; min-height: 500px"></iframe>

### Limitations

I originally envisioned this as a building block for a technique _horrible hack_ to enable "mixins" in the browser, since [@apply is now defunct](https://www.xanthir.com/b4o00). However, the big limitation is that this only works for appending values to existing values — or setting a property to either a whole value or `initial`. There is no way to say "the background should be red if `--foo` is set and white otherwise". Some such conditionals can be emulated with clever use of appending, but not most.

And of course there's a certain readability issue: `--foo: ;` looks like a mistake and `--foo: initial` looks pretty weird, unless you're aware of this technique. However, that can easily be solved with comments. Or even constants:

```
:root {
	--ON: initial;
	--OFF: ;
}

button {
	--is-raised: var(--OFF);
	/* ... */
}

#foo {
	--is-raised: var(--ON);
}
```

Also do note that eventually we will get a proper `if()` and won't need such horrible hacks to emulate it, discussions are already underway \[[w3c/csswg-drafts#5009](https://github.com/w3c/csswg-drafts/issues/5009) [w3c/csswg-drafts#4731](https://github.com/w3c/csswg-drafts/issues/4731)\].

So what do you think? Horrible hack, useful technique, or both? 😀

## Prior art

Turns out this was independently discovered by two people before me:

- First, [the brilliant Ana Tudor circa 2017](https://twitter.com/anatudor/status/1284160219963170816)
- Then [James0x57 in April 2020](https://github.com/propjockey/css-sweeper#css-is-a-programming-language-thanks-to-the-space-toggle-trick)

And it was called "space toggle hack" in case you want to google it!
