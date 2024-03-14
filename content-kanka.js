document.addEventListener("click", function (event) {
	const targetElement = event.target.closest(
		".entity-header-image > .dropdown > [data-tippy-root] > div > div.tippy-content > div > a:nth-child(1)"
	);

	if (targetElement) {
		const imageUrl = targetElement.getAttribute("href");
		if (imageUrl) {
			event.preventDefault();
			const titleSections = document.querySelector("head > title").innerHTML.split(" - ");
			const name = titleSections[0];
			const category = titleSections[1];
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
