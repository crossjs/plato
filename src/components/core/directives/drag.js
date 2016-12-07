/**
 * Simple directive for dragging events
 */
export default {
  name: 'drag',
  bind (el, { value, modifiers }) {
    let startPoint = null
    let direction
    el.addEventListener('touchstart', e => {
      startPoint = null
      if (e.touches && e.touches.length === 1) {
        startPoint = {
          pageX: e.touches[0].pageX,
          pageY: e.touches[0].pageY
        }
        el.dispatchEvent(createEvent('dragstart', { originalEvent: e }))
      }
    })
    el.addEventListener('touchmove', e => {
      if (!startPoint) {
        return
      }

      // set drag direction's value after touchstart
      // and never change it until touchend
      if (!direction) {
        direction = isHorizontal(e.touches[0], startPoint) ? 'horizontal' : 'vertical'
      }

      // don't dispatch drag event when modifiers don't match drag direction
      if ((modifiers.horizontal && !modifiers.vertical && direction === 'vertical') ||
          (modifiers.vertical && !modifiers.horizontal && direction === 'horizontal')) {
        return
      }
      el.dispatchEvent(createEvent('drag', { originalEvent: e }))
    })
    el.addEventListener('touchend', e => {
      if (direction) {
        direction = null
      }
      if (startPoint) {
        startPoint = null
        el.dispatchEvent(createEvent('dragend', { originalEvent: e }))
      }
    })
  }
}

function createEvent (name, mixins = {}) {
  const tapEvent = document.createEvent('HTMLEvents')
  tapEvent.initEvent(name, true, true)
  return Object.assign(tapEvent, mixins)
}

function isHorizontal (to, from) {
  return Math.abs(to.pageX - from.pageX) > Math.abs(to.pageY - from.pageY)
}

// function isVertical (to, from) {
//   return Math.abs(to.pageX - from.pageX) < Math.abs(to.pageY - from.pageY)
// }
