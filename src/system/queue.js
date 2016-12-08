import config from 'system/modules/config'
import i18n from 'system/modules/i18n'
import route from 'system/modules/route'
import core from 'system/modules/core'

import merge from 'utils/merge'

const middlewares = []
const callbacks = []

export function use (creator, options) {
  middlewares.push({ creator, options })
}

export function run (finale) {
  const modules = {}
  const routes = []
  const translations = {}

  const context = {
    modules,
    routes,
    translations,
    registerModule (obj) {
      Object.keys(obj).forEach(key => {
        if (modules.hasOwnProperty(key)) {
          merge(modules[key], obj[key])
        } else {
          modules[key] = obj[key]
        }
      })
    },
    registerRoutes (arr) {
      routes.push.apply(routes, arr)
    },
    registerTranslations (obj) {
      Object.keys(obj).forEach(key => {
        if (translations.hasOwnProperty(key)) {
          merge(translations[key], obj[key])
        } else {
          translations[key] = obj[key]
        }
      })
    }
  }

  if (finale) {
    callbacks.push(finale)
  }

  // protected middlewares
  middlewares.unshift({ creator: config })
  middlewares.unshift({ creator: i18n })
  middlewares.unshift({ creator: route })
  middlewares.push({ creator: core })

  ;(function next () {
    const middleware = middlewares.shift()

    if (middleware) {
      const { creator, options } = middleware
      creator(context, options, callback => {
        if (callback) {
          callbacks.unshift(callback)
        }
        next()
      })
    } else {
      callbacks.forEach(callback => callback(context))
    }
  })()
}
