---
title: "Beveled corners & negative border-radius with CSS3 gradients"
date: "2011-03-14"
categories:
  - "original"
  - "tips"
tags:
  - "css-images"
---

Just found out how to do beveled corners and simulate negative border radius without images, by utilizing CSS gradients once again. It's amazing how many CSS problems can be solved with gradients alone. Read the text in the dabblet below to find out how (or just check the code):

<iframe style="width: 100%; height: 800px" src="http://dabblet.com/gist/10168919"></iframe>

It also falls back to a solid color background if CSS gradients are not supported. It will work on Firefox 3.6+, Chrome, Safari, Opera 11.10+ and IE10+.

PS: For my twitter friends, I had already written this when the robbers came and I was about to post it. I might have been really calm, but not as much as making CSS experiments the same day I was robbed and threatened by a gun :P
