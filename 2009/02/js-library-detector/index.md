---
title: "JS library detector"
date: "2009-02-11"
categories:
  - "original"
tags:
  - "bookmarklets"
  - "dojo"
  - "domassistant"
  - "extjs"
  - "js"
  - "javascript-libraries"
  - "jquery"
  - "mootools"
  - "prototype"
  - "yui"
---

Ever wondered which JavaScript library (if any) is hidden beneath the bells & whistles of each site you gazed at? Since I am a curious person, I find myself wondering every time, so after a bit of research, I wrapped up a little bookmarklet that instantly told me the answer every time.

The logic behind it is that every JavaScript library creates at least one global variable with an easily recognizable name. For most JavaScript libraries, this is simply their name (Prototype, jQuery, DOMAssistant, MooTools, dojo). For some others, its something close enough to their name (YAHOO for YUI, Scriptaculous for script.aculo.us, Ext for ExtJS). So if you check the precence of this global variable, you are effectively checking for the precence of the related framework. Most of them also contain a property with their version (which is usually named 'version' or 'Version' or 'VERSION' (in YUI)) - in fact the only library that did not contain such a property was DOMAssistant. So, after a sneak peek at their code, I could easily set up some conditionals that check whether a certain library exists in the page and if so, alert its name and version. If multiple libraries exist at the same page, multiple popups will appear.

So, here is the bookmarklet:
{% raw %}
<a href="javascript:if('Prototype'%20in%20window)%20{%20var%20ret%20=%20'Prototype%20'%20+%20Prototype.Version;%20if('Scriptaculous'%20in%20window)%20ret%20+=%20'%20with%20script.aculo.us%20'%20+%20Scriptaculous.Version;%20alert(ret);%20}%20if('jQuery'%20in%20window)%20alert('jQuery%20'%20+%20jQuery.fn.jquery);%20if('MooTools'%20in%20window)%20alert('MooTools%20'%20+%20MooTools.version);%20if('YAHOO'%20in%20window)%20alert('YUI%20'%20+%20YAHOO.VERSION);%20if('dojo'%20in%20window)%20alert('Dojo%20'%20+%20dojo.version);%20if('Ext'%20in%20window)%20alert('ExtJS%20'%20+%20Ext.version);%20if('DOMAssistant'%20in%20window)%20alert('DOMAssistant');" class="call-to-action">JS library detector</a>
{% endraw %}
Just drag it to your bookmarks toolbar and it's ready.

And here is the human-readable code:

```js
if('Prototype' in window)
{
	var ret = 'Prototype ' + Prototype.Version;
	if('Scriptaculous' in window) ret += ' with script.aculo.us ' + Scriptaculous.Version;
	alert(ret);
}
if('jQuery' in window) alert('jQuery ' + jQuery.fn.jquery);
if('MooTools' in window) alert('MooTools ' + MooTools.version);
if('YAHOO' in window) alert('YUI ' + YAHOO.VERSION);
if('dojo' in window) alert('Dojo ' + dojo.version);
if('Ext' in window) alert('ExtJS ' + Ext.version);
if('DOMAssistant' in window) alert('DOMAssistant');
```

Am I nuts? Certainly. Has it been useful to me? Absolutely.
