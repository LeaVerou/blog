---
title: "On password masking and usability"
date: "2009-06-28"
tags:
  - "articles"
  - "tips"
  - "internet-explorer-bugs"
  - "js"
  - "usability"
  - "ux"
---

I just read [Jakob Nielsen's recent post in which he urged web designers/developers to stop password masking](http://www.useit.com/alertbox/passwords.html) due to it's inherent usability issues. I found it an interesting read. Hey, at last, someone dared to talk about the elephant in the room!

In most cases password masking is indeed useless, but still, there are several cases where you need that kind of protection. He also points that out, suggesting a checkbox to enable the user to mask their entered password if they wish to do so. He also suggests that checkbox being enabled by default on sites that require high security.

I think the checkbox idea is really good, as long as it works in the opposite way: Password masking should **always** be the default and you should **check** the checkbox to **show** the characters you typed. This is in line with what Windows (Vista or newer) users are already accustomed to anyway:

![Enter passphrase](images/vistawirelesspasscode.png "Enter passphrase")

This can (and should) be done with JavaScript alone: if the user has it turned off, no problem, just a regular old password field. Of course the checkbox should also be dynamically added, to prevent users with disabled JS from viewing a checkbox that does nothing at all.

This seems easy at first, even without a library (although, in this particular case, a library would greatly reduce the amount of code required, so much that I'm tempted to include a jQuery version as well):

```js
window.onload = function() {
	var passwords = document.getElementsByTagName('input');
	for(var i=0; i<passwords.length; i++) {
		if(passwords\[i\].type == 'password') {
			var password = passwords\[i\];

			var showCharsCheckbox = document.createElement('input');
				showCharsCheckbox.type = 'checkbox';
				showCharsCheckbox.onclick = (function(input) {
					return function() {
						input.type = this.checked? 'text' : 'password';
					};
				})(password);

			var showCharsLabel = document.createElement('label');
				showCharsLabel.appendChild(showCharsCheckbox);
				showCharsLabel.appendChild(document.createTextNode('Show characters'));

			// If the password field is inside a <label> element, we don't want to insert our label in there as well!
			var previousSibling = /label/i.test(password.parentNode.nodeName)? password.parentNode : password;

			// Check whether it's the last child of it's parent
			if(previousSibling.nextSibling) {
				previousSibling.parentNode.insertBefore(showCharsLabel, previousSibling.nextSibling);
			}
			else {
				previousSibling.parentNode.appendChild(showCharsLabel);
			}
		}
	}
}
```

However, nothing is ever simple, when you also need to support our _beloved_ Internet Explorer. Most moderately experienced JavaScript developers have probably already understood what I'm talking about: The all time classic IE bug (still present in IE8...) in regards to setting an <input /> element's type attribute. You can only set it once, for elements that are not already in the DOM. After that, it becomes read-only, and any attempt to set it results in a "The command is not supported" error. And when I say "any" attempt I mean it:

- `element.setAttribute()`
- `element.type`
- `element.setAttributeNode()`
- `element.removeAttribute()` and then `element.setAttribute()`
- `element.cloneNode()`, then one of the above, then replacing the node with the clone

**everything** fails miserably.

I've encountered this problem several times in the past as well, but I could always think of an alternative way to do what I wanted without having to work around it. In this case, I don't think there is one. So we're left with two possible scenarios:

- Perform an easy test in the beginning to see whether this bug exists and proceed only if the browser isn't naughty. This could be done with the following:
	```js
    var supportsChangingTypeAttribute = (function() {
    	var input = document.createElement('input');
    	try {
    		input.type = 'password';
    		input.type = 'text';
    	} catch(e) {
    		return false;
    	}
    	return input.type == 'text';
    })();

    if(supportsChangingTypeAttribute) {
    	// do stuff...
    }
	```

- Wrap the statement that IE chokes on in a try...catch construct and in the catch(e) {...} block create a new input element, copy **everything** (where everything is **at least**: attributes, properties, event handlers - both traditional ones **and** listeners) from the password field into it (except the type attribute of course!) and replace the original password field with it. After the first time, the text field could also be reused, to improve performance. If you have a shortage of trouble in your life, you may attempt it, I currently do not. :P It can be a **very** simple task for particular cases, but a generic solution that would work in any site (or even in most sites) seems a really daunting, tedious and downright boring task. I also hope there might be a better solution, that I haven't thought of. Any ideas?
