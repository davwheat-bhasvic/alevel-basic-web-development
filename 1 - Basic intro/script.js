const confettiConfig = {
  target: 'confetti-canvas',
  max: '120',
  size: '0.75',
  animate: true,
  props: ['circle', 'square', 'triangle', 'line'],
  colors: [
    [165, 104, 246],
    [230, 61, 135],
    [0, 199, 228],
    [253, 214, 126],
  ],
  clock: '25',
  rotate: true,
  width: '',
  height: '',
  start_from_edge: true,
  respawn: true,
}

const angryConfettiConfig = {
  target: 'confetti-canvas',
  max: '120',
  size: '1.5',
  animate: true,
  props: ['circle', 'square', 'triangle', 'line', { type: 'svg', src: 'angry.svg', size: 25, weight: 1 }],
  colors: [[255, 0, 0]],
  clock: '25',
  rotate: true,
  width: '',
  height: '',
  start_from_edge: false,
  respawn: true,
}

const Confetti = new ConfettiGenerator(confettiConfig)
const AngryConfetti = new ConfettiGenerator(angryConfettiConfig)
const canvas = document.getElementById(confettiConfig.target)

document.getElementById('date-button').addEventListener('click', function () {
  document.getElementById('date-container').innerText = new Date().toLocaleString()
})

document.querySelector('#quiz form').addEventListener('submit', function (e) {
  // Stop the page reloading on submit
  e.preventDefault()

  const isCorrect = isQuizCorrect(this.elements)

  if (isCorrect) {
    startConfetti(7500)
  } else {
    startConfetti(7500, AngryConfetti)
  }
})

/**
 * @param {HTMLFormControlsCollection} formElements
 */
function isQuizCorrect(formElements) {
  let isCorrect = true

  if (formElements.cool.value === 'no') isCorrect = false

  return isCorrect
}

function isCelebrating() {
  return canvas.classList.contains('celebrating')
}

/**
 * @param {number} timeout Time before the confetti stops
 */
function startConfetti(timeout = -1, confetti = Confetti) {
  if (isCelebrating()) return

  canvas.classList.add('celebrating')
  confetti.render()

  timeout > 0 && setTimeout(stopConfetti.bind(confetti), timeout)
}

function stopConfetti() {
  if (!isCelebrating()) return

  const confetti = this

  function end() {
    // Remove the confetti after the canvas opacity is 0
    confetti.clear()

    // Remove the event listener after we've finished running it
    canvas.removeEventListener('transitionend', this)
  }

  canvas.addEventListener('transitionend', end.bind(end))
  canvas.classList.remove('celebrating')
}
