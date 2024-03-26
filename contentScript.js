let isDarkModeEnabled = false;

chrome.storage.sync.get(
  "isDarkModeEnabled",
  ({ isDarkModeEnabled: storedIsDarkModeEnabled }) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    isDarkModeEnabled = storedIsDarkModeEnabled;
    if (isDarkModeEnabled) {
      applyDarkTheme();
    }
  }
);

function applyDarkTheme() {
  //p, h1, h2, h3, h4, h5, h6
  const darkStyles = `
  *, html, body {
    font-family: sans-serif;
  }
    body, div {
      background-color: #121212 !important;
      color: #ffffff !important;
    }
    /* Add more styles as needed */
    a {
        color: #cccccc !important;
    }
    a:hover {
        color: #ffffff !important;
    }
    a:focus {
        color: #dddddd !important;
    }
    input[type="text"] {
        background-color: white !important;
        color: #000000 !important;
    }
    input[type="radio"]{
        background-color: gray !important;
        color: black !important;
    }
    .active input[type="radio"]{
        background-color: white !important;
        color: black !important;
    }
  `;
  //TODO: loop through elements and go with the oposite style when it comes to color but for background make it gray if its not white color
  const styleElement = document.createElement("style");
  styleElement.textContent = darkStyles;
  document.head.appendChild(styleElement);
}

chrome.storage.onChanged.addListener((changes) => {
  if (changes.isDarkModeEnabled) {
    isDarkModeEnabled = changes.isDarkModeEnabled.newValue;
    if (isDarkModeEnabled) {
      applyDarkTheme();
    } else {
      // Remove dark theme
      const styleElement = document.querySelector("style");
      if (styleElement) {
        styleElement.remove();
      }
    }
  }
});

// Error handling
window.addEventListener("error", (error) => {
  console.error("Content script error:", error);
});
