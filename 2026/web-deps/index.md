---
title: Web dependencies are broken. Can we fix them?
toc: true
date: 2026-01-07
image: images/intervention.png
tags:
  - web-platform
  - js
  - web-standards
  - web-architecture
nutshell: Dear JS ecosystem, I love you, but you have a dependency management problem when it comes to the Web, and the time has come for an intervention.
social_posts:
  bluesky: https://bsky.app/profile/lea.verou.me/post/3mbu6axbdas2o
  twitter: https://x.com/LeaVerou/status/2008979109368496359
  mastodon: https://front-end.social/@leaverou/115855359656038697
  linkedin: https://www.linkedin.com/feed/update/urn:li:share:7414754649699672064/
---

<figure class="no-padding">
<img src="images/intervention.png" alt="A cartoon where JS is shown hanging out drinking with bundlers. Webpack is saying “just one more config!” and Vite and Rollup are saying “We can optimize this!”. The event looks like it's winding down after hours of depravity. On the right side, a group of fed up developers are holding up an “Intervention” banner.">
<figcaption>
No, this is not another rant about npm’s security issues.
</figcaption>
</figure>

**Abstraction** is the cornerstone of modern software engineering.
Reusing logic and building higher-level solutions from lower-level building blocks is what makes all the technological wonders around us possible.
Imagine if every time anyone wrote a calculator they also had to reinvent floating-point arithmetic and string encoding!

<aside class="pullquote">

> In healthy ecosystems dependencies are normal, cheap, and first-class.
> "Dependency-free" is not a badge of honor.

</aside>

And yet, **the web platform has outsourced this fundamental functionality to third-party tooling**.
As a result, code reuse has become a balancing of tradeoffs that should not have existed in the first place.

In NodeJS, you just `npm install` and reference specifiers straight away in your code.
Same in Python, with `pip install`.
Same in Rust with `cargo add`.
In healthy ecosystems you don't ponder how or whether to use dependencies.
The ecosystem assumes **dependencies are normal, cheap, and first-class**.
You just install them, use them, and move on.
**"Dependency-free" is not a badge of honor.**

