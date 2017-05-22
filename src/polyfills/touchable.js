/**
 * 在 PC 端模拟触摸事件
 */
(function (doc) {
  if ('ontouchstart' in doc) {
    return
  }

  function dispatchTouchEvent (name, originalEvent) {
    let event

    try {
      // Not supported in some versions of Android's old WebKit-based WebView
      // use document.createEvent() instead
      event = new Event(name, originalEvent)
    } catch (e) {
      event = doc.createEvent('HTMLEvents')
      event.initEvent(name, !!originalEvent.bubbles, !!originalEvent.cancelable)
    }

    Object.assign(event, {
      originalEvent,
      touches: [{
        pageX: originalEvent.pageX,
        pageY: originalEvent.pageY
      }]
    })

    originalEvent.target.dispatchEvent(event)
    if (event.defaultPrevented) {
      originalEvent.preventDefault()
      // 阻止点击事件
      if (name === 'touchend') {
        originalEvent.target.addEventListener('click', e => {
          e.preventDefault()
        })
      }
    }
    if (event.cancelBubble) {
      originalEvent.stopPropagation()
    }
  }

  const eventMap = {
    mousedown: 'touchstart',
    mousemove: 'touchmove',
    mouseout: 'touchcancel',
    mouseup: 'touchend'
  }

  Object.keys(eventMap).forEach(key => {
    doc.addEventListener(key, function (event) {
      dispatchTouchEvent(eventMap[key], event)
    }, false)
  })
})(document)
