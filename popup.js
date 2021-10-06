const checkbox = document.getElementById("checkbox");
const slider = document.getElementsByClassName("slider")[0];

chrome.storage.sync.get("active", ({ active }) => {
    checkbox.checked = active;
});

checkbox.addEventListener("click", () => {
    chrome.storage.sync.get("active", ({ active }) => {
    chrome.storage.sync.set({ active: !active });
    });
});