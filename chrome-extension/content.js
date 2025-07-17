"use strict";
console.log("✅ Content script loaded and running.");
// --- Problem extraction ---
function extractProblem() {
    const title = document.querySelector("h1")?.textContent?.trim() ||
        document.querySelector("div.text-title-large")?.textContent?.trim() ||
        "";
    const description = document.querySelector("div[data-track-load='description_content']")?.textContent?.trim() ||
        document.querySelector(".elfjS")?.textContent?.trim() ||
        "";
    if (title && description) {
        console.log("✅ LeetCode Problem Data:", { title, description });
        observer.disconnect(); // Stop observing once problem is found
    }
}
const observer = new MutationObserver(() => extractProblem());
observer.observe(document.body, { childList: true, subtree: true });
extractProblem(); // run once immediately in case it's loaded already
// --- Live code editor input capture ---
function getEditorElement() {
    return document.querySelector(".monaco-editor") || document.querySelector(".view-lines");
}
function debounce(func, wait) {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = window.setTimeout(func, wait);
    };
}
const logCode = debounce(() => {
    const editor = getEditorElement();
    if (!editor)
        return;
    const lines = editor.querySelectorAll(".view-line");
    let code = "";
    lines.forEach((line) => {
        code += line.innerText + "\n";
    });
    console.clear();
    console.log("📄 Current code typed:\n", code);
}, 300);
function setupInputListener() {
    const editor = getEditorElement();
    if (!editor) {
        setTimeout(setupInputListener, 500);
        return;
    }
    console.log("✅ Editor found, listening for input changes.");
    editor.addEventListener("keyup", logCode);
}
setupInputListener();
