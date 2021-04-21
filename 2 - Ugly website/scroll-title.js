window.__scrollingTitle = {
  currentIndex: 0,
  intervalKey: null,
}

/**
 * Scrolls the document title.
 *
 * @param {string} text Text to scroll
 */
function scrollTitle(text) {
  let currentText = text + ' - '
  document.title = currentText

  window.__scrollingTitle.intervalKey = setInterval(() => {
    currentText = currentText.substr(1) + currentText.substr(0, 1)
    document.title = currentText
  }, 250)
}

function stopScrollTitle() {
  clearInterval(window.__scrollingTitle.intervalKey)
}
