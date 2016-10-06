/**
 * Simple directive for mocking tap event
 */
export default {
  name: 'tap',
  bind (el, { value }) {
    const threshold = window.innerWidth / 10
    let start
    el.addEventListener('touchstart', e => {
      start = null
      if (e.touches && e.touches.length === 1) {
        start = e.touches[0]
      }
    })
    el.addEventListener('touchmove', e => {
      if (start) {
        if (Math.sqrt(Math.pow(e.touches[0].pageX - start.pageX, 2) + Math.pow(e.touches[0].pageY - start.pageY, 2)) > threshold) {
          start = null
        }
      }
    })
    el.addEventListener('touchend', e => {
      if (start) {
        if (typeof value === 'function') {
          value()
        }
        // dispatch a tap event
        const tapEvent = document.createEvent('HTMLEvents')
        tapEvent.initEvent('tap', true, true)
        el.dispatchEvent(tapEvent)
      }
      start = null
    })
  }
}
