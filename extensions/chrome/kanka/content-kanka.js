function createShowcaseLink(id, text, className, style, callback) {
  const link = document.createElement("a");
  link.id = id;
  link.className = className;
  link.style = style;
  link.textContent = text;
  link.addEventListener("click", function (e) {
    e.preventDefault();
    callback();
  });

  return link;
}

function createShowcaseOptions() {
  const showcaseOptions = document.createElement("div");
  showcaseOptions.id = "ttrpgShowcaseOptions";
  showcaseOptions.append(document.createElement("hr"));

  const viewImageLink = document.querySelector(
    ".entity-header-image .tippy-box a"
  );
  const className = viewImageLink.className;
  const style = "cursor: pointer";

  showcaseOptions.append(
    createShowcaseLink(
      "showcaseImageLink",
      "Showcase image",
      className,
      style,
      () => sendMessage()
    )
  );

  showcaseOptions.append(
    createShowcaseLink(
      "showcaseImageAndTitleLink",
      "Showcase image and title",
      className,
      style,
      () => sendMessage({ showImageTitle: true })
    )
  );

  document
    .querySelector(".entity-header-image .tippy-content > div")
    .append(showcaseOptions);
}

function sendMessage({ showImageTitle = false } = {}) {
  const viewImageLink = document.querySelector(
    ".entity-header-image .tippy-box a:nth-child(1)"
  );
  const imageUrl = viewImageLink ? viewImageLink.getAttribute("href") : "";
  const imageTitle = document
    .querySelector("head > title")
    .innerHTML.split(" - ")[0];

  chrome.runtime.sendMessage(
    {
      action: "setShowcaseData",
      imageUrl: imageUrl,
      imageTitle: showImageTitle ? imageTitle : "",
    },
    (response) => {
      console.log("Response:", response);
    }
  );
}

document
  .querySelector(".entity-header-image")
  ?.addEventListener("click", function () {
    if (!document.getElementById("ttrpgShowcaseOptions")) {
      createShowcaseOptions();
    }
  });
