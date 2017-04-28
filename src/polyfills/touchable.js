(function () {
  if ('ontouchstart' in document) {
    return
  }

  function dispatchTouchEvent (name, originalEvent) {
    let event

    try {
      // Not supported in some versions of Android's old WebKit-based WebView
      // use document.createTouchEvent() instead
      event = new Event(name, originalEvent)
    } catch (e) {
      event = document.createEvent('CustomEvent')
      event.initCustomEvent(name, !!originalEvent.bubbles, !!originalEvent.cancelable)
    }

    Object.assign(event, {
      originalEvent,
      touches: [{
        pageX: originalEvent.pageX,
        pageY: originalEvent.pageY
      }]
    })

    originalEvent.target.dispatchEvent(event)
  }

  const eventMap = {
    mousedown: 'touchstart',
    mousemove: 'touchmove',
    mouseup: 'touchend'
  }

  Object.keys(eventMap).forEach(key => {
    document.addEventListener(key, function (event) {
      dispatchTouchEvent(eventMap[key], event)
    }, false)
  })
})()
