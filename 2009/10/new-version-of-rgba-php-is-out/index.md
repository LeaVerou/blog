---
title: "New version of rgba.php is out!"
date: "2009-10-25"
tags:
  - "original"
  - "colors"
  - "css"
  - "css-values"
  - "php"
  - "rgba"
---

[It's been a while since I posted my little server-side solution for cross-browser RGBA colors](http://lea.verou.me/2009/02/bulletproof-cross-browser-rgba-backgrounds/) (in a nutshell: native rgba for the cool browsers that support it, a PHP-generated image for those that don't). For features, advantages, disadvantages etc, go see the original post. In this one I'll only discuss the new version.

So, since it's release I've received suggestions from many people regarding this script. Some other ideas were gathered during troubleshooting issues that some others faced while trying to use it. I hope I didn't forget anything/anyone :)

### Changelog (+credits):

1. You may now specify the size of the generated image (thanks _**[Sander Arts](http://lea.verou.me/2009/02/bulletproof-cross-browser-rgba-backgrounds/#comment-122)**_!)
2. If the PHP version is below 5.1.7 the call to imagepng() uses 2 parameters instead of 4, to workaround the bug found by _**[Bridget](http://lea.verou.me/2009/02/bulletproof-cross-browser-rgba-backgrounds/#comment-103)**_ (thanks **_Chris Neale_** for suggesting the use of phpversion()!)
3. Added error\_reporting() to only allow for fatal errors and parse errors to go through (I should had done this anyway but I completely forgot). This solves an issue that **_Erin Doak_** pointed out, since they had set up notices to be displayed and even a reference to an undefined index made the whole script collapse.
4. _**Mariotti Raffaele**_ pointed out that apache\_request\_headers() was not defined in all PHP installations. After looking into it a bit, I found out that it's available only when PHP is installed as an Apache module. After some more research it turned out that the only way to get the If-Modified-Since header otherwise is an .htaccess, so I  ruled that out (It would complicate the workaround I think and I doubt all hosts allow .htaccess (?). On the other hand, an .htacess would also allow for some URL rewriting goodness... Hmmm... Should I consider this?). So, if the function is not available, it serves the file with an 200 response code every time, instead of just sending a 304 response when the If-Modified-Since header is present.
5. [**Igor Zevaka**](http://lea.verou.me/2009/10/new-version-of-rgba-php-is-out/#comment-893) for pointing out that the Expires header wasn't a valid HTTP date.

### Links

**[rgba.php](uploads/rgba.zip)**

**[Demo](http://lea.verou.me/wp-content/themes/leaverou/images/rgba.php?r=255&g=0&b=100&a=80)**

Enjoy :) and please report any bugs!
