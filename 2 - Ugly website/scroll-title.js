window.__scrollingTitle = {
  currentIndex: 0,
  intervalKey: null,
};

/**
 * Scrolls the document title.
 *
 * @param {string} text Text to scroll
 */
function scrollTitle(text) {
  window.__scrollingTitle.intervalKey = setInterval(() => {
    if (window.__scrollingTitle.currentIndex === text.length) {
      document.title = "\u200E";
    } else {
      document.title =
        substring(text, window.__scrollingTitle.currentIndex, 10) || "\u200E";
    }

    window.__scrollingTitle.currentIndex++;

    if (window.__scrollingTitle.currentIndex > text.length) {
      window.__scrollingTitle.currentIndex = 0;
    }
  }, 250);
}

function stopScrollTitle() {
  clearInterval(window.__scrollingTitle.intervalKey);
}

function substring(text, start, length) {
  return text.substr(start, length);
}
