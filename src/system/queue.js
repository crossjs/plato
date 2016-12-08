import i18n from 'system/modules/i18n'
import auth from 'system/modules/auth'
import core from 'system/modules/core'

let middlewares = []
const callbacks = []

export function use (...args) {
  middlewares = middlewares.concat(args)
}

export function run (context, finale) {
  if (finale) {
    callbacks.push(finale)
  }

  // protected modules
  use(
    i18n({
      prefix: '/'
    }),
    auth({
      prefix: '/'
    }),
    core({
      prefix: '/'
    }),
  )

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
