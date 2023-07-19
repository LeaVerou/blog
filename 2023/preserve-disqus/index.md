---
title: Migrating Disqus from WP to 11ty
date: 2023-07-18
toc: true
tags:
  - meta
  - 11ty
---

So I recently [ported my 14 year old blog from WordPress to Eleventy](/blog/2023/going-lean/).

I had been using [Disqus](https://disqus.com) for comments for years, so I didn’t want to lose them, even if I ended up using a different solution for the future (or no comments at all).

Looking around for an existing solution did not yield many results.
There’s Zach’s [eleventy-import-disqus](https://github.com/11ty/eleventy-import-disqus) but it's aimed at importing Disqus comments as static copies,
but I wanted to have the option to continue using Disqus.

Looking at the WP generated HTML source, I noticed that Disqus was using the WP post id (a number that is not displayed in the UI) to link its threads to the posts.
However, the importer I used did not preserve the post ids as metadata (filed issue [#95](https://github.com/lonekorean/wordpress-export-to-markdown/issues/95)).
What to do?

## Getting the WP post id

My first thought was to add the post id to each post manually, but use a `HEAD` request to my existing blog to read it from the `Link` header, possibly en masse.
My second thought was, if I can use JS to get it, maybe I can include Disqus dynamically, through JS, after it procures this number.
Then I remembered that 11ty can handle any number of different data sources, and combines them all into a single data object.
If I could build an index of slug → post id as another data file, I could add a post id via JS in the 11ty config.

My last epiphany was realizing I didn’t need any HTTP requests to get the post id: it was all in the exported sitemap XML, just unused by the importer!
Indeed, each `<item>` included a `<wp:post_id>` element with the post id and a `<link>` element with the URL.
I tried to open it in Chrome so I could run some JS on it and build the index, but it complained of parse errors.
When I fixed them, the tab crashed under its sheer size.

I needed to remove non-relevant data, and I needed to do it fast.
All I really needed was the post id, the slug, and the containing `<item>` element.
Since this did not just contain posts, but also other types of content, such as attachments or custom blocks,
we also needed to retain `<wp:post_type>` so we can filter these out.
I copied the XML over to a separate file, and run a series of find & replaces in VS Code:

1. `^(?!.*(wp:post_id|wp:post_type|</?item>|</?link>)).+\n` (regex) with empty string
2. `\n{3,}` (regex) with `\n` (to remove empty lines)
3. `wp:post` with `post` to remove namespaces and make the XML easier to handle
4. `https://lea.verou.me/` with empty string and `</link>` with `</link>` to keep just the `yyyy/mm/slug` part of the URL

Then added `<?xml version="1.0" encoding="UTF-8" ?>` at the top and wrapped everything in a `<root>` element to make it valid XML.

This resulted in a series of `<item>` elements that looked like this:

```xml
<item>
	<link>2023/04/private-fields-considered-harmful</link>
	<post_id>3599</post_id>
	<post_type><![CDATA[post]]></post_type>
</item>
<item>
	<link>2023/04/private-fields-considered-harmful/image-27</link>
	<post_id>3600</post_id>
	<post_type><![CDATA[attachment]]></post_type>
</item>
```

At this point, we have exuahsted the capabilities of find & replace; it’s time for some JS!

I opened the file in Chrome and ran:

```js
copy(Object.assign({}, ...[...document.querySelectorAll("item")]
	.filter(item => item.querySelector("post_type").textContent === "post")
	.map(item => ({ [item.querySelector("link").textContent]: item.querySelector("post_id").textContent } ))));
```

which copies JSON like this to the clipboard, ready to be pasted in a JSON file (I used `wpids.json`):

```json
{
	...
	"2022/11/tag-2": "3531",
	"2023/03/contrast-ratio-new-home": "3592",
	"2023/04/private-fields-considered-harmful": "3599"
}
```

Some cleanup was still needed, but this was basically good to go.

## Adding the post id to the posts

To inject a `wpid` property to each post, I added a `blog.11tydata.js` file with the following:

```js
module.exports = {
	eleventyComputed: {
		postUrlStem: data => {
			return data.page.filePathStem.replace(/^\/blog\/|\/index$/g, "");
		},
		wpid: data => {
			return data.wpids[data.postUrlStem];
		}
	}
};
```

## Linking to Disqus

We now have the post id, and we can use it in our template.
Adapting the code from the [Universal Embed Code](https://help.disqus.com/en/articles/1717112-universal-embed-code), we get:
{% raw %}
```html
{% if wpid %}
<div id="disqus_thread"></div>
<script>
    /**
     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT
     *  THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR
     *  PLATFORM OR CMS.
     *
     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT:
     *  https://disqus.com/admin/universalcode/#configuration-variables
     */

    var disqus_config = function () {
        // Replace PAGE_URL with your page's canonical URL variable
        this.page.url = 'https://lea.verou.me/{{ postUrlStem }}/';

        // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        this.page.identifier = "{{ wpid }} https:\/\/lea.verou.me\/?p={{ wpid }}";
    };

    (function() {  // REQUIRED CONFIGURATION VARIABLE: EDIT THE SHORTNAME BELOW
        var d = document, s = d.createElement('script');

        // IMPORTANT: Replace EXAMPLE with your forum shortname!
        s.src = 'https://leaverou.disqus.com/embed.js';

        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
</script>
{% endif %}
```
{% endraw %}
That’s it! This now works and displays the Disqus threads correctly!


## Using Disqus on new posts as well

Note that as it currently stands, this will not display the Disqus UI on new posts, since they won’t have a wpid.
Even if I switch to something else in the future, Disqus is better than nothing meanwhile
(for me -- many people would disagree: switching to no comments at all seems very common when people switch to a SSG blog).

So, new posts don't have a wpid, but they don’t need one either.
As long as we pass *some* kind of unique identifier to Disqus, we have a comment thread.
The easiest way to do this is to use the post’s path, e.g. `2023/preserve-disqus` for this one, as this is guaranteed to be unique.

We also want to be able to disable comments on a per-post basis, so we need a way to do that.

So instead of dealing with `wpid` directly in templates, I added another computed property in `blog.11tydata.js`:

```js
disqus_id: data => {
	let wpid = data.wpid;

	if (wpid) {
		return `${ wpid } https:\/\/lea.verou.me\/?p=${ wpid }`;
	}
	else if (data.disqus !== false) {
		return typeof data.disqus !== "string"? data.postUrlStem : data.disqus;
	}
}
```

Note that this allows us to pass a custom identifier to Disqus by using a string, disable it by using `false`,
or just get the automatic behavior by using `true` or not specifying it at all.
The custom identifier can be useful if we want to change the URL of a post without losing the comments.

Then, I updated the [template](https://github.com/LeaVerou/lea.verou.me/blob/main/_includes/_comments.njk) to use `disqus_id` instead of `wpid`.

## What’s next?

I don’t know if I will continue using Disqus.
It’s convenient, but also heavyweight, and there are [privacy](https://techcrunch.com/2021/05/05/disqus-facing-3m-fine-in-norway-for-tracking-users-without-consent/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAHcgs5Gn_4eXhly4z1yjLi-xZ4abvUmjbEhqVoOgZ_FhBpI1n7zuyLL5p16rDFxCIAq3OJDon93aKZhebse8Qy4pPfthRfLOkmBFoFImhyLr5jgmJl42mvmpmRojuqX6w3hIe9_GJl3zGTb-dVLY3ZTA-VMce3cG4UOL5xeeGNu6) [concerns](https://fatfrogmedia.com/delete-disqus-comments-wordpress/) [around](https://www.reddit.com/r/privacy/comments/egb1ey/disqus_shared_personal_data_about_tens_of/) it.

However, I’m not sure what I would use instead.
Any third party SaaS service would have the same privacy issues. Not necessarily now, but quite likely in the future.

I’ve looked into [Webmentions](https://en.wikipedia.org/wiki/Webmention), but the end-user experience does not compare to a regular comment system,
and it seems like quite a hassle to implement.

[Utterances](https://utteranc.es/) is a really cool idea: it uses GitHub issues as a backend for a comment system.
Having myself (ab)used the GitHub API as a storage backend many a times (even [as early as 2012](/2011/12/introducing-dabblet-an-interactive-css-playground/)), I can see the appeal.
This may be a viable path forwards, though I need to verify that GitHub Issues can be easily exported, so that I’m not locked in.

I would have loved some way to simply collect the discussions about the post from various social media and display them underneath,
but with their API prices getting out of control ([1](https://www.theverge.com/2023/3/30/23662832/twitter-api-tiers-free-bot-novelty-accounts-basic-enterprice-monthly-price) [2](https://www.theverge.com/2023/5/31/23743993/reddit-apollo-client-api-cost)), that doesn’t seem feasible.

If there are any options I missed, please let me know in the (Disqus, for now 😕) comments!