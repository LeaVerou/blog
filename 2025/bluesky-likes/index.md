---
title: Designing Web Components to display Bluesky Likes
toc: true
draft: true
image: images/demo.png
defaultLanguage: javascript
tags:
- web-components
- launch
- open-source
- bluesky
- api design
- a11y
- i18n
---

<figure>
<img src="images/demo.png" alt="Screenshot of the Bluesky Likes components" style="width: 100%;">
<figcaption>

Just want the components? Here you go:
<a href="https://projects.verou.me/bluesky-likes/" target="_blank" class="small cta">
<i class="fa-brands fa-bluesky"></i> Demo</a>
<a href="https://github.com/LeaVerou/bluesky-likes" target="_blank" class="small cta">
<i class="fa-brands fa-github"></i> Repo</a>
<a href="https://www.npmjs.com/package/bluesky-likes" target="_blank" class="small cta">
<i class="fa-brands fa-npm"></i> NPM</a>
</figcaption>
</figure>
## A love letter to the Bluesky API

I’m old enough to remember the golden Web 2.0 era, when many of today’s big social media platforms grew up.
A simpler time, when the Web was much more extroverted.
It was common for websites to embed data from others (the peak of [mashups](https://en.wikipedia.org/wiki/Mashup_(web_application_hybrid))),
and prominently feature widgets from various platforms to showcase a post’s likes or shares.

Especially Twitter was so ubiquitous that the number of Twitter shares was my primary metric for how much people were interested in a blog post I wrote.
Then, websites started progressively becoming walled gardens, guarding their data with more fervor than Gollum guarding the Precious.
Features disappeared or got locked behind API keys, ridiculous rate limits, expensive paywalls, and other restrictions.
Don’t get me wrong, I get it.
A lot of it was reactionary, a response to abuse — the usual reason we can’t have nice things.
And even when it was to stimulate profit — it is understandable that they want to monetize their platforms.
People gotta eat.

I was recently reading [this interesting article](https://whitep4nth3r.com/blog/the-promise-that-wasnt-kept/) by Salma Alam-Naylor.
The article makes some great points, but it was something else that caught my eye: the widget of Bluesky likes at the bottom.

<figure class="no-padding">
	<img src="images/salmas-widget.png" alt="Screenshot of Salma's Bluesky likes widget">
	<figcaption>Salma's Bluesky likes widget that inspired these</figcaption>
</figure>

I mentioned it to my trusty apprentice [Dmitry](https://d12n.me/) who [discovered](https://codepen.io/dmitrysharabin/pen/Jodbyqm) the API was actually much simpler than what we've come to expect.
Later, it turned out Salma has even written an entire [post](https://whitep4nth3r.com/blog/show-bluesky-likes-on-blog-posts/) on how to implement the same thing on your own site.

The openness of the API was so refreshing.
Not only can you read public data without being authenticated, **you don’t even need an API key!**
Major nostalgia vibes.

It seemed the perfect candidate for a web component that you can just drop in to a page, give it a post URL, and it will display the likes for that post.
I just _had_ to make it, and of course use it right here.

<!-- more -->

**Web Components that use API data have been historically awkward.**
Let’s set aside private API keys or APIs that require authentication even for reading public data for a minute.
Even for public API keys, where on Earth do you put them?!
There is no established pattern for passing global options to components.
**Attributes need to be specified on every instance**, which is very tedious.
So every component invents their own pattern: some bite the bullet and use attributes, others use static class fields, `data-*` attributes on any element or on specific elements, separate ES module exports, etc.
None of these are ideal, so components often do multiple.
Not to mention the onboarding hassle of creating API keys if you want to try multiple APIs.

The Bluesky API was a breath of fresh air:
just straightforward HTTP GET requests with straightforward JSON data responses.

Sing with me!<br>
🎶 _all you need is `fetch`_ 🎺🎺🎺<br>
🎶 _all you need is `fetch`_ 🎺🎺🎺<br>
🎶 _all you need is `fetch`, `fetch`_ 🎶<br>
🎶 _`fetch` is all you need_ 🎶


Building a component that used it was a breeze.

## Two Components for displaying Bluesky likes

In the end I ended up building two separate components, published under the same [`bluesky-likes` npm package](https://www.npmjs.com/package/bluesky-likes):
- `<bluesky-likes>` — displays the number of likes for a post, and
- `<bluesky-likers>` — displays the list of users who liked a post.

They can be used separately, or together.
E.g. to get a display similar to Salma’s widget, the markup would look like this:

```html
<script src="https://unpkg.com/bluesky-likes" type="module"></script>

<h2>
	<bluesky-likes src="https://bsky.app/profile/lea.verou.me/post/3lhygzakuic2n"></bluesky-likes>
	likes on Bluesky
</h2>

<p>
	<a href="https://bsky.app/profile/lea.verou.me/post/3lhygzakuic2n">Like this post on Bluesky to see your face on this page</a>
</p>

<bluesky-likers src="https://bsky.app/profile/lea.verou.me/post/3lhygzakuic2n"></bluesky-likers>
```

And the result would be similar to this:

![](https://projects.verou.me/bluesky-likes/demo/screenshot.png)

Requests are aggressively cached across component instances,
so no, the fact that it’s two separate components doesn’t mean you’ll be making duplicate requests.
Additionally, these ended up pretty lightweight: the whole package is [~2 KB minified & gzipped](https://bundlephobia.com/package/bluesky-likes) and dependency-free.

<aside id="dependencies">
<h4>Aside: On dependencies</h4>

Don’t get me wrong; **I have nothing against dependencies**.
For nontrivial web components or web component libraries, they are typically necessary.
In fact, one of my many unfinished side projects is [a modular library of composable web component helpers](https://github.com/nudeui/element).

I don’t set out to make anything dependency-free; I think that’s the wrong goal.
**Abstractions are how technology moves forward.**
But abstractions come with a **cost**, so they need to add enough value to justify their existence in a project.

I tend to approach most dependencies in the same way I approached the epidural when I had my daughter:
first try without, and if it gets too painful, go for it.
It just never got to that point.
They both got very close and then it was over. 🤷🏽‍♀️
</aside>

## API Design for Web Components

### Design Principles

Per my usual [API design philosophy](https://www.youtube.com/watch?v=g92XUzc1OHY),
I wanted these components to make common cases easy, complex cases possible, and not have usability cliffs,
i.e. the progression from the former to the latter should be smooth.

<figure>
	<object data="https://talks.verou.me/api-design/images/curve-delightful-3.svg"></object>
	<object data="images/usability-cliff.svg"></object>
	<figcaption>API design curve</figcaption>
</figure>

What does that mean for a web component?

#### Common use cases should be _easy_

You should have a good result by simply including the component and specifying the minimum input to communicate your intent,
in this case, a Bluesky post URL.
- You should not need to write CSS to make it look decent
- You should not need to write JavaScript to make it work
- You should not need to slot content for things that could have sensible defaults

#### Complex use cases should be _possible_

You should be able to fully gut the component's HTML and CSS to fully suit your needs if your needs are very specific,
though it's okay if that requires work (e.g. subclassing, overriding JS properties or methods etc.).

In this case, all component styles and templates are exposed as static properties on the component class that you can modify or replace,
either directly on it, or in your own subclass.

#### No usability cliffs

Making common things easy and complex things possible is not enough for a good API.
Most use cases fall somewhere in between the two extremes.
If a small increase in use case complexity throws you off the deep end in API complexity, you’re gonna have a _bad time_.

The API should have enough customization hooks that common customizations do not require going through the same flow as full customization and recreating everything.

For web components, this might mean:
- Ideally, **standard CSS properties** on the host should work.
This is also part of the [principle of least astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment).
However, sometimes this is simply not feasible or it would require unacceptable tradeoffs, which brings us to…
- Exposing enough **custom properties** that basic, common customizations don't require parts.
- Exposing [parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) for more complex styling.
Don’t be stingy with your parts.
The downsides of exposing too many parts are few and small, but not exposing enough parts can make certain styling impossible.
The rule of thumb is typically **if you don’t have a reason to encapsulate, put a `part` on it**.
- Exposing [states](https://developer.mozilla.org/en-US/docs/Web/CSS/:state) for more conditional styling. Yes, it’s Baseline now.
- Defining enough slots for content customization

## The 99-99 rule of Web Components

The [Ninety-Ninety Rule](https://en.wikipedia.org/wiki/Ninety%E2%80%93ninety_rule) tells us that the last 10% of the work takes 90% of the time.
I would argue that for web components, it’s more like a 99-99 Rule.

Take these Bluesky Likes components as an example.
They are the poster child for the kind of straightforward, simple component that does one thing well.
But **web components are a bit like children: if most people realized upfront how much work they are, way fewer would get made**.

<figure>
	<object data="images/iceberg.svg"></object>
	<figcaption>Building a web component is always more work than it looks</figcaption>
</figure>

Even when the core functionality is very quick to implement, there are so many other things that need to be done:
- Dynamically responding to changes (in attributes, slots, nested content, etc) like regular HTML elements takes work, especially if you want to do it 100% _properly_, which is rarely a good idea (more on that below).
Libraries like [Lit](https://lit.dev/) make some of it easier, but not trivial.
- Accessibility and i18n often takes more work than the core component functionality.
- Figuring out what style and UI customization hooks to offer
- Figuring out the right tradeoffs between performance and all of the above

And this is without any additional functionality creeping up.
Some examples below.

### Customizing the link in `<bluesky-likes>`

My first prototype of `<bluesky-likes>` always had an internal link in its shadow DOM that opened the full list of likers in a new tab.
There were several usability, accessibility, and i18n issues:
- What if you want it to link to the post itself, or even an entirely different URL?
- How to customize the link attributes, e.g. `rel` or `target`?
- **a11y:** The link did not have a `title` at the time, only the icon had alt text.
This meant assistive technologies would read it like "Butterfly blue heart fifteen".
How to word the link title to best communicate what the link does to assistive technologies without excessive verbosity?
- And then, how to allow users to customize the link title for **i18n**?

Often components will solve these types of problems the brute force way, by replicating all `<a>` attributes on the component itself,
which is both heavyweight and a maintenance nightmare over time.

Instead, we went with a slightly unconventional solution:
**the component detects whether it’s inside a link**, and removes its internal `<a>` element in that case.
This solves all four issues at once; the answer to all of them is to just wrap it with the link of your choice.
This allowed us to just pick a good default `title` attribute, and not have to worry about it.

It’s not perfect: now that `:host-context()` is [removed](https://github.com/w3c/csswg-drafts/issues/1914#issuecomment-2737310093),
there is no way for a component to style itself differently when it’s inside a link,
to e.g. control the focus outline.
And the detection is not perfect, because doing it perfectly would incur a performance penalty for little gain.
But the tradeoffs so far seem worth it.

### Keyboard accessibility in `<bluesky-likers>`

My first prototype of `<bluesky-likers>` wrapped all avatars with regular links (they just had `rel="nofollow"` and `target=_blank"`).
Quite reasonable, right?
And then it dawned on me: this meant that if a keyboard user had the misfortune of stumbling across this component in their path,
they would have needed to hit Tab 101 (!) times in the worst case to escape it.
**Yikes on bikes!** 😱

So what to do? `tabindex="-1"` would remove the links from the tabbing order, fixing the immediate problem.
But then how would keyboard users actually access them?
Would I need to implement a whole arrow key based navigation system for them?
Fortunately, before going down that path I stepped back and asked myself: _“Do they need to?”_.
These links are entirely auxiliary;
in Salma’s original widget **these were not links at all**.
Not only is it not common to need to click through the profiles of users who liked a post,
it was also already possible via the Bluesky "Liked By" page
which was usually already linked in the rest of the UI (e.g. via `<bluesky-likes>`)!

In the end, what I added was **a default slot to specify content that is visually hidden unless focused**.
This way, in the unlikely scenario that someone is using this component by itself with no other links around it,
they can simply nest content within it to provide a link to the full list of likers or even other context.
And because **the visually hidden styling is applied to the slot this also allows providing fallback content to everyone**.

### The pains of locale-aware web components

Both components display formatted numbers:
`<bluesky-likes>` displays the total number of likes, and `<bluesky-likers>` displays the number of likes not shown (if any).

My first prototypes simply called `.toLocaleString("en", {notation: "compact"})` on the number.
But this meant that in a non-English site, large numbers would still be formatted like "1K" etc.
Thankfully, `Intl.NumberFormat` (what `toLocaleString()` uses internally) handles the complexity of what to do for different locales,
but you still need to pass the right locale to it.

What language would that be?
If you answered `this.lang`, you’d be wrong.
That gives you the value of an element’s `lang` attribute,
but the actual computed language of the element is inherited from the nearest ancestor with a `lang` attribute.

Something like this is a good compromise:

```js
const lang = this.lang
			|| this.parentNode.closest("[lang]")?.lang
			|| this.ownerDocument.documentElement.lang
			|| "en";
```

This is what these components use.
It’s not perfect, but it covers a good majority of cases with minimal performance impact.
Notably, the cases it misses is when the component is inside a shadow tree but is getting its language from an element outside that shadow tree, that is _not_ the root element.

If you wanted to do it _properly_, it would be a lot more involved.
Possibly something like this,
which you might want to abstract into a helper function.

```js
let lang = this.lang;
if (!lang) {
	let langElement = this;
	while (!(langElement = langElement.closest("[lang]"))) {
		let root = langElement.getRootNode();
		let host = root.host ?? root.documentElement;
		langElement = host;
	}

	lang = langElement?.lang || "en";
}
```

But, _actually_, if you _really_ needed to do it properly, **even now you wouldn’t be done**!
What about dynamically reacting to changes?
Any element’s `lang` attribute could change at any point.

Er, take my advice don’t go there.
Pour yourself a glass of wine (replace with your vice of choice if wine is not your thing), watch an episode of your favorite TV show and try to forget about this.

Some of you will foolishly not take my advice.
I already hear some voices at the back crying _“But what about mutation observers?”_.
Oh my sweet summer child.

**What are you going to observe?**
The element with the `lang` attribute you just found?
_WRONG._
What if a lang attribute is added to an between that and your component?
That will affect the component’s language, but it won’t be picked up.
And since you can’t observe an element’s line of ancestors,
your only recourse is to watch the entire subtree.

_I told you to not think about it. You didn’t listen. It’s still not too late to go for that wine._

Still here? Damn, you’re stubborn.
Here’s how to do it if you _really_ need to.
Once you’ve detected the language (e.g. suppose we detected `el`),
generate a CSS rule like this and add it to your shadow DOM:

```css
:host(:lang(el)) {
	--lang: el;
}
```

Then, register the `--lang` property, add a transition on it, and watch for changes via transition events
(or just use [Style Observer](../style-observer/) if you’re already using it).

_See? I told you not to think about it._

Do I think that’s a good idea?
In most cases, absolutely not.
Even if effort, complexity, and scope was no issue, the performance impact of doing it properly is not worth it for the tiny fraction of additional use cases you’re covering.
I can only see it being a good idea in very specific cases, or if you have a reason to strive for this kind of perfection (e.g. guidelines from higher up).

A lot of web components development is about making exactly these kinds of tradeoffs between how close you want to get to the way a native element would behave,
because going all the way and expecting the same dynamic behavior as if it’s a native HTML element is rarely the best balance of tradeoffs.

That said, this _should_ be easier.
It should not need to require balancing tradeoffs.
It’s just reading a component’s language for crying out loud!

In September at TPAC we made [progress](https://github.com/whatwg/html/issues/7039#issuecomment-2378006020) in getting WHATWG to standardize a way to actually read locale information and react to future changes,
but (to my knowledge) not much has happened since.
I hope this dramatic reenactment generates some empathy among WHATWG folks on what web components developers are up against.

## 🚢 it, squirrel!

It’s all fun and games and then you ship.

If you’re not careful, building a web component can be a potentially unbounded task.
Some tasks are definitely necessary, e.g. accessibility, i18n, performance, etc,
but there comes a point where you’re mainly [petting](https://theoatmeal.com/comics/creativity_petting).

So here they are:
<a href="https://projects.verou.me/bluesky-likes/" target="_blank" class="cta">
<i class="fa-brands fa-bluesky"></i> Demo</a>
<a href="https://github.com/LeaVerou/bluesky-likes" target="_blank" class="cta">
<i class="fa-brands fa-github"></i> Repo</a>
<a href="https://www.npmjs.com/package/bluesky-likes" target="_blank" class="cta">
<i class="fa-brands fa-npm"></i> NPM</a>

They’re far from perfect.
Yes, they could be improved in a [number of ways](https://github.com/LeaVerou/bluesky-likes/issues).
But they’re good enough to use here, and that will do for now.
If you want to improve them, pull requests are welcome (check with me for big features though).
And if you use them on a for-profit site, I do expect you to [fund their development](https://github.com/sponsors/LeaVerou).
That’s an ethical and social expectation, not a legal one (but it will help prioritization, and that’s in your best interest too).

If you’ve used them, I’d love to see what you do with them!
