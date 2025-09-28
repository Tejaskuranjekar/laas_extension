chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg === "GET_SELECTION") {
    const sel = window.getSelection().toString();
    sendResponse({ text: sel });
  }
});