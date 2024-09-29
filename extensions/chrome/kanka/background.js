chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "setShowcaseData") {
    console.log("Sending data to showcase");
    chrome.tabs.query({ url: "http://localhost:5173/*" }, function (tabs) {
      tabs.forEach(function (tab) {
        chrome.tabs.sendMessage(tab.id, {
          action: "setShowcaseData",
          url: request.url,
          EntityCategory: request.EntityCategory,
          EntityName: request.EntityName,
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
