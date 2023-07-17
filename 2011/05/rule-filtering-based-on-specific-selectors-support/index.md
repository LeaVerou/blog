---
title: "Rule filtering based on specific selector(s) support"
date: "2011-05-02"
categories:
  - "tips"
tags:
  - "css"
  - "selectors"
---

I've been using this trick for quite a while, but I never thought to blog about it. However, I recently realized that it might not be as common as I thought, so it might be a good idea to document it in a blog post.

If you follow the discussions on www-style, you might have noticed the [proposal for a @supports rule](http://lists.w3.org/Archives/Public/www-style/2011Apr/0428.html) to query property and value support. Some people suggested that it should also test for selectors, for example whether a certain pseudo-class is supported. However, you can do that today, albeit in a limited manner (no OR and NOT support).

The main principle that you need to keep in mind is that **browsers are expected to drop rules with selectors they don't understand, even partially**. So, if only one selector in a group cannot be parsed, the whole rule will be dropped. This means we can construct selector "tests", which are use cases of the selector whose support we want to test, that will not match anything, even if the selector is supported. Then, we include that selector in the beginning of our selector group. If all this is unclear, don't worry, as there's an example coming next :)

## Example

Suppose you want to apply the following CSS (for rudimentary custom checkboxes):

input\[type="checkbox"\] {
    position:absolute;
    clip: rect(0,0,0,0);
    clip: rect(0 0 0 0);
}

input\[type="checkbox"\] + label::before {
    content: url('checkbox.png');
}

input\[type="checkbox"\]:checked + label::before {
    content: url('checkbox-checked.png');
}

only in browsers that support the attribute equality selector, the `:checked` pseudo-class and the `::before` pseudo-element. We need to try to think of a selector that includes all of them but matches nothing. One such selector would be `#foo[type="checkbox"]:checked::before`. Even in supporting browsers, this matches nothing as there's no element with id="foo". We can reduce the test for every rule to conserve bandwidth: For example, we don't need to include tests for the attribute selector in any of them, since they are present anyway in all three rules. Also, we may eliminate `::before` from the second test and we don't need any test for the 3rd one, since it includes all features we want to test for. To sum up:

**#foo:checked::before,**
input\[type="checkbox"\] {
    position:absolute;
    clip: rect(0,0,0,0);
    clip: rect(0 0 0 0);
}

**#foo:checked,**
input\[type="checkbox"\] + label::before {
    content: url('checkbox.png');
}

input\[type="checkbox"\]:checked + label::before {
    content: url('checkbox-checked.png');
}

An important caveat of this technique is that **Internet Explorer up to version 7** will split selectors before parsing them, so it will completely ignore our filters :( (Thanks to [Ryan Seddon](http://www.thecssninja.com/) for finding that out).

Disclaimer: The original idea about custom checkboxes belongs to [Ryan Seddon](http://www.thecssninja.com/css/custom-inputs-using-css), although his code was quite different.
