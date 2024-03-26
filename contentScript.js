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
  const darkStyles = `
    body, div, p, h1, h2, h3, h4, h5, h6 {
      background-color: #121212 !important;
      color: #ffffff !important;
    }
    /* Add more styles as needed */
  `;

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
