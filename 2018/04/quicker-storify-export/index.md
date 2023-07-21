---
title: "Quicker Storify export"
date: "2018-04-27"
tags:
- "tips"
---

If you've used [Storify](http://storify.com), you probably know by now it's closing down soon. They have an [FAQ](https://storify.com/faq-eol) up to help people with the transition which explains that to export your content you need to…

> 1. Log in to Storify at [www.storify.com.](https://www.storify.com/)
> 2. Mouse over the story that contains content you would like to export and select "View."
> 3. Click on the ellipses icon and select "Export."
> 4. Choose your preferred format for download.
> 5. To save your content and linked assets in HTML, select - File > Save as > Web Page, Complete. To export your content to PDF, select Export to HTML > File > Print > Save as PDF.
> 6. Repeat the process for each story whose content you would like to preserve.

So I started doing that. I wasn't sure if JSON or HTML would be more useful to me, so I was exporting both. It was painful. Each export required 3 page loads, and they were slow. After 5 stories, I started wondering if there's a quicker way. I'm a programmer after all, my job is to automate things. However, I also didn't want to spend too long on that, since I only had 40 stories, so the effort should definitely not be longer than it would have taken to manually export the remaining 35 stories.

I noticed that the HTML and JSON URLs for each story could actually be recreated by using the slug of the Story URL:

https://storify.com/LeaVerou/**css-variables-var-subtitle-cssconf-asia**.html
https://api.storify.com/v1/stories/LeaVerou/**css-variables-var-subtitle-cssconf-asia**

The bold part is the only thing that changes. I tried that with a different slug and it worked just fine. Bingo! So I could write a quick console script to get all these URLs and open them in separate tabs and then all I have to do is go through each tab and hit Cmd + S to save. It's not perfect, but it took minutes to write and saved A LOT of time.

Following is the script I wrote. Go to your profile page, click "Show more" and scroll until all your stories are visible, then paste it into the console. You will probably need to do it twice: once to disable popup blocking because the browser rightfully freaks out when you try to open this many tabs from script, and once to actually open all of them.

```javascript
var slugs = [... new Set($$(".story-tile").map(e => e.dataset.path))]
slugs.forEach(s => { open(`https://api.storify.com/v1/stories/${s}`); open(`https://storify.com/${s}.html`) })
```

This gets a list of all **unique** (hence the `[...new Set(array)]`) slugs and opens both the JSON and HTML export URLs in new tabs. Then you can go through each tab and save.

You will notice that the browser becomes REALLY SLOW when you open this many tabs (in my case 41 stories × 2 tabs each = 82 tabs!) so you may want to do it in steps, by using array.slice(). Also, if you don't want to save the HTML version, the whole process becomes much faster, the HTML pages took AGES to load and kept freezing the browser.

Hope this helps!

PS: If you're content with your data being held hostage by a different company, you could also use [this tool by Wakelet](http://www.wakelet.com/storify). I've done that too, but I also wanted to own my data as well.
