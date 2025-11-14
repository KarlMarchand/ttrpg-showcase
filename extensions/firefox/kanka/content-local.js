console.log("[LOCAL] content-local.js loaded on", window.location.href);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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