chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "setShowcaseData") {
    // Get ALL tabs, then we manually pick the localhost:5173 ones
    chrome.tabs.query({}, function (allTabs) {
      allTabs.forEach(t => console.log("   -", t.id, t.url));

      // Manually filter for the showcase tab(s)
      const showcaseTabs = allTabs.filter(
          t => t.url && t.url.startsWith("http://localhost:5173/")
      );

      showcaseTabs.forEach(function (tab) {
        chrome.tabs.sendMessage(tab.id, {
          action: "setShowcaseData",
          imageUrl: request.imageUrl,
          imageTitle: request.imageTitle,
        });
      });

      sendResponse({
        status: "success",
        message: "Data sent successfully",
        tabsFound: showcaseTabs.length
      });
    });

    return true; // keep sendResponse async
  }
});