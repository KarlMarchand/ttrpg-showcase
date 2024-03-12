chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === "displayImageUrl") {
		console.log("Local received the image url");
		window.postMessage(
			{
				type: "FROM_EXTENSION",
				imageUrl: request.url,
				EntityCategory: request.EntityCategory,
				EntityName: request.EntityName,
			},
			"http://127.0.0.1:5500"
		); // Adjust target origin as necessary
	}
});
