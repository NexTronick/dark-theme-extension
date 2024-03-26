document.addEventListener("DOMContentLoaded", () => {
  const darkModeCheckbox = document.getElementById("darkModeCheckbox");

  chrome.storage.sync.get("isDarkModeEnabled", ({ isDarkModeEnabled }) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    darkModeCheckbox.checked = isDarkModeEnabled;
  });

  darkModeCheckbox.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    chrome.storage.sync.set({ isDarkModeEnabled: isChecked }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
    });
  });
});
