document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["summaryLength", "darkMode"], (items) => {
    if (items.summaryLength)
      document.getElementById("summaryLength").value = items.summaryLength;
    if (items.darkMode)
      document.getElementById("darkMode").checked = items.darkMode;
  });

  document.getElementById("saveBtn").addEventListener("click", () => {
    const summaryLength = document.getElementById("summaryLength").value;
    const darkMode = document.getElementById("darkMode").checked;
    chrome.storage.local.set({ summaryLength, darkMode }, () => {
      document.getElementById("status").innerText = "✅ Saved!";
      setTimeout(() => (document.getElementById("status").innerText = ""), 2000);
    });
  });
});