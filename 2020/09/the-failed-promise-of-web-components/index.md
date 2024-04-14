---
title: "The failed promise of Web Components"
date: "2020-09-24"
tags:
  - "rants"
  - "thoughts"
  - "html"
  - "js"
  - "usability"
  - "dx"
  - "web-components"
---

Web Components had so much potential to empower HTML to do more, and make web development more accessible to non-programmers and easier for programmers. Remember how exciting it was every time we got new shiny HTML elements that actually _do stuff_? Remember how exciting it was to be able to do sliders, color pickers, dialogs, disclosure widgets straight in the HTML, without having to include any widget libraries?

The promise of Web Components was that we'd get this convenience, but for a much wider range of HTML elements, developed much faster, as nobody needs to wait for the full spec + implementation process. We'd just include a script, and boom, we have more elements at our disposal!

Or, that was the idea. Somewhere along the way, the space got flooded by JS frameworks aficionados, who revel in complex APIs, overengineered build processes and dependency graphs that look like the roots of a banyan tree.

<figure>

![](https://live.staticflickr.com/2025/32441377780_e3acf6de12_b.jpg)

<figcaption>

This is what the roots of a Banyan tree look like. [Photo by David Stanley on Flickr (CC-BY)](https://www.flickr.com/photos/79721788@N00/32441377780/).
</figcaption>
</figure>

Perusing the components on [webcomponents.org](https://www.webcomponents.org/) fills me with anxiety, and I'm perfectly comfortable writing JS — I write JS for a living! What hope do those who can't write JS have? Using a custom element from the directory often needs to be preceded by a ritual of npm flugelhorn, import clownshoes, build quux, all completely unapologetically because "here is my truckload of dependencies, yeah, what". Many steps are even omitted, likely because they are "obvious". Often, you wade through the maze only to find the component doesn't work anymore, or is not fit for your purpose.

Besides setup, the main problem is that HTML is not treated with the appropriate respect in the design of these components. They are not designed as closely as possible to standard HTML elements, but _expect_ JS to be written for them to do anything. HTML is simply treated as a shorthand, or worse, as merely a marker to indicate where the element goes in the DOM, with all parameters passed in via JS. I recall [a wonderful talk by Jeremy Keith](https://adactio.com/articles/12839#webcomponents) a few years ago about this very phenomenon, where he discussed [this e-shop Web components demo by Google](https://shop.polymer-project.org/), which is the poster child of this practice. These are the entire contents of its `<body>` element:

```html
<body>
	<shop-app unresolved="">SHOP</shop-app>
	<script src="node_assets/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
	<script type="module" src="src/shop-app.js"></script>
	<script>window.performance&&performance.mark&&performance.mark("index.html");</script>
</body>
```

If this is how Google is leading the way, how can we hope for contributors to design components that follow established HTML conventions?

Jeremy criticized this practice from the aspect of backwards compatibility: when JS is broken or not enabled, or the browser doesn't support Web Components, the entire website is blank. While this is indeed a serious concern, my primary concern is one of **usability**: **HTML is a lower barrier to entry language**. Far more people can write HTML than JS. Even for those who do eventually write JS, it often comes after spending years writing HTML & CSS.

If components are designed in a way that requires JS, this excludes thousands of people from using them. And even for those who _can_ write JS, HTML is often easier: you don't see many people rolling their own sliders or using JS-based ones once `<input type="range">` became widely supported, right?

Even when JS is unavoidable, it's not black and white. A well designed HTML element can reduce the amount and complexity of JS needed to a minimum. Think of the [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) element: it usually does require \*some\* JS, but it's usually rather simple JS. Similarly, the `<video>` element is perfectly usable just by writing HTML, and has a comprehensive JS API for anyone who wants to do fancy custom things.

The other day I was looking for a simple, dependency free, tabs component. You know, the canonical example of something that is easy to do with Web Components, the example 50% of tutorials mention. I didn't even care what it looked like, it was for a testing interface. I just wanted something that is small and works like a normal HTML element. Yet, it proved so hard I ended up writing my own!

### Can we fix this?

I'm not sure if this is a design issue, or a documentation issue. Perhaps for many of these web components, there are easier ways to use them. Perhaps there are vanilla web components out there that I just can't find. Perhaps I'm looking in the wrong place and there is another directory somewhere with different goals and a different target audience.

But if not, and if I'm not alone in feeling this way, we need a directory of web components with strict inclusion criteria:

- **Plug and play.** No dependencies, no setup beyond including one `<script>` tag. If a dependency is absolutely _needed_ (e.g. in a map component it doesn't make sense to draw your own maps), the component loads it automatically if it's not already loaded.
- Syntax and API follows [**conventions established by built-in HTML elements**](https://www.smashingmagazine.com/2017/02/designing-html-apis/) and anything that _can_ be done without the component user writing JS, _is_ doable without JS, per [the W3C principle of least power](https://www.w3.org/2001/tag/doc/leastPower.html).
- **Accessible by default** via sensible ARIA defaults, just like normal HTML elements.
- **Themable** via [`::part()`](https://developer.mozilla.org/en-US/docs/Web/CSS/::part), selective inheritance and custom properties. Very minimal style by default. Normal CSS properties should just "work" to the the extent possible.
- **Only one component of a given type** in the directory, that is **flexible** and **extensible** and continuously iterated on and improved by the community. Not 30 different sliders and 15 different tabs that users have to wade through. No branding, no silos of "component libraries". Only elements that are designed as closely as possible to what a browser would implement in every way the current technology allows.

I would be up for working on this if others feel the same way, since that is not a project for one person to tackle. _Who's with me?_

**UPDATE:** Wow this post blew up! Thank you all for your interest in participating in a potential future effort. I'm currently talking to stakeholders of some of the existing efforts to see if there are any potential collaborations before I go off and create a new one. [Follow me on Twitter to hear about the outcome](https://twitter.com/leaverou)!
