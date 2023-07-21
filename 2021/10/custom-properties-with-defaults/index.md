---
title: "Custom properties with defaults: 3+1 strategies"
date: "2021-10-15"
tags:
  - "articles"
  - "original"
  - "tutorials"
  - "css"
  - "css-custom-properties"
  - "css-variables"
  - "dynamic-css"
---

When developing customizable components, one often wants to expose various parameters of the styling as custom properties, and form a sort of _CSS API_. This is still underutlized, but there are libraries, e.g. [Shoelace](https://shoelace.style/), that already [list](https://shoelace.style/components/switch?id=css-custom-properties) [custom](https://shoelace.style/components/progress-ring?id=css-custom-properties) [properties](https://shoelace.style/components/image-comparer?id=css-custom-properties) alongside other parts of each component's API (even [CSS parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)!).

_**Note:** I’m using "component" here broadly, as any reusable chunk of HTML/CSS/JS, not necessarily a web component or framework component. What we are going to discuss applies to reusable chunks of HTML just as much as it does to "proper" web components._

Let's suppose we are designing a certain button styling, that looks like this:

![](images/outlined-button.gif)

We want to support a `--color` custom property for creating color variations by setting multiple things internally:

```
.fancy-button {
	border: .1em solid var(--color);
	background: transparent;
	color: var(--color);
}

.fancy-button:hover {
	background: var(--color);
	color: white;
}
```

Note that with the code above, if no `--color` is set, the three declarations using it will be [IACVT](https://www.w3.org/TR/css-variables-1/#invalid-at-computed-value-time) and thus we'll get a nearly unstyled text-only button with no background on hover (`transparent`), no border on hover, and the default black text color (`canvastext` to be precise).

![](images/image.png)

That's no good! IT's important that we set defaults. However, using the fallback parameter for this gets tedious, and [WET](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself):
<!-- more -->
```css
.fancy-button {
	border: .1em solid var(--color, black);
	background: transparent;
	color: var(--color, black);
}

.fancy-button:hover {
	background: var(--color, black);
	color: white;
}
```

To avoid the repetition and still ensure `--color` always has a value, many people do this:

```
.fancy-button {
	--color: black;
	border: .1em solid var(--color);
	background: transparent;
	color: var(--color);
}

.fancy-button:hover {
	background: var(--color);
	color: white;
}
```

However, this is not ideal for a number of reasons:

- It means that people cannot take advantage of inheritance to set `--color` on an ancestor.
- It means that people need to use specificity that overrides your own rules to set these properties. In this case this may only be `0,1,0`, but if your selectors are complex, it could end up being quite annoying (and introduce tight couplings, because developers should not need to know what your selectors are).

If you insist going that route, [`:where()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) can be a useful tool to reduce specificity of your selectors while having as fine grained selection criteria as you want. It's also one of the features [I proposed](https://github.com/w3c/csswg-drafts/issues/1170) for CSS, so I'm very proud that it's now [supported everywhere](https://caniuse.com/mdn-css_selectors_where). `:where()` won't solve the inheritance problem, but at least it will solve the specificity problem.

What if we still use the fallback parameter and use a variable for the fallback?

```
.fancy-button {
	--color-initial: black;
	border: .1em solid var(--color, var(--color-initial));
	background: transparent;
	color: var(--color, var(--color-initial));
}

.fancy-button:hover {
	background: var(--color, var(--color-initial));
	color: white;
}
```

This works, and it has the advantage that people could even _customize your default_ if they want to (though I cannot think of any use cases for that). But isn't it so _horribly_ verbose? What else could we do?

My preferred solution is what I call _pseudo-private custom properties_. You use a different property internally than the one you expose, which is set to the one you expose plus the fallback:

```
.fancy-button {
	--_color: var(--color, black);
	border: .1em solid var(--_color);
	background: transparent;
	color: var(--_color);
}

.fancy-button:hover {
	background: var(--_color);
	color: white;
}
```

I tend to use the same name prepended with an underscore. Some people may flinch at the idea of private properties that aren't really private, but I will remind you that we've done this in JS for over 20 years (we only got real [private properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) fairly recently).

## Bonus: Defaults via @property registration

If `@property` is fair game (it's [only supported in Chromium](https://caniuse.com/mdn-css_at-rules_property), but these days that still makes it supported in 70% of users' browsers — which is a bit sad, but that's another discussion), you could also set defaults that way:

```
@property --color {
	syntax: "<color>";
	inherits: true;
	initial-value: black;
}

.fancy-button {
	border: .1em solid var(--color);
	background: transparent;
	color: var(--color);
}

.fancy-button:hover {
	background: var(--color);
	color: white;
}
```

Registering your property has several benefits (e.g. it makes it animatable), but if you're only registering it for the purposes of setting a default, this way has several drawbacks:

- Property registration is global. Your component's custom properties may clash with the host page's custom properties, which is not great. The consequences of this can be quite dire, because `@property` fails silently, and the [last one wins](https://codepen.io/leaverou/pen/JjyYgow) so you may just get the initial value of the host page's property. In this case, that could very likely be `transparent`, with [terrible results](https://codepen.io/leaverou/pen/JjyYgow). And if your declaration is last and you get your own registered property, that means the rest of the page will also get yours, with equally potentially terrible results.
- With this method you cannot set different initial values per declaration (although you usually don't want to).
- Not all custom property [syntaxes](https://developer.mozilla.org/en-US/docs/Web/CSS/@property/syntax) can be described via `@property` yet.

## Bonus: Customizable single-checkbox pure CSS switch

Just for the lulz, I made a switch (styling loosely inspired from [Shoelace switch](https://shoelace.style/components/switch)) that is just a regular `<input type=checkbox>` with a pretty extensive custom property API:

<iframe id="cp_embed_PoKPQYE" src="//codepen.io/anon/embed/PoKPQYE?height=450&amp;theme-id=1&amp;slug-hash=PoKPQYE&amp;default-tab=css,result" height="450" scrolling="no" frameborder="0" allowfullscreen allowpaymentrequest="" name="CodePen Embed PoKPQYE" title="CodePen Embed PoKPQYE" class="cp_embed_iframe" style="width:100%;overflow:hidden">CodePen Embed Fallback</iframe>

It is using the pseudo-private properties approach. Note how another bonus of this method is that there's a little self-documentation right there about the component's custom property API, even before any actual documentation is written.

As an aside, things like this switch make me wish it was possible to create web components that subclass existing elements. There is an existing — somewhat awkward — solution with [the `is` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is), but [Apple is blocking it](https://bugs.webkit.org/show_bug.cgi?id=182671). The alternative is to use a web component with [ElementInternals](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals) to make it form-associated and accessible and mirror all checkbox methods and properties, but that is way too heavyweight, and prone to breakage in the future, as native checkboxes add more methods. There is also a [polyfill](https://github.com/ungap/custom-elements#readme), but for a simple switch it may be a bit overkill. We really shouldn't need to be painstakingly mirroring native elements to subclass them…

_Enjoyed this article and want to learn more? I do teach courses on unlocking the full potential of CSS custom properties. You can watch my [Frontend Masters Dynamic CSS course (currently in production)](https://frontendmasters.com/workshops/css-variables/), or [attend my upcoming Smashing workshop](https://smashingconf.com/online-workshops/workshops/lea-verou-nov/)._