Instead, dependency management in the web platform consists of **bits and bobs of scattered primitives, with no coherent end-to-end solution**.
Naturally, bundlers such as [Webpack](https://webpack.js.org/), [rollup](https://rollupjs.org/), and [esbuild](https://esbuild.github.io/) have picked up the slack, with [browserify](https://browserify.org/) being the one that started it all, in 2012.
<!-- more -->

There is **nothing wrong with bundlers** when used as a **performance optimization** to minimize waterfall effects and overhead from too many HTTP requests.
You know, what a _bundler_ is supposed to do.
It is okay to require **advanced tools for advanced needs**,
and performance optimization is generally an advanced use case.
Same for most other things bundlers and build tools are used for,
such as strong typing, linting, or transpiling.
All of these are needs that come much later than dependency management, both in a programmer’s learning journey, as well as in a project’s development lifecycle.

Dependency management is such a basic and ubiquitous need, it should be a part of the platform, decoupled from bundling.
Requiring **advanced tools for basic needs is a textbook [usability cliff](https://lea.verou.me/blog/2025/user-effort/#cliffs)**.
In other ecosystems, optimizations happen (and are learned) after dependency resolution.
**On the web, optimization is the price of admission!**
This is not normal.

Bundlers have become so ubiquitous that most JS developers cannot even imagine deploying code without them.
READMEs are written assuming a bundler, without even mentioning the assumption.
**It’s just how JS is consumed.**
My heart breaks for the newbie trying to use a drag and drop library, only to get mysterious errors about specifiers that failed to resolve.

However, bundling is not *technically* a necessary step of dependency management.
Importing files through URLs is natively supported in every browser, via ESM imports.
HTTP/2 makes importing multiple small files far more reasonable than it used to be — at least from a connection overhead perspective.
**You can totally get by without bundlers in a project that doesn't use any libraries.**

**But the moment you add that first dependency, everything changes.**
You are suddenly faced with a huge [usability cliff](https://lea.verou.me/blog/2025/user-effort/#cliffs):
which bundler to use, how to configure it, how to deploy with it, a mountain of decisions standing between you and your goal of using that one dependency.
That one drag and drop library.
For newcomers, this often comes very early in their introduction to the web platform, and it can be downright overwhelming.

## Dependencies without bundlers, today?

It *is* technically possible to use dependencies without bundlers, today.
There are a few different approaches, and — I will not sugarcoat it — **they all suck**.

There are three questions here:
1. Use specifiers or URLs?
2. How to resolve specifiers to URLs?
3. Which URL do my dependencies live at?

There is currently no good answer to any of them, only fragile workarounds held together by duct tape.

Using a dependency should not need any additional song and dance besides "install this package" + "now import it here".
That’s it.
That’s the [minimum necessary to declare intent](https://lea.verou.me/blog/2025/user-effort/#signal-to-noise).
And that’s *precisely* how it works in NodeJS and other JS runtimes.
Anything beyond that is reducing [signal-to-noise ratio](https://lea.verou.me/blog/2025/user-effort/#signal-to-noise), especially if it needs to be done separately for every project or worse, for every dependency.

You may need to have something to bite hard on while reading the next few sections.
It’s going to be _bad_.

### Rawdogging `node_modules/` imports

Typically, package managers like `npm` take care of deduplicating compatible package versions and may use a directory like `node_modules` to install packages.
**In theory, one could deploy `node_modules/`** as part of their website and directly reference files in client-side JS.
For example, to use [Vue](https://vuejs.org/):

```js
import { createApp } from "../node_modules/vue/dist/vue.esm-browser.js";
```

It works out of the box, and is a very natural thing to try the first time you install a package and you notice `node_modules`.
Great, right?

No. Not great.

First, deploying your entire `node_modules` directory is both **wasteful**, and a **security risk**. In fact, most serverless hosts (e.g. [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/)) automatically remove it from the publicly deployed files after the build is finished.

Additionally, it **violates encapsulation**: paths within a package are generally seen as an implementation detail of the package itself, and packages expose *specifier exports* like `vue` or `colorjs.io/fn` that _they_ map to internal paths.
If you decide to circumvent this and link to files directly, you now need to update your import paths whenever you update the package.

It is also fragile, as not every module is installed directly in `node_modules/` — though those explicitly marked as app dependencies are.

### Importing from public CDNs

Another common path is importing from CDNs like [Unpkg](https://unpkg.com/) and [JSDelivr](https://www.jsdelivr.com/).
For Vue, it would look like this:

```js
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
```

It’s quick and easy.
Nothing to install or configure!
Great, right?

No. Not great.

**It is always a bad idea to introduce a dependency on a whole other domain you do not control**, and an even worse one when linking to executable code.

First, there is the obvious security risk.
Unless you link to a specific version, down to the patch number and/or use [SRI](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity), the resource could turn malicious overnight under your nose if the package is compromised.
And even if you link to a specific version, there is always the risk that the CDN itself could get compromised.
Who remembers [polyfill.io](https://blog.qualys.com/vulnerabilities-threat-research/2024/06/28/polyfill-io-supply-chain-attack)?

But even supply-chain attacks aside, any third-party domain is an unnecessary **additional point of failure**.
I still remember scrambling to change [JSDelivr](https://www.jsdelivr.com/) URLs to [Unpkg](https://unpkg.com/) during an outage right before one of my talks, or having to hunt down all my repos that used [RawGit](https://rawgit.com/) URLs when it sunset, including many libraries.

The DX is also suboptimal.
**You lose the immediacy and resilience of local, relative paths.**
Without additional tooling ([Requestly](https://requestly.com/), `hosts` file edits, etc.), you now need to wait for CDN roundtrips even during local development.
Wanted to code on a flight?
Good luck.
Needed to show a live demo during a talk, over clogged conference wifi?
Maybe sacrifice a goat to the gods first.

And while they maintain encapsulation slightly better than raw file imports, as they let you reference a package by its name for its default export,
additional specifiers (e.g. `packagename/fn`) typically still require importing by file path.

_“But with public CDNs, I benefit from the resource having already been cached by another website the user visited!”_<br>
Oh my sweet summer child.
I hate to be the one to break it to you, but no, you don’t, and that has been the case [since about 2020](https://addyosmani.com/blog/double-keyed-caching/).
**_Double keyed caching_ obliterated this advantage**.

<aside class="info">
<h4>What is double keyed caching?</h4>

In case you were not aware, yes, your browser will **redownload every single resource** anew for every single website (origin) that requests it.
Yes, even if it’s exactly the same.
This changed to prevent [cross-site leaks](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XS-Leaks): malicious websites could exfiltrate information about your past network activity by measuring how long a resource took to download, and thus infer whether it was cached.

Those who have looked into this problem claim that there is no other way to prevent these timing attacks other than to actually redownload the resource.
No way for the browser to even fake a download by simply delaying the response.
Even requiring resources to opt-in (e.g. via CORS) was ruled out, the concern being that websites could then use it as a third-party tracking mechanism.

I personally have trouble accepting that such wasteful bandwidth usage was the best balance of tradeoffs for [all Web users](https://www.w3.org/TR/ethical-web-principles/#allpeople), including those in emerging economies and different locales[^finding].
It's not that I don’t see the risks — it’s that I am acutely aware of the cost,
a cost that is disproportionately borne by those not in the [Wealthy Western Web](https://www.smashingmagazine.com/2017/03/world-wide-web-not-wealthy-western-web-part-1/).

**How likely is it that a Web user in Zimbabwe, where [1 GB of bandwidth costs 17% of the median monthly income](https://bestbroadbanddeals.co.uk/mobiles/worldwide-data-pricing/), would choose to download React or nine weights of [Roboto](https://fonts.google.com/specimen/Roboto) thousands of times to avoid seeing personalized ads?**
And how patronizing is it for people in California to be making this decision for them?

[^finding]: In fact, when I was in the TAG, Sangwhan Moon and I [drafted a Finding](https://w3ctag.github.io/caching-bundling-sustainability/) on the topic, but the TAG never reached consensus on it.

</aside>

### `node_modules` imports locally + rewrite to CDN remotely

A quick and dirty way to get local URLs for local development and CDN URLs for the remote site is to  link to relative `./node_modules` URLs, and add a URL rewrite to a CDN if that is not found.
E.g. with [Netlify rewrites](https://docs.netlify.com/manage/routing/redirects/overview/) this looks like this:

```
node_modules/:modulename/* https://cdn.jsdelivr.net/npm/:modulename@latest/:splat 301
```

Since `node_modules` is not deployed, this will always redirect on the remote URL,
while still allowing for local URLs during development.
Great, right?

No. Not great.

Like the mythical hydra, it solves one problem and creates two new ones.

First, it still carries many of the same issues of the approaches it combines:
- Linking to CDNs is inherently insecure
- It breaks encapsulation of the dependencies

Additionally, it introduces a new problem: the two files need to match, but the naïve approach above would always just link to the latest version.

Sure, one could alleviate this by building the `_redirects` file with tooling, to link to specific versions, read from `package-lock.json`.
But the point is not that it’s insurmountable, but that **it should not be this hard**.

### Copy packages or exports to local directory

Another solution is a lightweight build script that copies either entire packages or specific exports into a directory that _will_ actually get deployed.
When dependencies are few, this can be as simple as an npm script:

```json
{
	"scripts": {
		"lib": "cp node_modules/vue/dist/vue.esm-browser.js common/lib/vue.js",
		"build": "npm run lib"
	}
}
```

So now we have our own nice subset of `node_modules/` and we don’t depend on any third-party domains.
Great, right?

No. Not great.

Just like most other solution, this still breaks encapsulation, forcing us to maintain a separate, ad-hoc index of specifiers to file paths.

Additionally, it has no awareness of the dependency graph. Dependencies of dependencies need to be copied separately.
But wait a second. Did I say dependencies of dependencies?
_How would that even work?_

## Dependencies that use dependencies

In addition to their individual flaws, _all_ of the solutions above share a major flaw: **they can only handle importing dependency-free packages**.
But what happens if the package you’re importing also uses dependencies?
It gets unimaginably worse my friend, that's what happens.

**There is no reasonable way for a library author to link to dependencies without excluding certain consumer workflows.**
There is no local URL a library author can use to reliably link to dependencies, and CDN URLs are highly problematic.
Specifiers are the only way here.

So the moment you include a dependency that uses dependencies, you’re **forced into specifier-based dependency management workflows**,
whether these are bundlers, or import map flavored JSON vomit in every single HTML page (discussed later).

### "Browser" bundles

As a fig leaf, libraries will often provide a "browser" bundle that consumers can import instead of their normal `dist`, which does not use specifiers.
This combines all _their_ dependencies into a single dependency-free file that you can import from a browser.
This means they can use whatever dependencies they want, and you can still import that bundle using regular ESM imports in a browser, sans bundler.
_Great, right?_

No. Not great.

It’s called a _bundle_ for a reason. It *bundles* all their dependencies too, and now they cannot be shared with any other dependency in your tree, even if it’s exactly the same version of exactly the same package.
**You’re not avoiding bundling, you’re outsourcing it**, and multiplying the size of your JS code in the process.

And if the library author has _not_ done that, you’re stuck with little to do, besides a CDN that rewrites specifiers on the fly like [esm.sh](https://esm.sh/), with all CDN downsides described above.

---

As someone who regularly releases open source packages ([some with billions of npm installs](https://npm-stat.com/charts.html?package=prismjs&from=2012-01-01)), I find this incredibly frustrating.
**I want to write packages that can be consumed by people using or not using bundlers, without penalizing either group**, but the only way to do that today is to basically not use any dependencies.
I cannot even modularize *my own* packages without running into this!
_This doesn't scale._

## But won't import maps solve all our problems?

Browsers _can_ import specifiers, as long as the mapping to a URL is explicitly provided through an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap).
Import maps look like this:

```html
<script type="importmap">
{
	"imports": {
		"vue": "./node_modules/vue/dist/vue.runtime.esm-bundler.js",
		"lodash": "./node_modules/lodash-es/lodash.js",
	}
}
</script>
```

Did you notice something?
Yes, this is an HTML block.
No, I cannot link to an import map that lives in a separate file.
Instead, I have to include the darn thing in. Every. Single. Page.
**The moment you decide to use JS dependencies, you now need an HTML templating tool as well.** 🙃

“💡 *Oh I know, I’ll generate this from my library via DOM methods!*” I hear you say.
~~No, my sweet summer child.
**It needs to be present at parse time.**
So unless you’re willing to `document.write()` it (please don't), the answer is a big flat NOPE.~~

**Edit:** Injecting import maps via DOM methods now works in all browsers! In fact, [JSPM 4.0](https://jspm.org/jspm-4.0-release) uses it! 🎉
This is a _gamechanger_.

“💡 *Ok, at least I’ll keep it short by routing everything through a CDN or the same local folder*”
No, my sweet summer child.
Go to sleep and dream of [globs](https://github.com/whatwg/html/issues/11919) and [URLPatterns](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern).
Then wake up and get to work, because you actually need to specify. Every. Single. Mapping.
Yes, transitive dependencies too.

<figure>

<img src="images/yo-dawg.png" alt="Yo dawg meme with the text “Yo Dawg, I heard you like dependencies, so I put the deps of your deps in your import maps”">
<img src="images/ursula-toll.png" alt="Ursula from The Little Mermaid singing “It’s sad, but true. If you want to use dependencies, my sweet you gotta pay the toll” to the tune of “Poor Unfortunate Souls”">

<figcaption>

**You wanted to use dependencies?
You will pay with your blood, sweat, and tears.**
Or, well, another build tool.
</figcaption>
</figure>

**So now I need a build tool to manage the import map**, like [JSPM](https://jspm.org/).
It also needs to talk to my HTML templating tool, which I now had to add so it can spit out these import maps on. Every. Single. HTML. Page.

There are three invariants that import maps violate:
1. **Locality**: Dependency declarations live in HTML, not JS. Libraries cannot declare their own dependencies.
2. **Composability**: Import maps do not compose across dependencies and require global coordination
3. **Scalability**: Mapping every transitive dependency is not viable without tooling

Plus, you still have all of the issues discussed above, because you still need URLs to link to.
**By trying to solve your problem with import maps, you now got multiple problems.**

To sum up, in their current form, **import maps don’t eliminate bundlers** — they recreate them in JSON form, while adding an HTML dependency and worse latency.

## Are bundlers the lesser evil?

Given the current state of the ecosystem, not using bundlers in any nontrivial application does seem like an exercise in masochism.
Indeed, per [State of JS 2024](https://2024.stateofjs.com/en-US/libraries/build_tools/), bundlers were extremely popular,
with Webpack having been used by 9 in 10 developers and having close to 100% awareness!
But sorting by sentiment paints a different picture, with satisfaction, interest, and positivity dropping year after year.
Even those who never question the status quo can feel it in their gut that this is not okay.
This is not a reasonable way to manage dependencies.
**This is not a healthy ecosystem.**

Out of curiosity, I also ran two polls on my own social media.
Obviously, this suffers from [selection bias](https://en.wikipedia.org/wiki/Selection_bias), due to the [snowball sampling](https://en.wikipedia.org/wiki/Snowball_sampling) nature of social media, but I was still surprised to see such a high percentage of bundle-less JS workflows:
- [Twitter/X poll](https://x.com/LeaVerou/status/2008341499461743048): 17.6% of respondents
- [Mastodon poll](https://front-end.social/@leaverou/115840120189230465): 40% (!) of respondents

I’m very curious how these folks manage the problems discussed here.

Oftentimes when discussing these issues, I get the question "but other languages are completely compiled, why is it a problem here?".
**Yes, but their compiler is official and always there.**
You literally can't use the language without it.

**The problem is not compilation, it’s fragmentation.**
It's the experience of linking to a package via a browser import only to see errors about specifiers.
It's adding mountains of config and complexity to use a utility function.
It's having no clear path to write a package that uses another package, even if both are yours.

**Abstraction itself is not something to outsource** to third-party tools.
This is the programming equivalent of privatizing fundamental infrastructure — roads, law enforcement, healthcare — systems that work precisely because everyone can rely on them being there.

Like [boiling frogs](https://en.wikipedia.org/wiki/Boiling_frog), **JS developers have resigned themselves to immense levels of complexity and gruntwork** as simply *how things are*.
The rise of AI introduced swaths of less technical folks to web development and their overwhelm and confusion is forcing us to take a long hard look at the current shape of the ecosystem — and it's not pretty.

Few things must always be part of a language’s standard library, but dependency management is absolutely one of them.
Any cognitive overhead should be going into deciding _which_ library to use, not *whether* to include it and *how*.

This is also actively **harming web platform architecture**.
Because bundlers are so ubiquitous, we have ended up designing the platform around them, when it should be the opposite.
For example, because `import.meta.url` is unreliable when bundlers are used, components have no robust way to link to other resources (styles, images, icons, etc.) relative to themselves, unless these resources can be part of the module tree.
So now we are adding features to the web platform that break any reasonable assumption about what HTML, CSS, and JS are, like JS imports for CSS and HTML, which could have been a simple `fetch()` if web platform features could be relied on.

And because using dependencies is nontrivial, we are adding features to the standard library that could have been userland or even browser-provided dependencies.

To reiterate, **the problem isn’t that bundlers exist** — it’s that they are the only viable way to get first-class dependency management on the web.

**JS developers deserve better. The web platform deserves better.**

## Where do we go from here?

As a web standards person, my first thought when spotting such a lacking is "how can the web platform improve?".
And after four years in the [TAG](https://en.wikipedia.org/wiki/Technical_Architecture_Group), I cannot shake the holistic architectural perspective of ***"which part of the Web stack is best suited for this?"***

### Specifiers vs URLs

Before we can fix this, we need to understand why it is the way it is.
**What is the fundamental reason the JS ecosystem overwhelmingly prefers specifiers over URLs?**

On the surface, people often quote syntax, but that seems to be a red herring.
There is little DX advantage of `foo` (a specifier) over `./foo.js` (a URL), or even `./foo` (which can be configured to have a JS MIME type).
Another oft-cited reason is immutability: Remote URLs can change, whereas specifiers cannot.
This also appears to be a red herring: local URLs can be just as immutable as specifiers.

Digging deeper, it seems that the more fundamental reason has to do with **purview**.
A URL is largely the same everywhere, whereas `foo` can resolve to different things depending on context.
A specifier is app-controlled whereas a URL is not.
**There needs to be a standard location for a dependency to be located and referenced from, and that needs to be app-controlled.**

Additionally, **specifiers are universal**.
Once a package is installed, it can be imported from anywhere, without having to work out paths.
The closest HTTP URLs can get to this is root-relative URLs, and that’s still not quite the same.

Specifiers are clearly the path of least resistance here, so the low hanging fruit would be to make it easier to map specifiers to URLs, starting by improving import maps.

### Improving import maps

An area with huge room for improvement here is **import maps**. Both making it easier to generate and include import maps, and making the import maps themselves smaller, leaner, and easier to maintain.

#### External import maps

The biggest need here is **external import maps**, even if it's only via `<script type=importmap src>`.
This would eliminate the dependency on HTML templating and opens the way for generating them with a simple build tool.

This was actually [part of the original import map work](https://github.com/WICG/import-maps/issues/235), and was removed from the spec due to lack of implementer interest, despite overwhelming demand.
In 2022, external import maps were prototyped in WebKit (Safari), which prompted [a new WHATWG issue](https://github.com/whatwg/html/issues/8355).
Unfortunately, it appears that progress has since stalled once more.

#### Import maps without HTML?

External import maps do alleviate some of the core pain points, but are still globally managed in HTML, which hinders composability and requires heavier tooling.

[What if import maps could be imported into JS code?](https://es.discourse.group/t/bringing-import-maps-to-js-import-importmap-json-with-type-importmap/2481)
If JS could import import maps, (e.g. via `import "map.json" with { type: "importmap" }`), this would  eliminate the dependency on HTML altogether, allowing for scripts to localize their own import info,
and for the graph to be progressively composed instead of globally managed.

**Edit:** Injecting import maps via DOM methods now works in all browsers! 🎉
This alleviates the need for external import maps as [a regular JS file](https://jspm.org/jspm-4.0-release#:~:text=into%20the%20browser%3A-,importmap.js,-(map%20%3D%3E%20%7B%0A%20%20document.head) can just inject them.

#### Import maps via HTTP header?

Going further, import maps via an HTTP header (e.g. `Link`) would even allow webhosts to generate them for you and send them down the wire completely transparently.
**This could be the final missing piece for making dependencies truly first-class.**

Imagine a future where you just install packages and use specifiers without setting anything up, without compiling any files into other files, with **the server transparently handling the mapping**!

### Deploying dependencies to URLs

However, import maps need URLs to map specifiers to, so we also need some way to deploy the relevant subset of `node_modules` to public-facing URLs, as deploying the entire `node_modules` directory is not a viable option.

#### `clientDependencies` in `package.json`?

One solution might be [a way to explicitly mark dependencies as client side](https://github.com/openjs-foundation/package-metadata-interoperability-collab-space/issues/49), possibly even specific exports.
This would decouple detection from processing app files: in complex apps it can be managed via tooling, and in simple apps it could even be authored manually, since it would only include top-level dependencies.

### Figuring out the dependency graph

Even if we had better ways to mark which dependencies are client-side and map specifiers to URLs, these are still pieces of the puzzle, not the entire puzzle.
Without a way to figure out what depends on what, transitive dependencies will still need to be managed globally at the top level, defeating any hope of a tooling-light workflow.

The current system relies on reading and parsing thousands of `package.json` files to build the dependency graph.
This is reasonable for a JS runtime where the cost of file reads is negligible, but not for a browser where HTTP roundtrips are costly.
And even if it were, this does not account for any tree-shaking.

#### Defining specifiers as a type of URL?

Think of how this works when using URLs: modules simply link to other URLs and the graph is progressively composed through these requests.
What if specifiers could work the same way?
What if we could look up and route specifiers when they are actually imported?

Here's a radical idea: **What if specifiers were just another type of URL**, and specifier resolution could be handled by the server in the same way a URL is resolved when it is requested?
They could use a `specifier:` protocol, that can be omitted in certain contexts, such as ESM imports.

How would these URLs be different than regular local URLs?
- Their protocol would be implied in certain contexts — that would be how we can import bare specifiers in ESM
- Their resolution would be customizable (e.g. through import maps, or even regular URL rewrites)
- Despite looking like absolute URLs, their resolution would depend on the request’s `Origin` header (thus allowing different modules to use different versions of the same dependency). A request to a `specifier:` URL without an `Origin` header would fail.
- HTTP caching would work differently; basically in a way that emulates the current behavior of the JS module cache.

Architecturally, this has several advantages:
- It **bridges the gap between specifiers and URLs**. Rather than having two entirely separate primitives for linking to a resource, it makes specifiers a high-level primitive and URLs the low-level primitive that explains it.
- It allows **retrofitting specifiers into parts of the platform** that were not designed for them, such as CSS `@import`. This is not theoretical: I was at a session at TPAC where bringing specifiers to CSS was discussed. With this, every part of the platform that takes URLs can now utilize specifiers, it would just need to specify the protocol explicitly.

Obviously, this is just a loose strawman at this point, and would need a lot of work to turn into an actual proposal (which I'd be happy to help out with, with [funding](/consulting/webplatform/)), but I suspect we need some way to bridge the gap between these two fundamentally different ways to import modules.

Too radical? Quite likely.
But abstraction is foundational, and you often need radical solutions to fix foundational problems.
Even if this is not the right path, I doubt incremental improvements can get us out of this mess for good.

But in the end, **this is about the problem**.
I’m much more confident that the _problem_ needs solving, than I am of any particular solution.
Hopefully, after reading this, so are you.

So this is a call to action for the community.
To browser vendors, to standards groups, to individual developers.
**Let’s fix this!** 💪🏼

*Thanks to [Jordan Harband](https://github.com/ljharb), [Wes Todd](https://www.wesleytodd.com/), and [Anne van Kesteren](https://annevankesteren.nl/) for reviewing earlier versions of this draft.*
