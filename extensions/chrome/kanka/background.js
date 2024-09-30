chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "setShowcaseData") {
    console.log("Sending data to showcase");
    chrome.tabs.query({ url: "http://localhost:5173/*" }, function (tabs) {
      tabs.forEach(function (tab) {
        chrome.tabs.sendMessage(tab.id, {
          action: "setShowcaseData",
          imageUrl: request.imageUrl,
          imageTitle: request.imageTitle,
        });
      });
      sendResponse({
        status: "success",
        message: "Data sent successfully",
      });
    });
    return true;
  }
});
