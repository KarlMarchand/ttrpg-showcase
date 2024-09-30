chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Local received showcase data");
  if (request.action === "setShowcaseData") {
    window.postMessage(
      {
        type: "FROM_EXTENSION",
        imageUrl: request.imageUrl,
        imageTitle: request.imageTitle,
      },
      "http://localhost:5173"
    );
  }
});
