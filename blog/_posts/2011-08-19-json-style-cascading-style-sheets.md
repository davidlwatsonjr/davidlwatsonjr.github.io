---
id: 24
title: 'JSON-style Cascading Style Sheets'
date: '2011-08-19T16:04:09-05:00'
author: David
layout: post
guid: 'http://www.davidwritescode.com/blog/?p=24'
permalink: /json-style-cascading-style-sheets/
dsq_thread_id:
    - '824811599'
categories:
    - CSS
tags:
    - css
---

So, it’s kind of the way of the world that when I have a good idea and start focusing my energies on fully hashing out and refining that idea, I find that somebody else has shared that idea and is already (sometimes only somewhat) implementing it. Today’s example is what I might call JSON-style CSS.

After looking at much of my CSS code and going, “Man, this would be simpler if I didn’t have to duplicate some of these selectors.” To see what I mean, check out the following code (and yes, I am a fan of the single-line CSS rule):

```
<pre class="brush: css; title: ; notranslate" title="">
#cfgfile-controller table {margin: auto;}
#cfgfile-controller label.gateway, #cfgfile-controller input[type="text"].gateway {width: 144px;}
#cfgfile-controller label.subnet-mask, #cfgfile-controller select.subnet-mask {width: 84px;}
#cfgfile-controller label.gateway, #cfgfile-controller label.subnet-mask, #cfgfile-controller label.port, #cfgfile-controller label.dest, #cfgfile-controller label.protocol {display: inline-block; float: none; margin: 0 auto; padding: 4px; text-align: center;}
#cfgfile-controller label.gateway {margin-left: 206px;}
#cfgfile-controller label.port, #cfgfile-controller input[type="text"].port {width: 48px;}
#cfgfile-controller label.dest, #cfgfile-controller input[type="text"].dest {width: 240px;}
#cfgfile-controller label.protocol, #cfgfile-controller select.protocol, #cfgfile-controller select#acctste {width: 72px;}
#cfgfile-controller .additional-info {line-height: 1.75; margin: auto; white-space: normal; width: 282px;}
```

I wrote this stuff in the main CSS file of a fairly large hand-written project. The project had a number of controllers, and for some of those, I wanted to tweak just a few things about the presentation. I had a few options to resolve this problem:

- I quite possibly could rely on just the class names (gateway, subnet-mask, etc.) to handle these, but there are a few other controllers with similar elements that I did NOT want styled this way.
- I could create a totally separate CSS file that was included only when the controller I wanted to target was the one being called. I actually started off this way, but determined I’d be much better off performance-wise going with the solution I chose.

<div>What I would like to do is somewhat more of a JSON-style CSS sheet. If you look at CSS, it kind of resembles JSON already…. Kind of. I think a better solution to my problem would have been if I could do something like this:</div>```
<pre class="brush: css; title: ; notranslate" title="">
#cfgfile-controller {
	table {margin: auto;}
	label.gateway, input[type="text"].gateway {width: 144px;}
	label.subnet-mask, select.subnet-mask {width: 84px;}
	label.gateway, label.subnet-mask, label.port, label.dest, label.protocol {display: inline-block; float: none; margin: 0 auto; padding: 4px; text-align: center;}
	label.gateway {margin-left: 206px;}
	label.port, input[type="text"].port {width: 48px;}
	label.dest, input[type="text"].dest {width: 240px;}
	label.protocol, select.protocol, select#acctste {width: 72px;}
	.additional-info {line-height: 1.75; margin: auto; white-space: normal; width: 282px;}
}
```

I do think even this could be simplified (maybe put all the identically-classed labels on one line or something), but I think this is much easier to read. It also eliminates 18 calls to the #cfgfile-controller selector. That’s a savings of 345 characters (970 – 625). Apply this concept to an entire style sheet and you can come up with some pretty cool stuff.

As I mentioned in the beginning, sometimes when hashing out these ideas, I find they’ve already been thought up. For more info, check out [LESS](http://lesscss.org/). It uses the exact notation I’m describing, but requires compiling into standard CSS. I think CSS should handle this type of notation on its own… CSS4 anyone?