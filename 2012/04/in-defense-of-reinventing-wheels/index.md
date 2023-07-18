---
title: "In defense of reinventing wheels"
date: "2012-04-03"
categories:
  - "articles"
  - "thoughts"
tags:
  - "php"
  - "software-engineering"
---

One of the first things a software engineer learns is "don't reinvent the wheel". If something is already made, use that instead of writing your own. "Stand on the shoulders of giants, they know what they're doing better than you". Writing your own tools and libraries, even when one already exists, is labelled "NIH syndrome"  and is considered quite bad. _**"But what if my version is better?"**_. Surely, reinventing the wheel can't be bad when your new wheel improves existing wheel designs, right? Well, not if the software is open source, which is usually the case in our industry. "Just contribute to it" you'll be told. However, contributing to an open source project is basically teamwork. The success of any team depends on how well its members work together, which is not a given. Sometimes, your vision about the tool might be vastly different from that of the core members and it might be wiser to create your own prototype than to try and change the minds of all these people.

However, Open Source politics is not what I wanted to discuss today. It's not the biggest potential benefit of reinventing the wheel. **Minimizing overhead is.** You hardly ever need 100% of a project. Given enough time to study its inner workings, you could always delete quite a large chunk of it and it would still fit your needs perfectly. However, the effort needed to do that or to rewrite the percentage you actually need is big enough that you are willing to add redundant code to your codebase.

**Redundant code is bad.** It still needs to get parsed and usually at least parts of it still need to be executed. **Redundant code hinders performance.** The more code, the slower your app. Especially when we are dealing with backend code, when every line might end up being executed hundreds or even thousands of times per second. The slower your app becomes, the bigger the need to seriously address performance. The result of that is even more code (e.g. caching stuff) that could have been saved in the first place, by just running what you need. This is the reason software like Joomla, Drupal or vBulletin is so extremely bloated and brings servers to their knees if a site becomes mildly successful. It's the cost of code that tries to match everyone's needs.

Performance is not the only drawback involved in redundant code. **A big one is maintainability.** This code won't only need to be parsed by the machine, it will also be parsed by humans, that don't know what's actually needed and what isn't until they understand what every part does. Therefore, even the simplest of changes become hard.

I'm not saying that using existing software or libraries is bad. I'm saying that it's always a tradeoff between minimizing effort on one side and minimizing redundant code on the other side. I'm saying that you should _consider_ writing your own code when the percentage of features you need from existing libraries is tiny (lets say less than  20%). It might not be worth carrying the extra 80% forever.

For example, in a project I'm currently working on, I needed to make a simple localization system so that the site can be multilingual. I chose to use JSON files to contain the phrases. I didn't want the phrases to include HTML, since I didn't want to have to escape certain symbols. However, they had to include simple formatting like bold and links, otherwise the number of phrases would have to be huge. The obvious solution is [Markdown](http://daringfireball.net/projects/markdown/).

My first thought was to use an existing library, which for PHP is [PHP Markdown](http://michelf.com/projects/php-markdown/). By digging a bit deeper I found that it's actually considered pretty good and it seems to be well maintained (last update in January 2012) and mature (exists for over 2 years). I should happily use it then, right?

That's what I was planning to do. And then it struck me: I'm the only person writing these phrases. Even if more people write translations in the future, they will still go through me. So far, the only need for such formatting is links and bold. Everything else (e.g. lists) is handled by the HTML templates. That's literally **two lines of PHP**! So, I wrote my own function. It's a bit bigger, since I also added emphasis, just in case:

```php
function markdown($text) {
 // Links
 $text = preg\_replace('@\\\\\[(.+?)\\\\\]\\\\((#.+?)\\\\)@', '<a href="$2">$1</a>', $text);

 // Bold
 $text = preg\_replace('@(?<!\\\\\\\\)\\\\\*(?<!\\\\\\\\)\\\\\*(.+?)(?<!\\\\\\\\)\\\\\*(?<!\\\\\\\\)\\\\\*@', '<strong>$1</strong>', $text);

 // Emphasis
 $text = preg\_replace('@(?<!\\\\\\\\)\\\\\*(.+?)(?<!\\\\\\\\)\\\\\*@', '<em>$1</em>', $text);

 return $text;
}
```

Since PHP regular expressions also support negative lookbehind, I can even avoid escaped characters, in the same line. Unfortunately, since PHP lacks regular expression literals, backslashes have to be doubled (`\\` instead of `\` so `\\\\` instead of `\\`, which is pretty horrible).

For comparison, PHP Markdown is about 1.7K lines of code. It's great, if you need the full power of Markdown (e.g. for a comment system) and I'm glad Michel Fortin wrote it. However, for super simple, controlled use cases, is it really worth the extra code? I say no.

Rachel Andrew recently wrote about something tangentially similar, in her blog post titled "[Stop solving problems you don’t yet have](http://www.rachelandrew.co.uk/archives/2012/03/21/stop-solving-problems-you-dont-yet-have/)". It's a great read and I'd advise you to read that too.
