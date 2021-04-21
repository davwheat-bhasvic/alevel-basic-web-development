$btnContainer = document.querySelector('#click-the-button--btn')
$btn = $btnContainer.querySelector('button')

/**
 * The distance to move by when the button is approached by the cursor.
 */
const DIST_TO_MOVE = 80

$btn.addEventListener('click', () => {
  alert('CHEATER')
})

/**
 * Detect when the cursor enters a small area containing the box.
 *
 * We use this to determine when we should move the box away.
 */
$btnContainer.addEventListener('mouseenter', e => {
  const { offsetX: mouseX, offsetY: mouseY } = e

  const { clientWidth: width, clientHeight: height, offsetTop, offsetLeft } = e.target

  const centreX = offsetLeft + width / 2
  const centreY = offsetTop + height / 2

  const angleBetweenMouseAndBtn = angle(centreX, centreY, mouseX, mouseY)

  const quadrant = Math.floor(angleBetweenMouseAndBtn / 90)
  const angleInQuadrant = angleBetweenMouseAndBtn % 90
  const angleInQuadrantRad = angleInQuadrant / (180 / Math.PI)

  const sinDist = DIST_TO_MOVE * Math.sin(angleInQuadrantRad)
  const cosDist = DIST_TO_MOVE * Math.cos(angleInQuadrantRad)

  let deltaX, deltaY

  if (quadrant === 0 || quadrant === 2) {
    deltaX = cosDist
    deltaY = sinDist
  } else {
    deltaX = sinDist
    deltaY = cosDist
  }

  if (quadrant === 3 || quadrant === 0) deltaX = -deltaX
  if (quadrant === 1 || quadrant === 0) deltaY = -deltaY

  if (willElBeOutsideParent($btnContainer, deltaX, deltaY)) {
    const r = randomisePositionWithinParent($btnContainer)

    deltaX = r.x
    deltaY = r.y

    $btnContainer.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  } else {
    const currentTransform = getTranslateXY($btnContainer)

    $btnContainer.style.transform = `translate(${currentTransform.translateX + deltaX}px, ${currentTransform.translateY + deltaY}px)`
  }
})

function getTranslateXY(element) {
  const style = window.getComputedStyle(element)
  const matrix = new DOMMatrixReadOnly(style.transform)
  return {
    translateX: matrix.m41,
    translateY: matrix.m42,
  }
}

function randomisePositionWithinParent(element) {
  const { clientWidth: width, clientHeight: height } = element
  const { clientWidth: pWidth, clientHeight: pHeight } = element.parentElement

  const rangeX = pWidth - width
  const rangeY = pHeight - height

  return {
    x: randomBetween(0, rangeX) + width / 2,
    y: randomBetween(0, rangeY) + height / 2,
  }
}

function randomBetween(min, max) {
  return Math.random() * max + min
}

function angle(cx, cy, ex, ey) {
  var dy = ey - cy
  var dx = ex - cx
  var theta = Math.atan2(dy, dx) // range (-PI, PI]
  theta *= 180 / Math.PI // rads to degs, range (-180, 180]
  if (theta < 0) theta = 360 + theta // range [0, 360)
  return theta
}

function willElBeOutsideParent(element, deltaX, deltaY) {
  const parent = element.parentElement

  const parentBounds = parent.getBoundingClientRect()
  const elBounds = element.getBoundingClientRect()

  console.log(elBounds, parentBounds)

  return (
    elBounds.right + deltaX > parentBounds.right ||
    elBounds.left + deltaX < parentBounds.left ||
    elBounds.bottom + deltaY > parentBounds.bottom ||
    elBounds.top + deltaY < parentBounds.top
  )
}
