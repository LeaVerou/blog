---
title: "On native, single-input, multiple file uploads"
date: "2009-03-07"
categories:
  - "articles"
  - "news"
tags:
  - "browsers"
  - "feature-detection"
  - "html"
  - "js"
  - "webkit"
  - "webkit-bugs"
---

If you are following the current news on web development, you probably heard that the new Safari 4 has a great feature: It natively allows the user to select multiple files via a single input control, if you specify a value for the attribute `multiple`:

<input type="file" multiple>

or, in XHTML:

<input type="file" multiple="multiple" />

You might not know that [Opera supported multiple file uploads for a while now, based on the earlier Web Forms 2.0 standard](http://ajaxian.com/archives/input-typefile-multiple-now-in-a-real-browser#comment-271852) in a slightly different (and more flexible) format:

<input type="file" min="1" max="9999″ />

### Can we use those currently?

Sure we can, but we should provide fallbacks for the other browsers. Using these features will put pressure on the other browser vendors to implement them as well and generally, native is always better.

### How can we find out whether the browser supports them?

#### Opera

Opera supports accessing those `min` and `max` properties as properties of the element. So, it's quite trivial to check whether Opera-style multiple inputs are supported:

var supportsMin = (function(){
	var fi = document.createElement('input');
	fi.type = 'file';
	return fi.min === '' && fi.max === '';
})();

#### Safari 4

In Safari 4 the check would be equally simple, if it supported accessing the `multiple` attribute as a property. Then we could easily check whether it's boolean and conclude that Safari-style multiple inputs are supported:

var supportsMultiple = (function(){
	var fi = document.createElement('input');
	fi.type = 'file';
	// The second check is probably redundant but what if in the future an implementor
	// decides to make the file inputs to handle multiple selections by default?
	// Yeah, it's not likely, but it's not entirely impossible.
	return fi.multiple === false || fi.multiple === true;
})();

However, that's currently not the case. The good news are that [I reported this as a bug today, and the Webkit team fixed it](https://bugs.webkit.org/show_bug.cgi?id=24444), so it will be possible in the next Webkit nightly!

#### Combining the two

You can easily combine these two together with the workaround you prefer:

// Create a file input that allows multiple file selection
var fi = document.createElement('input');
fi.type = 'file';

if(fi.multiple === false || fi.multiple === true) {
	fi.multiple = true;
}
else if(fi.min === '' && fi.max === '') {
	fi.min = 1;
	fi.max = 9999;
}
else {
	// Our preferred workaround here
}

### What about Mozilla?

Ok, we all know that IE will probably take years to implement similar functionality. But usually, the Mozilla team implements new and exciting stuff quite fast.

As it turns out, [there is a relevant ticket sitting in their Bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=63687) for a while now. If you want them to implement it, vote for it so that it's priority increases.

If they do implement it in the way suggested, the code posted above will work for that too, without any changes - The advantages of feature detection baby! ;)
