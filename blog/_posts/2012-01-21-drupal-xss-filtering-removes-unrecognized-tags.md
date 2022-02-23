---
id: 56
title: 'drupal XSS filtering removes unrecognized tags'
date: '2012-01-21T22:00:20-05:00'
author: David
layout: post
guid: 'http://davidwritescode.com/blog/?p=56'
permalink: /drupal-xss-filtering-removes-unrecognized-tags/
dsq_thread_id:
    - '824827531'
categories:
    - Drupal
tags:
    - drupal
---

So I just installed drupal 7.10 and am playing around with it a bit. I changed my site name to **david-&gt;writes(‘&lt;drupal&gt;’);**. What I got was **david-&gt;writes(”);**. I got the same thing when trying to post this message to the drupal forums, as I figured I might. So I manually escaped it. I figured the validation was removing the &lt;drupal&gt; “tag”, so I found where this takes place in the**\_filter\_xss\_split** function in **includes/common.inc**.

If the text looks like a tag, but is not one of the listed supported tags, an empty string is returned. Seems a little lazy really. So, on line 1411, I changed the

`return '';`

to

`return '&lt;'.$elem.'&gt;';`

Anyway, my site name shows up correctly now.

I haven’t tested this thoroughly, but I don’t see how it would cause a problem. It’s just a little escape action.

Has anyone else seen this and fixed it? Anyone see any potential problems? Other comments?

P.S. View the forum conversation here: <http://drupal.org/node/1412910>