document.addEventListener("click", function (event) {
	const targetElement = event.target.closest("[data-tippy-root] > div > div.tippy-content > div > a:nth-child(1)");

	if (targetElement) {
		event.preventDefault();
		const imageUrl = targetElement.getAttribute("href");
		const titleSections = document.querySelector("head > title").innerHTML.split(" - ");
		const category = titleSections[1];
		const name = titleSections[0];
		if (imageUrl) {
			chrome.runtime.sendMessage(
				{
					action: "setImageURL",
					url: imageUrl,
					EntityCategory: category,
					EntityName: name,
				},
				(response) => {
					console.log("Response:", response);
				}
			);
		}
	}
});
