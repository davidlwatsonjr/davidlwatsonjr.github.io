---
id: 101
title: 'Why you should use nth-child instead of class=&#8221;odd|even&#8221;'
date: '2013-03-15T21:21:17-05:00'
author: David
layout: post
guid: 'http://davidwritescode.com/blog/?p=101'
permalink: /why-you-should-use-nth-child-instead-of-classoddeven/
dsq_thread_id:
    - '1140781351'
categories:
    - CSS
tags:
    - css
    - last.fm
---

Take a gander at this:

[![My last.fm track list after deleting a few songs.](http://davidwritescode.com/blog/wp-content/uploads/2013/03/davidlwatsonjr-–-Users-at-Last.fm_-1024x531.png)](http://davidwritescode.com/blog/wp-content/uploads/2013/03/davidlwatsonjr-–-Users-at-Last.fm_.png)

That’s my track listing on last.fm after I’ve deleted a few duplicates (thank you, last.fm Android app).

Notice anything funny? Yeah. How about those background colors.

See, last.fm slaps every other row with an “odd” class. They then target that class to alternate background colors for every other row.

But what if they used some nth-child magic instead? Why, this:

[![My last.fm track list after deleting a few songs but using nth-child selection.](http://davidwritescode.com/blog/wp-content/uploads/2013/03/davidlwatsonjr-–-Users-at-Last.fm-nth-child-1024x556.png)](http://davidwritescode.com/blog/wp-content/uploads/2013/03/davidlwatsonjr-–-Users-at-Last.fm-nth-child.png)

I took 6.9 seconds and changed their selector from

```
table.tracklist tr.odd
```

to

```
table.tracklist tr:nth-child(odd)
```

[Can I use…](http://caniuse.com/#search=nth-child "Can I use...") says I can use this selector on any modern browser (as long as we exclude IE 8 from modern, which should be the case).

So, last.fm, get on it.