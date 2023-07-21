---
title: "100% Cyan in CMYK is NOT rgb(0,255,255)!!"
date: "2009-03-23"
tags:
  - "rants"
  - "cmyk"
  - "colors"
  - "rgb"
---

As I mentioned in an earlier post of mine, I have to create a color picker, so I've already started to write the code for the Color class it's going to use. I need it to natively support RGB, HSL, Lab and CMYK. And the latter part is causing unexpected trouble.

It seems that there is the notion out there that conversion from [CMYK](http://en.wikipedia.org/wiki/CMYK_color_model) to [RGB](http://en.wikipedia.org/wiki/RGB) is easy. Newsflash: **It's not**. As every graphic designer knows, the CMYK [color gamut](http://en.wikipedia.org/wiki/Color_gamut) is smaller than the the RGB color gamut (even the sRGB color gamut). You can't take a CMYK color and convert it to an out-of-CMYK-gamut RGB color! That's nonsense! And it's precisely what most conversion [algorithms](http://www.easyrgb.com/index.php?X=MATH&H=14#text14) and [color pickers](http://www.colourlovers.com/copaso/ColorPaletteSoftware) out there do! Even [Adobe Kuler](http://kuler.adobe.com)!!! Since yesterday, I've studied dozens of algorithms and color pickers that claim to do CMYK -> RGB conversion, and every single one of them is **wrong**.

You can test a color picker that claims to support CMYK, or a CMYK <--> RGB conversion algorithm in the following simple way: Test how it converts the color CMYK(100%, 0, 0, 0) to RGB. If the result is rgb(0,255,255) then the algorithm is crap. rgb(0, 255, 255) is neither the same color, nor is it even in the CMYK color gamut! So basically, these algorithms convert a CMYK color to an RGB color that is outside of the CMYK color gamut! **A color that cannot be represented with CMYK is supposed to be the result of a CMYK->RGB conversion?** This is madness!

So far the only CMYK -> RGB converter that I've seen and does it right, is the one used by Adobe CS products (Photoshop, Illustrator, etc). And that makes me wonder why Kuler does it the wrong way, since they have already figured the algorithm! It's crazy!

What's even more strange is that I can't even find which sRGB colors are usually out of the CMYK color gamut, so that I can adjust the algorithm I use properly (even if it just clipped the color to the nearest in-gamut one, it would be an improvement). I've been searching since yesterady even for that with no luck. I hope I don't end up using the wrong algorithm myself too...
