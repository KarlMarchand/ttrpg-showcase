chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === "setImageURL") {
		console.log("Sending the image url");
		chrome.tabs.query({ url: "http://127.0.0.1:5500/image_presenter.html" }, function (tabs) {
			tabs.forEach(function (tab) {
				chrome.tabs.sendMessage(tab.id, {
					action: "displayImageUrl",
					url: request.url,
					EntityCategory: request.EntityCategory,
					EntityName: request.EntityName,
				});
			});
			sendResponse({ status: "success", message: "Image URL updated successfully" });
		});
		return true;
	}
});
