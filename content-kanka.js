document.addEventListener("click", function (event) {
	let targetElement = event.target.closest("[data-tippy-root] > div > div.tippy-content > div > a:nth-child(1)");

	if (targetElement) {
		console.log("Kanka is sending the url");
		let imageUrl = targetElement.getAttribute("href");
		if (imageUrl) {
			chrome.runtime.sendMessage(
				{
					action: "setImageURL",
					url: imageUrl,
				},
				(response) => {
					console.log("Response:", response);
				}
			);
		}
	}
});
