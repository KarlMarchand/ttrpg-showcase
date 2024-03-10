document.addEventListener("DOMContentLoaded", function () {
	const displayedImage = document.getElementById("displayedImage");
	const updateButton = document.getElementById("updateButton");
	const popupForm = document.getElementById("popupForm");
	const imageUrlInput = document.getElementById("imageUrlInput");
	let currentImageUrl = localStorage.getItem("currentImageUrl") || "";
	let lastLoadedImageUrl = "";

	function updateImage() {
		const newImageUrl = localStorage.getItem("currentImageUrl");
		if (newImageUrl && newImageUrl !== lastLoadedImageUrl) {
			lastLoadedImageUrl = newImageUrl;
			displayedImage.onload = () => {
				displayedImage.style.opacity = 1; // Fade in when loaded
			};
			displayedImage.style.opacity = 0; // Fade out before loading new image
			setTimeout(() => {
				displayedImage.src = newImageUrl;
				displayedImage.alt = "Displayed Image";
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

	// Poll for changes in local storage every 2 seconds
	setInterval(updateImage, 2000);
});

window.addEventListener("message", function (event) {
	// Always verify the origin for security reasons in production
	// if (event.origin !== "http://localhost") return;
	if (event.data.type && event.data.type === "FROM_EXTENSION") {
		localStorage.setItem("currentImageUrl", event.data.imageUrl);
	}
});
