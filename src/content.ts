function extractProblem() {
  const title = document.querySelector("h1")?.textContent?.trim() || "";
  const description =
    document.querySelector("div[data-track-load='description_content']")?.textContent?.trim() || "";
  if (title && description) {
    console.log("✅ LeetCode Problem Data:", { title, description });
  }
}

// Create a MutationObserver to watch for DOM changes
const observer = new MutationObserver(() => extractProblem());

// Start observing the whole page
observer.observe(document.body, { childList: true, subtree: true });

// (Optional) Run it once immediately in case content is already loaded
extractProblem();
