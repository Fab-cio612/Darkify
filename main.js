chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ active: false });
  });

//whenever a page is loaded if darkify is turned on it should be turned into dark mode
chrome.webNavigation.onDOMContentLoaded.addListener(({ tabId }) => {
  chrome.storage.sync.get("active", ({ active }) => {
    if(active){
      
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["./colors.js", "./darkify.js"],
      });
    }
  });
});