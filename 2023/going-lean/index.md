---
title: "Going Lean"
date: "2023-07-10"
---

{% raw %}
WordPress has always been with me since my very first post in 2009.
There is a lot to love about it: It’s open source, it has a thriving ecosystem, a lovely default theme, and a block editor that makes my inner UX geek giddy.
Plus, it makes building a website and publishing content accessible to everyone.
No wonder it’s [the most popular CMS in the world](https://almanac.httparchive.org/en/2022/cms#most-popular-cmss), by a huge margin.

However, for me, the bad had started to outweigh the good.
Things I could do in minutes in a static site, required finding (or writing) a plugin in WP.
It was slow and bloated.
Getting a draft out of WP and into another medium was a pain.
Despite having never been hacked, I was terrified about security, especially once it started demanding a higher PHP version than what I had.
I was periodically getting "Error establishing a database connection" errors, whose frequency kept increasing.
It was time to move on.
It’s not you WP, it’s me.

I had been using Eleventy for a while at that point and loved it, so it was a no-brainer.
In fact, my blog was my last remaining non-JAMstack site.
I had built a [simple 11ty blog for my husband](https://svgees.us/blog/) a year ago, and was almost jealous of the convenience and simplicity.
There are so many conveniences that just come for free with this workflow: git, Markdown, custom components, even GitHub Copilot as you write your prose!
And if you can make the repo public, oooooh, the possibilities! People could even file PRs and issues for your blog posts!

However, I was dreading the amount of work it would take to migrate 13 years of content, plugins, and styling.
The stroke that broke the camel’s back was a particularly bad db outage.
I [tweeted](https://twitter.com/LeaVerou/status/1652166572335587329) about my frustration, but I had already made up my mind.

I reviewed the list of plugins I had installed on WP to estimate the amount of work.
They literally all fell in one of two categories:
1. Solving problems I wouldn't have if I wasn't using WP (e.g. SVG support)
2. Giving me benefits I could get with a single line of code in 11ty (e.g. Prism syntax highlighting)

This could actually work!

## Migrating content from WordPress to Markdown

The title of this section says "to Markdown" because that’s one of the benefits of this approach:
static site generators are largely compatible with each other, so if I ever needed to migrate again, it would be much easier.

Thankfully, travelers on this road before me had already paved it.
Many open source scripts out there to migrate WP to Markdown!
The one that worked well for me was [lonekorean/wordpress-export-to-markdown](https://github.com/lonekorean/wordpress-export-to-markdown)
(though I later discovered there’s [a more updated fork](https://github.com/flowershow/wordpress-to-markdown) now)

It was still a bumpy road. First, it kept getting stuck on parsing the WP XML export, specifically in comments.
I use Disqus for comments, but it mirrors comments in the internal WP system.
Also, WP seems to continue recording trackbacks even if they are not displayed anywhere.
Turns out I had hundreds of thousands of spam trackbacks, which I spent hours cleaning up (it was quite a meditative experience).
In the end I got the total comments + trackbacks from 290K down to 26K which reduced the size of the XML export from 210 MB to a mere 31 MB.
This did not fix the parsing issue, but allowed me to simply open the file and delete the problematic comments manually.
It also fixed the uptime issues I was having: I never got another "Error establishing a database connection" error after that, despite taking my sweet time to migrate.
Ideally, I wish WP had an option to export without comments, but I guess that’s not a common use case.

While this importer is great, and allowed me to configure the file structure in a way that preserved all my URLs, I did lose a few things:

- "Read more" separators (filed it as [issue #93](https://github.com/lonekorean/wordpress-export-to-markdown/issues/93))
- Figures (they are imported as just images with text underneath) (filed it as [issue #94](https://github.com/lonekorean/wordpress-export-to-markdown/issues/94))
- Drafts ([#16](https://github.com/lonekorean/wordpress-export-to-markdown/issues/16))
- Pages (I had to manually copy them over, but it was only a handful)
- Any custom HTML (e.g. a `"view-demo"` class I used to create "call to action" links) was gone

Also, it downloaded all images, but did not update the URLs in the Markdown files.
This was easy to fix with a regex find and replace from `https?://lea.verou.me/wp-content/uploads/(\d{4}/\d{2})/([\w\.-]+\.(?:png|gif|jpe?g))` to `images/$2`.
It also did not download any other uploads, e.g. zip files. Thankfully, these were only a couple, so I could detect and port over manually.

## Hiatus

More than two months passed between the previous and the next section.
I got way too busy with other things, and I was also dreading the next step: migrating comments.
However, I also didn’t want to post anything to the old WP instance, as I would have to then port it manually.
This effectively meant I was stuck in a limbo, unable to post anything, despite the many ideas about blog posts that I had.
Eventually, the desire to blog again prevailed, and I moved on to the next step.

## Migrating comments

I had been using Disqus for comments for years, so I didn’t want to lose them, even if I ended up using a different solution for the future (or no comments at all).

Looking around for an existing solution did not yield many results.
There’s Zach’s [eleventy-import-disqus](https://github.com/11ty/eleventy-import-disqus) but it's aimed at importing Disqus comments as static copies,
but I wanted to have the option to continue using Disqus.

Looking at the WP generated HTML source, I noticed that Disqus was using the WP post id (a number that is not displayed in the UI) to link its threads to the posts.
However, the importer I used did not preserve the post ids as metadata (filed issue [#95](https://github.com/lonekorean/wordpress-export-to-markdown/issues/95)).
What to do?

### Getting the WP post id

My first thought was to add the post id to each post manually, but use a `HEAD` request to my existing blog to read it from the `Link` header, possibly en masse.
My second thought was, if I can use JS to get it, maybe I can include Disqus dynamically, through JS, after it procures this number.
Then I remembered that 11ty can handle any number of different data sources, and combines them all into a single data object.
If I could build an index of slug → post id as another data file, I could add a post id via JS in the 11ty config.

My last epiphany was realizing I didn’t need any HTTP requests to get the post id: it was all in the exported sitemap XML, just unused by the importer!
Indeed, each `<item>` included a `<wp:post_id>` element with the post id and a `<link>` element with the URL.
I tried to open it in Chrome so I could run some JS on it and build the index, but it complained of parse errors.
When I fixed them, the tab crashed under its sheer size.

I needed to remove non-relevant data, and I needed to do it fast.
I copied it over to a separate file, and run a series of find & replaces:

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

As you can see, this does not just contain posts, but also other types of content, such as attachments or custom blocks.
This is exactly why we retained `<post_type>` (originally `<wp:post_type>`), which will help us filter non-posts out.

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

### Adding the post id to the posts

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

### Linking to Disqus

We now have the post id, and we can use it in our template.
Adapting the code from the [Universal Embed Code](https://help.disqus.com/en/articles/1717112-universal-embed-code), we get:

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

That’s it! This now works and displays the Disqus threads correctly!

Note that as it currently stands, this will not display the Disqus UI on new posts, since they won’t have a wpid.



{% endraw %}