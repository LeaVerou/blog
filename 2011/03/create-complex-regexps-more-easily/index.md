---
title: "Create complex RegExps more easily"
date: "2011-03-28"
tags:
  - "original"
  - "tips"
  - "js"
  - "regexp"
  - "regular-expressions"
---

When I was writing [my linear-gradient() to -webkit-gradient() converter](http://lea.verou.me/2011/03/convert-standard-gradient-syntax-to-webkit-gradient-and-others/), I knew in advance that I would have to use a quite large regular expression to validate and parse the input. Such a regex would be incredibly hard to read and fix potential issues, so I tried to find a way to cut the process down in reusable parts.

Turns out JavaScript regular expression objects have a .source property that can be used in the RegExp constructor to create a new RegExp out of another one. So I wrote a new function that takes a string with identifiers for regexp replacements in {{ and }} and replaces them with the corresponding sub-regexps, taken from an object literal as a second argument:

/\*\*
 \* Create complex regexps in an easy to read way
 \* @param str {String} Final regex with {{id}} for replacements
 \* @param replacements {Object} Object with the replacements
 \* @param flags {String} Just like the flags argument in the RegExp constructor
 \*/
RegExp.create = function(str, replacements, flags) {
	for(var id in replacements) {
		var replacement = replacements\[id\],
			idRegExp = RegExp('{{' + id + '}}', 'gi');

		if(replacement.source) {
			replacement = replacement.source.replace(/^\\^|\\$$/g, '');
		}

		// Don't add extra parentheses if they already exist
		str = str.replace(RegExp('\\\\(' + idRegExp.source + '\\\\)', 'gi'), '(' + replacement + ')');

		str = str.replace(idRegExp, '(?:' + replacement + ')');
	}

	return RegExp(str, flags);
};

If you don't like adding a function to the RegExp object, you can name it however you want. Here's how I used it for my linear-gradient() parser:

self.regex = {};

self.regex.number = /^-?\[0-9\]\*\\.?\[0-9\]+$/;
self.regex.keyword = /^(?:top\\s+|bottom\\s+)?(?:right|left)|(?:right\\s+|left\\s+)?(?:top|bottom)$/;

self.regex.direction = RegExp.create('^(?:{{keyword}}|{{number}}deg|0)$', {
	keyword: self.regex.keyword,
	number: self.regex.number
});

self.regex.color = RegExp.create('(?:{{keyword}}|{{func}}|{{hex}})', {
	keyword: /^(?:red|tan|grey|gray|lime|navy|blue|teal|aqua|cyan|gold|peru|pink|plum|snow|\[a-z\]{5,20})$/,
	func: RegExp.create('^(?:rgb|hsl)a?\\\\((?:\\\\s\*{{number}}%?\\\\s\*,?\\\\s\*){3,4}\\\\)$', {
		number: self.regex.number
	}),
	hex: /^#(?:\[0-9a-f\]{1,2}){3}$/
});

self.regex.percentage = RegExp.create('^(?:{{number}}%|0)$', {
	number: self.regex.number
});

self.regex.length = RegExp.create('{{number}}{{unit}}|0', {
	number: self.regex.number,
	unit: /%|px|mm|cm|in|em|rem|en|ex|ch|vm|vw|vh/
});

self.regex.colorStop = RegExp.create('{{color}}\\\\s\*{{length}}?', {
	color: self.regex.color,
	length: self.regex.length
}, 'g');

self.regex.linearGradient = RegExp.create('^linear-gradient\\\\(\\\\s\*(?:({{direction}})\\\\s\*,)?\\\\s\*({{colorstop}}\\\\s\*(?:,\\\\s\*{{colorstop}}\\\\s\*)+)\\\\)$', {
	direction: self.regex.direction,
	colorStop: self.regex.colorStop
}, 'i');

(self in this case was a local variable, not the window object)
