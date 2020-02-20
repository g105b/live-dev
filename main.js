const APPLICABLE_PROTOCOLS = ["http:", "https:"];
let loaded = false;
let enabled = false;

function click(tab) {
	if(loaded) {
		toggle(tab);
	}
	else {
		const executing = browser.tabs.executeScript({
			file: "content.js"
		});
		executing.then(function (result) {
			loaded = true;
			toggle(tab);
		}, function (error) {
			console.log(`ERROR: ${error}`);
		});
	}
}

function toggle(tab) {
	enabled = !enabled;
	updateButton(tab.id);

	if(enabled) {
		browser.tabs.sendMessage(
			tab.id, {
				action: "start"
			}
		);
	}
	else {
		browser.tabs.sendMessage(
			tab.id, {
				action: "stop"
			}
		);
	}
}

function message(data) {
	switch(data.action) {
	case "disable":
		enabled = false;
	}
}

function updateButton(tabId) {
	if (enabled) {
		browser.pageAction.setIcon({tabId: tabId, path: "icon-enabled.svg"});
		browser.pageAction.setTitle({tabId: tabId, title: "Disable Live Reload on this page"});
	} else {
		browser.pageAction.setIcon({tabId: tabId, path: "icon.svg"});
		browser.pageAction.setTitle({tabId: tabId, title: "Enable Live Reload on this page"});
	}
}

browser.pageAction.onClicked.addListener(click);
browser.runtime.onMessage.addListener(message);