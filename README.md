Automatically reload client-side assets without refreshing the page
===================================================================

This is a Firefox extension for development. It is currently feature complete for basic usage, but I have plans to improve over time (see below).

Usage
-----

Mark any `<link>` or `<style>` element with the attribute `data-live-reload` to indicate that it should reload behind the scenes, without needing a page refresh.

Click the page action (the icon in the URL bar) to enable live reloading, press again to disable.

Future features
---------------

There are currently lots of extensions out there that do this exact functionality. Currently this extension has no extra functionality (apart from opt-in via HTML attributes). I built this to experiment with Firefox extensions, but I do have plans for unique features in the future.

The main plan is to allow `data-live-reload` attribute to be added to _any_ element, even the `<body>` itself. That will allow you to write HTML in your editor and see the page change in front of your eyes. This would be a unique feature, but we'll see if I get the time/motivation.