---
title: "URL rewriting with Github Pages"
date: "2016-11-26"
tags:
  - "original"
  - "tips"
  - "css-secrets"
  - "github"
  - "github-pages"
---

[![redirect](images/redirect-300x167.png)](images/redirect.png)I adore [Github Pages](https://pages.github.com/). I use them for everything I can, and try to avoid server-side code like the plague, exactly so that I can use them. The convenience of pushing to a repo and having the changes immediately reflected on the website with no commit hooks or any additional setup, is awesome. The free price tag is even more awesome. So, when the time came to publish [my book](https://www.amazon.com/CSS-Secrets-Solutions-Everyday-Problems/dp/1449372635/), naturally, I wanted the companion website to be on Github Pages.

There was only one small problem: I wanted nice URLs, like [http://play.csssecrets.io/pie-animated](http://play.csssecrets.io/pie-animated), which would redirect to demos on [dabblet.com](https://dabblet.com). Any sane person would have likely bitten the bullet and used some kind of server-side language. However, I'm not a particularly sane person :D

Turns out [Github uses some URL rewriting of its own on Github Pages](https://help.github.com/articles/creating-a-custom-404-page-for-your-github-pages-site/): If you provide a 404.html, any URL that doesn't exist will be handled by that. Wait a second, is that basically how we do nice URLs on the server anyway? We can do the same in Github Pages, by just running JS inside 404.html!

So, I created [a JSON file](https://github.com/LeaVerou/play.csssecrets.io/blob/gh-pages/secrets.json) with all demo ids and their dabblet URLs, a [404.html](https://github.com/LeaVerou/play.csssecrets.io/blob/gh-pages/404.html) that shows either a redirection or an error (JS decides which one) and [a tiny bit of Vanilla JS](https://github.com/LeaVerou/play.csssecrets.io/blob/gh-pages/redirect.js) that reads the current URL, fetches the JSON file, and redirects to the right dabblet. Here it is, without the helpers:

```js
(function(){

document.body.className = 'redirecting';

var slug = location.pathname.slice(1);

xhr({
	src: 'secrets.json',
	onsuccess: function () {
		var slugs = JSON.parse(this.responseText);

		var hash = slugs[slug];

		if (hash) {
			// Redirect
			var url = hash.indexOf('http') == 0? hash : 'https://dabblet.com/gist/' + hash;
			$('section.redirecting > p').innerHTML = 'Redirecting to <a href="' + url + '">' + url + '</a>…';
			location.href = url;
		}
		else {
			document.body.className = 'error not-found';
		}
	},
	onerror: function () {
		document.body.className = 'error json';
	}
});

})();
```

That's all! You can imagine using the same trick to redirect to other HTML pages in the same Github Pages site, have proper URLs for a single page site, and all sorts of things! Is it a hack? Of course. But when did that ever stop us? :D
