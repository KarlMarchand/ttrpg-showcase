document.addEventListener("DOMContentLoaded", function () {
	const displayedImage = document.getElementById("displayedImage");
	const updateButton = document.getElementById("updateButton");
	const popupForm = document.getElementById("popupForm");
	const imageUrlInput = document.getElementById("imageUrlInput");
	const nameContainer = document.getElementById("name");
	let currentImageUrl = localStorage.getItem("currentImageUrl") || "";
	let lastLoadedImageUrl = "";
	let lastLoadedImageName = "";

	function updateImage() {
		const newImageUrl = localStorage.getItem("currentImageUrl");
		const newName = localStorage.getItem("EntityName");
		if ((newImageUrl && newImageUrl !== lastLoadedImageUrl) || (newName && newName !== lastLoadedImageName)) {
			lastLoadedImageUrl = newImageUrl;
			lastLoadedImageName = newName;
			displayedImage.onload = () => {
				// Fade in when loaded
				displayedImage.style.opacity = 1;
				nameContainer.style.opacity = 1;
			};
			// Fade out before loading new image
			displayedImage.style.opacity = 0;
			nameContainer.style.opacity = 0;
			setTimeout(() => {
				displayedImage.src = newImageUrl;
				displayedImage.alt = newName;
				nameContainer.innerHTML = null;
				const namedParts = newName.toString().toUpperCase().split(" ");
				namedParts.forEach((part) => {
					let nameSegment = document.createElement("div");
					nameSegment.textContent = part;
					nameSegment.style.textAlign = "center";
					nameContainer.appendChild(nameSegment);
				});
			}, 1000);
		}
	}

	function togglePopup() {
		if (popupForm.style.display === "block") {
			popupForm.style.display = "none";
		} else {
			popupForm.style.display = "block";
			imageUrlInput.value = currentImageUrl;
		}
	}

	updateButton.addEventListener("click", function () {
		togglePopup();
	});

	window.addEventListener("click", function (event) {
		if (event.target === popupForm) {
			togglePopup();
		}
	});

	document.getElementById("popupForm").addEventListener("click", function (event) {
		event.stopPropagation();
	});

	function updateImageURL() {
		const newUrl = imageUrlInput.value;
		if (newUrl !== currentImageUrl) {
			currentImageUrl = newUrl;
			localStorage.setItem("currentImageUrl", newUrl);
			localStorage.setItem("EntityCategory", "");
			localStorage.setItem("EntityName", "");
			updateImage();
		}
		togglePopup();
	}

	imageUrlInput.addEventListener("keyup", function (event) {
		if (event.key === "Enter") {
			updateImageURL();
		}
	});

	document.getElementById("submitUrl").addEventListener("click", function () {
		updateImageURL();
	});

	updateImage();

	setInterval(updateImage, 2000);
});

window.addEventListener("message", function (event) {
	// Always verify the origin for security reasons in production
	// if (event.origin !== "http://localhost") return;
	if (event.data.type && event.data.type === "FROM_EXTENSION") {
		localStorage.setItem("currentImageUrl", event.data.imageUrl);
		localStorage.setItem("EntityCategory", event.data.EntityCategory);
		localStorage.setItem("EntityName", event.data.EntityName);
	}
});
