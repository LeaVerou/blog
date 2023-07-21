---
title: "Refresh CSS Bookmarklet v2"
date: "2018-09-18"
tags:
  - "articles"
  - "releases"
  - "bookmarklets"
  - "js"
defaultLanguage: "js"
---

Almost 11 years ago, [Paul Irish posted this brilliant bookmarklet](https://www.paulirish.com/2008/how-to-iterate-quickly-when-debugging-css/) to refresh all stylesheets on the current page. Despite the amount of tools, plugins, servers to live reload that have been released over the years, I've always kept coming back to it. It's incredibly elegant in its simplicity. It works everywhere: locally or remotely, on any domain and protocol. No need to set up anything, no need to alter my process in any way, no need to use a specific local server or tool. It quietly just accepts your preferences and workflow instead of trying to change them. Sure, it doesn't automatically detect changes and reload, but in most cases, I don’t want it to.

I've been using this almost daily for a decade and there's always been one thing that bothered me: It doesn't work with iframes. If the stylesheet you’re editing is inside an iframe, tough luck. If you can open the frame in a new tab, that works, but often that's nontrivial (e.g. the frame is dynamically generated). After dealing with this issue today once more, I thought "this is just a few lines of JS, why not fix it?".

The first step was to get Paul’s code in a readable format, since the bookmarklet is heavily minified:

```
(function() {
	var links = document.getElementsByTagName('link');
	for (var i = 0; i < links.length; i++) {
		var link = links[i];
		if (link.rel.toLowerCase().match(/stylesheet/) && link.href) {
			var href = link.href.replace(/(&|%5C?)forceReload=\d+/, '');
			link.href = href + (href.match(/\?/) ? '&' : '?') + 'forceReload=' + (new Date().valueOf())
		}
	}
})()
```

Once I did that, it became obvious to me that this could be shortened a lot; the last 10 years have been wonderful for JS evolution!

```
(()=>{
	for (let link of Array.from(document.querySelectorAll("link[rel=stylesheet][href]"))) {
		var href = new URL(link.href, location);
		href.searchParams.set("forceReload", Date.now());
		link.href = href;
	}
})()
```

Sure, this reduces browser support a bit (most notably it excludes IE11), but since this is a local development tool, that's not such a big problem.

Now, let’s extend this to support iframes as well:

```
{
	let $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

	let refresh = (document) => {
		for (let link of $$("link[rel=stylesheet][href]", document)) {
			let href = new URL(link.href);
			href.searchParams.set("forceReload", Date.now());
			link.href = href;
		}

		for (let iframe of $$("iframe", document)) {
			iframe.contentDocument && refresh(iframe.contentDocument);
		}
	}

	refresh();
}
```

That’s it! Do keep in mind that this will not work with cross-origin iframes, but then again, you probably don’t expect it to in that case.

Now all we need to do to turn it into a bookmarklet is to prepend it with `javascript:` and minify the code. Here you go:

[Refresh CSS](javascript:{let e=(e,t=document)=>Array.from(t.querySelectorAll(e)),t=r=>{for(let t of e('link[rel=stylesheet][href]',r)){let e=new URL(t.href);e.searchParams.set('forceReload',Date.now()),t.href=e}for(let o of e('iframe',r))o.contentDocument&&t(o.contentDocument)};t()})

Hope this is useful to someone else as well :) Any improvements are always welcome!

#### Credits

- Paul Irish, for the original bookmarklet
- Maurício Kishi, for making the iframe traversal recursive ([comment](http://lea.verou.me/2018/09/refresh-css-bookmarklet-v2/#comment-4102700684))
