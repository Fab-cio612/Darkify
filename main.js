import { isDark } from "./colors";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ active: false });
  });

//whenever a page is loaded if darkify is turned on it should be turned into dark mode
chrome.webNavigation.onDOMContentLoaded.addListener(({ tabId }) => {
  chrome.storage.sync.get("active", ({ active }) => {
    if(active){
      
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: darkify,
      });
    }
  });
});

function darkify(){
  //check if already dark mode
  //if most of the text is in a dark color we can assume it's light mode
  let textEls = [
    ...document.getElementsByTagName("h1"),
    ...document.getElementsByTagName("h2"),
    ...document.getElementsByTagName("h3"),
    ...document.getElementsByTagName("h4"),
    ...document.getElementsByTagName("h5"),
    ...document.getElementsByTagName("h6"),
    ...document.getElementsByTagName("p"),
    ...document.getElementsByTagName("span")
  ];

  //number that will be used to measure how "dark" the text is overall
  let darkness = 0;

  textEls.forEach(c => {
    darkness = isDark(c) ? darkness + 1 : darkness - 1;
  });

  console.log(darkness);
}