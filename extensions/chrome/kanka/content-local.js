chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Local received showcase data");
  if (request.action === "setShowcaseData") {
    window.postMessage(
      {
        type: "FROM_EXTENSION",
        imageUrl: request.url,
        EntityCategory: request.EntityCategory,
        EntityName: request.EntityName,
      },
      "http://localhost:5173"
    ); // Adjust target origin as necessary
  }
});
