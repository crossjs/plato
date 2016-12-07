import _core from 'modules/_core'

let middlewares = []
const callbacks = []

export function use (...args) {
  middlewares = middlewares.concat(args)
}

export function run (context) {
  // protected module
  use(_core({
    prefix: '/'
  }))

  let i = 0

  ;(function exec () {
    const middleware = middlewares[i++]

    if (middleware) {
      middleware(context, (context, callback) => {
        if (callback) {
          callbacks.unshift(callback)
        }
        exec()
      })
    } else {
      callbacks.forEach(callback => callback(context))
    }
  })()
}
