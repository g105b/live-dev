function start() {
	let allElements = document.querySelectorAll("script[src][data-live-reload],link[rel='stylesheet'][href][data-live-reload]");
	let enabledElements = 0;
	allElements.forEach(function(liveElement) {
		let originalPath = "";

		if(liveElement.dataset.liveReloadOriginalPath) {
			originalPath = liveElement.dataset.liveReloadOriginalPath;
		}
		else {
			if(liveElement.tagName.toUpperCase() === "SCRIPT") {
				originalPath = liveElement.getAttribute("src");
			}
			else if(liveElement.tagName.toUpperCase() === "LINK") {
				originalPath = liveElement.getAttribute("href");
			}
		}

		liveElement.dataset.liveReloadOriginalPath = originalPath;

		enabledElements++;
		update(liveElement);
	});

	if(enabledElements === 0) {
		clearInterval(interval);
		alert("For LiveReload to work, you need to add a `data-live-reload` attribute to your <link> or <script> elements that you want to live reload.\n\nKindly do that, then click me again.");
		browser.runtime.sendMessage({
			action: "disable"
		});
	}
}

function update(element) {
	let newPath = element.dataset.liveReloadOriginalPath;
	let timeString = (+(new Date())).toString(10);
	if(newPath.indexOf("?") === -1) {
		newPath += "?";
	}

	let attr = element.tagName === "SCRIPT"
		? "src"
		: "href";

	let newElement = element.cloneNode(true);
	newElement.setAttribute(
		attr,
		newPath + "&liveReload=" + timeString
	);
	element.parentNode.insertBefore(newElement, element.nextSibling);

	setTimeout(function() {
		element.remove();
	}, 800);
}

let interval = null;

browser.runtime.onMessage.addListener(function(data) {
	switch(data.action) {
	case "start":
		console.log("LiveReload enabled on this tab");
		interval = setInterval(function() {
			start();
		}, 1000);
		break;

	case "stop":
		console.log("LiveReload DISABLED on this tab");
		clearInterval(interval);
		break;
	}
});