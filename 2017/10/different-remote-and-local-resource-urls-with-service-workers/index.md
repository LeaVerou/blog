---
title: "Different remote and local resource URLs, with Service Workers!"
date: "2017-10-30"
categories:
  - "original"
  - "tips"
tags:
  - "js"
  - "service-workers"
---

I often run into this issue where I want a different URL remotely and a different one locally so I can test my local changes to a library. Sure, relative URLs work a lot of the time, but are often not an option. Developing [Mavo](http://lea.verou.me/2017/05/introducing-mavo-create-web-apps-entirely-by-writing-html/) is yet another example of this: since Mavo is in a separate repo from [mavo.io](https://mavo.io) (its website) as well as [test.mavo.io](https://test.mavo.io) (the testsuite), I can't just have relative URLs to it that also work remotely. I've been encountering this problem way too frequently pretty much since I started in web development. In this post, will describe all solutions and workarounds I've used over time for this, including the one I'm currently using for Mavo: Service Workers!

### The manual one

Probably the first solution everyone tries is doing it manually: every time you need to test, you just change the URL to a relative, local one and try to remember to change it back before committing. I still use this in some cases, since us developers are a lazy bunch. Usually I have both and use my editor's (un)commenting shortcut for enabling one or the other:

```markup
<script src="https://get.mavo.io/mavo.js"></script>
<!--<script src="../mavo/dist/mavo.js"></script>-->
```

However, as you might imagine, this approach has several problems, the worst of which is that more than once I forgot and committed with the active script being the local one, which resulted in the remote website totally breaking. Also, it's clunky, especially when it's two resources whose URLs you need to change.

### The JS one

This idea uses a bit of JS to load the remote URL when the local one fails to load.

```markup
<script src="http://localhost:8000/mavo/dist/mavo.js" onerror="this.src='https://get.mavo.io/mavo.js'"></script>
```

This works, and doesn't introduce any cognitive overhead for the developer, but the obvious drawback is that it slows things down for the server since a request needs to be sent and fail before the real resource can be loaded. Slowing things down for the local case might be acceptable, even though undesirable, but slowing things down on the remote website for the sake of debugging is completely unacceptable. Furthermore, this exposes the debugging URLs in the HTML source, which gives me a bit of a knee jerk reaction.

A variation of this approach that doesn’t have the performance problem is:

```markup
<script>
{
 let host = location.hostname == "localhost"? 'http://localhost:8000/dist' : 'https://get.mavo.io';
 document.write(`<script src="${host}/mavo.js"></scr` + `ipt>`);
}
</script>
```

This works fine, but it's very clunky, especially if you have to do this multiple times (e.g. on multiple testing files or demos).

### The build tools one

The solution I was following up to a few months ago was to use gulp to copy over the files needed, and then link to my local copies via a relative URL. I would also have a gulp.watch() that monitors changes to the original files and copies them over again:

```javascript
gulp.task("copy", function() {
	gulp.src(["../mavo/dist/**/*"])
		.pipe(gulp.dest("mavo"));
});

gulp.task("watch", function() {
	gulp.watch(["../mavo/dist/*"], ["copy"]);
});
```

This worked but I had to remember to run `gulp watch` every time I started working on each project. Often I forgot, which was a huge source of confusion as to why my changes had no effect. Also, it meant I had copies of Mavo lying around on every repo that uses it and had to manually update them by running `gulp`, which was suboptimal.

### The Service Worker one

In April, after being fed up with having to deal with this problem for over a decade, I posted [a tweet](https://twitter.com/LeaVerou/status/857030863292436480):

https://twitter.com/LeaVerou/status/857030863292436480?ref_src=twsrc%5Etfw

[@MylesBorins](https://twitter.com/MylesBorins) replied (though his tweet seems to have disappeared) and suggested that perhaps Service Workers could help. In case you’ve been hiding under a rock for the past couple of years, [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) are a new(ish) API that allows you to intercept requests from your website to the network and do whatever you want with them. They are mostly promoted for creating good offline experiences, though they can do a lot more.

I was looking for an excuse to dabble in Service Workers for a while, and this was a great one. Furthermore, browser support doesn't really matter in this case because the Service Worker is only used locally.

The code I ended up with looks like this in a small script called `sitewide.js`, which, as you may imagine, is used sitewide:

```javascript
(function() {

if (location.hostname !== "localhost") {
	return;
}

if (!self.document) {
	// We're in a service worker! Oh man, we’re living in the future! ??
	self.addEventListener("fetch", function(evt) {
		var url = evt.request.url;

		if (url.indexOf("get.mavo.io/mavo.") > -1 || url.indexOf("dev.mavo.io/dist/mavo.") > -1) {
			var newURL = url.replace(/.+?(get|dev)\.mavo\.io\/(dist\/)?/, "http://localhost:8000/dist/") + "?" + Date.now();

			var response = fetch(new Request(newURL), evt.request)
				.then(r => r.status < 400? r : Promise.reject())
				// if that fails, return original request
				.catch(err => fetch(evt.request));

			evt.respondWith(response);
		}
	});

	return;
}

if ("serviceWorker" in navigator) {
	// Register this script as a service worker
	addEventListener("load", function() {
		navigator.serviceWorker.register("sitewide.js");
	});
}


})();
```

So far, this has worked more nicely than any of the aforementioned solutions and allows me to just use the normal remote URLs in my HTML. However, it’s not without its own caveats:

- Service Workers are only activated on a cached pageload, so the first one uses the remote URL. This is almost never a problem locally anyway though, so I'm not concerned about it much.
- The same origin restriction that service workers have is fairly annoying. So, I have to copy the service worker script on every repo I want to use this on, I cannot just link to it.
- It needs to be explained to new contributors since most aren't familiar with Service Workers and how they work at all.

Currently the URLs for both local and remote are baked into the code, but it's easy to imagine a mini-library that takes care of it as long as you include the local URL as a parameter (e.g. `https://get.mavo.io/mavo.js?local=http://localhost:8000/dist/mavo.js`).

### Other solutions

Solutions I didn't test (but you may want to) include:

- `.htaccess` redirect based on domain, suggested by [@codepo8](https://twitter.com/codepo8). I don't use Apache locally, so that's of no use to me.
- Symbolic links, suggested by [@aleschmidx](https://twitter.com/aleschmidx)
- User scripts (e.g. Greasemonkey), suggested by [@WebManWlkg](https://twitter.com/WebManWlkg)
- Modifying the hosts file, suggested by [@LukeBrowell](https://twitter.com/LukeBrowell) (that works if you don't need access to the remote URL at all)

Is there any other solution? What do you do?
