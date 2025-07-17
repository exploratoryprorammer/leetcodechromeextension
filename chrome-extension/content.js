"use strict";
console.log("✅ Content script loaded on", window.location.href);
function extractProblem() {
    const title = document.querySelector("h1")?.textContent?.trim() ||
        document.querySelector("div.text-title-large")?.textContent?.trim() ||
        "";
    const description = document.querySelector("div[data-track-load='description_content']")?.textContent?.trim() ||
        document.querySelector(".elfjS")?.textContent?.trim() ||
        "";
    if (title && description) {
        console.log("✅ LeetCode Problem Data:", { title, description });
        observer.disconnect(); // Stop observing once we got it
    }
}
const observer = new MutationObserver(() => extractProblem());
observer.observe(document.body, { childList: true, subtree: true });
extractProblem(); // run once in case it’s already loaded
