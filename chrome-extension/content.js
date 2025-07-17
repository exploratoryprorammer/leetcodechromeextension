"use strict";
function extractProblem() {
    const title = document.querySelector("h1")?.textContent?.trim() || "";
    const description = document.querySelector("div[data-track-load='description_content']")?.textContent?.trim() || "";
    if (title && description) {
        console.log("✅ LeetCode Problem Data:", { title, description });
    }
}
// Observe DOM changes (LeetCode loads content dynamically)
const observer = new MutationObserver(() => extractProblem());
observer.observe(document.body, { childList: true, subtree: true });
// Run once immediately in case it's already loaded
extractProblem();
