import core from 'system/modules/core'
import config from 'system/modules/config'
import i18n from 'system/modules/i18n'
import path from 'system/modules/path'

import merge from 'utils/merge'
import { group, log, groupEnd } from 'utils/console'

const middlewares = []
const callbacks = []

export function use (middleware) {
  middlewares.push(middleware)
}

export function run (finale) {
  const _modules = {}
  const _routes = []
  const _translations = {}

  const context = {
    // for Vuex.Store
    modules: _modules,
    // for Vue-Router
    routes: _routes,
    translations: _translations
  }

  function registerModule (key, obj) {
    if (_modules.hasOwnProperty(key)) {
      merge(_modules[key], obj)
    } else {
      _modules[key] = obj
    }
  }

  function registerRoutes (name, prefix = '', arr) {
    function injectDataToVm (component) {
      function injector (module) {
        // add name as vm.$options.__name
        module._Ctor[0].options.__name = name
        return module
      }
      if (isFunction(component)) {
        return () => component().then(injector).catch(injector)
      } else {
        return injector(component)
      }
    }
    function addPrefixToPath (path) {
      return `/${prefix}/${path}`.replace(/\/+$/, '').replace(/\/\/+/g, '/') || '/'
    }
    arr.forEach(r => {
      const { path, meta = {}, component, components } = r
      r.path = addPrefixToPath(path)
      // store original path to meta
      meta.__name = name
      meta.__path = path
      r.meta = meta
      // inject component and components
      if (component) {
        r.component = injectDataToVm(component)
      }
      if (components) {
        Object.keys(components).forEach(key => {
          if (isFunction(components[key])) {
            components[key] = injectDataToVm(components[key])
          }
        })
      }
      _routes.push(r)
    })
  }

  function registerTranslations (key, obj) {
    if (_translations.hasOwnProperty(key)) {
      merge(_translations[key], obj)
    } else {
      _translations[key] = obj
    }
  }

  // protected middlewares
  middlewares.unshift(
    { creator: core, identity: 'SYSTEM/CORE', name: 'core' },
    { creator: config, identity: 'SYSTEM/CONFIG', name: 'config' },
    // use `config` as name
    // merge store to module `config`
    { creator: i18n, identity: 'SYSTEM/I18N', name: 'config' },
    { creator: path, identity: 'SYSTEM/PATH', name: 'config' }
  )

  group('[PLATO] Module registering')

  ;(function next () {
    const middleware = middlewares.shift()

    if (middleware) {
      const { creator, identity, name, prefix } = middleware
      // fn(context, options, register)
      creator(context, middleware, ({ store, routes, translations }, callback) => {
        callback && callbacks.push(callback)
        store && registerModule(name, store)
        routes && registerRoutes(name, prefix || name, routes)
        translations && registerTranslations(name, translations)
        log(`Module "%c${identity || '?'}"%c registered`, 'color: green', 'color: inherit')
        next()
      })
    } else {
      log('ALL modules were registered')
      groupEnd()
      callbacks.forEach(callback => callback(context))

      if (finale) {
        finale(context)
      }
    }
  })()
}

function isFunction (val) {
  return typeof val === 'function'
}
