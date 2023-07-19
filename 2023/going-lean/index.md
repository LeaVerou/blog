---
title: "Going Lean"
date: "2023-07-18"
draft: true
toc: true
tags:
  - meta
  - 11ty
  - ia
---

WordPress has been with me since [my very first post in 2009](/blog).
There is a lot to love about it: It’s open source, it has a thriving ecosystem, a beautiful default theme, and a block editor that makes my inner UX geek giddy.
Plus, it made building a website and publishing content accessible to everyone.
No wonder it’s [the most popular CMS in the world](https://almanac.httparchive.org/en/2022/cms#most-popular-cmss), by a huge margin.

However, for me, the bad had started to outweigh the good:

- Things I could do in minutes in a static site, in WP required finding a plugin or tweaking PHP code.
- It was slow and bloated.
- Getting a draft out of it and into another medium was a pain.
- Despite having never been hacked, I was terrified about security, especially once it started demanding a higher PHP version than what I had.
- I was periodically getting "Error establishing a database connection" errors, whose frequency kept increasing.

It was time to move on.
*It’s not you WP, it’s me.*

It seemed obvious that the next step would be a statically generated blog.
I had been using [Eleventy](https://11ty.dev) for a while on a variety of sites at that point and loved it, so using that was a no-brainer.
In fact, my blog was one of my last remaining non-JAMstack sites, and by far the biggest.
I had built a [simple 11ty blog for my husband](https://svgees.us/blog/) a year ago, and was almost jealous of the convenience and simplicity.
There are so many conveniences that just come for free with this workflow: git, Markdown, custom components, even GitHub Copilot as you write your prose!
And if you can make the repo public, oooooh, the possibilities! People could even file PRs and issues for your blog posts!

Using [Netlify](https://netlify.com) as a platform was also a no-brainer:
I had been using it for years, and at this point host over 30 sites with them.
I love their simplicity, their focus on developer experience, and their commitment to open source.
I also happen to know a bunch of folks there, and they have a great culture too.

However, I was dreading the amount of work it would take to migrate 14 years of content, plugins, and styling.
The stroke that broke the camel’s back was a particularly bad db outage.
I [tweeted](https://twitter.com/LeaVerou/status/1652166572335587329) about my frustration, but I had already made up my mind.

I reviewed the list of plugins I had installed on WP to estimate the amount of work.
Nearly all fell in one of two categories:
1. Solving problems I wouldn't have if I wasn't using WP (e.g. SVG support, Don’t Muck My Markup)
2. Giving me benefits I could get in 11ty with very little code (e.g. Prism syntax highlighting, Custom Body Class, Disqus, Unlist Posts & Pages, Widget CSS classes)
3. Giving me benefits I could get with existing Eleventy plugins (e.g. Add Anchor Links, Easy Table of Contents)

This could actually work!

<!-- more -->

## Public or private repo?

One of the hardest dilemmas was whether to make the repo for this website public or private.

Overall, I was happy to have most files be public, but there were a few things I wanted to keep private:
- Drafts (some drafts I’m ok to share publicly, but not all)
- Private pages (e.g. in the previous site I had a password-protected page with my details for conference organizers)

Unfortunately, right now it’s all-or-nothing, even if only one file needs to be private, the whole repo needs to be private
(I don’t think it has to be this way, and I [tweeted about this](https://twitter.com/LeaVerou/status/1652806575973605378)).

Making the repo public does have many advantages:
- Transparency is one of my core values, and this is in line with it.
- People can learn from my code and avoid going down the same rabbit holes I did.
- People can file issues for problems.
- People can send PRs to fix both content and functionality.
- I wouldn’t need to use a separate public repo for the data that populates my [Speaking](/speaking/), [Publications](/publications/), and [Projects](/projects/) pages.

I went back and forth quite a lot, but in the end I decided to make it public.
In fact, I fully embraced it, by making it as easy as possible to file issues and submit PRs:
- Each page has a link to report a problem with it, which prefills as many info as possible.
- Each page has a link to edit it on GitHub

Note that **a public repo is not automatically open source**.
So far, I have not added a license, as I’m contemplating options.
This is not as simple as licensing a library, as there are multiple components to it:
(a) the website code (b) the content and images (c) the design
As with most of my code, I’d be happy for the code here to be MIT-licensed.
When it comes to content and images, I feel some kind of Creative Commons Attribtion license would be most appropriate (CC-BY? CC-BY-SA?).
But when it comes to the design, I’m not sure I want to license it at all.
It may be far from perfect, but it’s part of my own personal brand, which by definition needs to be unique.
So, adding a license will need to wait until I can figure out how to can license all three separately.

## Migrating content to Markdown

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
This did not fix the parsing issue, but allowed me to simply open the file in VS Code and delete the problematic comments manually.
It also fixed the uptime issues I was having: I never got another "Error establishing a database connection" error after that, despite taking my own sweet time to migrate (started in April 2023, and finished in July!).
Ideally, I wish WP had an option to export without comments, but I guess that’s not a common use case.

While this importer is great, and allowed me to configure the file structure in a way that preserved all my URLs, I did lose a few things:

- "Read more" separators (filed it as [issue #93](https://github.com/lonekorean/wordpress-export-to-markdown/issues/93))
- Figures (they are imported as just images with text underneath) (filed it as [issue #94](https://github.com/lonekorean/wordpress-export-to-markdown/issues/94))
- Drafts ([#16](https://github.com/lonekorean/wordpress-export-to-markdown/issues/16))
- Pages (I had to manually copy them over, but it was only a handful)
- Any custom classes were gone (e.g. a `"view-demo"` class I used to create "call to action" links)

A few other issues:
- It downloaded all images, but did not update the URLs in the Markdown files.
This was easy to fix with a regex find and replace from `https?://lea.verou.me/wp-content/uploads/(\d{4}/\d{2})/([\w\.-]+\.(?:png|gif|jpe?g))` to `images/$2`.
- Some images from some posts were not downloaded -- I still have no idea why.
- It did not download any non-media uploads, e.g. zip files.
Thankfully, these were only a couple, so I could detect and port over manually.
- Older posts included code directly in the content, without code blocks, which meant it was being parsed as HTML, often with disastrous results (e.g. the post just cutting off in the middle of a sentence because it mentioned `<script>`, which opened an actual `<script>` element and ate up the rest of the content).
I fixed a few manually, but I’m sure there’s more left.
- Because code was just included as content, the importer also escaped all Markdown special symbols, so adding code blocks around it was not enough, I also had to remove a bunch of backslashes manually.


## Rethinking Categorization

While the importer preserved both tags and categories, this was a good opportunity to rethink whether I need them both,
as well as how I use them.

This spun off into a separate post: [Rethinking Categorization](../rethinking-categorization/).

## Migrating comments

Probably one of the hardest parts of this migration was preserving Disqus comments.
In fact, it was so hard that I procrastinated on it for months,
being stuck in a limbo where I couldn’t blog because I'd have to port the new post manually.

I’ve documented the process in a [separate blog post](../preserve-disqus/), as it was quite involved,
including some thoughts about what system to use in the future, as I eventually hope to migrate away from Disqus.

## Keeping URLs cool

I wanted to preserve the URL structure of my old site as much as possible, both for SEO, but also because [cool URLs don’t change](https://www.w3.org/Provider/Style/URI).
The WP importer I used allowed me to preserve the `/year/month/slug` structure of my URLs.
I did want to have the blog in its own directory though, so I just added a [Netlify redirect](https://docs.netlify.com/routing/redirects/):

```
/20* /blog/20:splat 301
```

Going forwards, I decided to do away with the month being part of the URL, as it complicates the file structure for no discernible benefit (and I don’t blog nearly as much now as I did in 2009).

I also wanted to have good, RESTful, [usable](https://www.nngroup.com/articles/url-as-ui/) URLs, which also requires:

> URLs that are "hackable" to allow users to move to higher levels of the information architecture by hacking off the end of the URL

In practice, this means it’s not enough if `tags/foo/` shows all posts tagged "foo", `tags/` should also show all tags.
Similarly, it's not enough if `/blog/2023/04/private-fields-considered-harmful/` links to the [corresponding blog post](/blog/2023/04/private-fields-considered-harmful/),
but also:
- [`/blog/2023/04/`](/blog/2023/04/) should show all posts from April 2023
- [`/blog/2023/`](/blog/2023/) should show all posts from 2023
- and of course [`/blog/`](/blog/) should show all posts

This proved quite tricky to do with Eleventy, and spanned an entirely different [blog post](../11ty-indices/).