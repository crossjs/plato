import Vue from 'vue'
import Validator from './plugins/validator'
import tap from './directives/tap'
import drag from './directives/drag'

import core from 'system/modules/core'
import config from 'system/modules/config'
import i18n from 'system/modules/i18n'
import router from 'system/modules/router'

import merge from 'utils/merge'
import { group, log, groupEnd } from 'utils/console'

/**
 * Plugins
 */

// (表单)验证，如果未使用，请移除
Vue.use(Validator)

/**
 * Directives
 */

// tap event
Vue.directive('tap', tap)
// drag event
Vue.directive('drag', drag)

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

  function registerRoutes (name, prefix = '', routes) {
    function injector (module) {
      // add name as vm.$options.__name
      if (module) {
        if (__DEV__) {
          module._Ctor[0].options.__name = name
        } else {
          module.__name = name
        }
      }
      return module
    }
    function injectDataToVm (component) {
      if (isFunction(component)) {
        return () => component().then(injector).catch(injector)
      } else {
        return injector(component)
      }
    }
    function addPrefixToPath (path) {
      return `/${prefix}/${path}`.replace(/\/+$/, '').replace(/\/\/+/g, '/') || '/'
    }
    function handleRoutes (prefix, arr) {
      return arr.map(r => {
        const { path, meta = {}, component, components, children } = r
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
            components[key] = injectDataToVm(components[key])
          })
        }
        if (children) {
          r.children = handleRoutes(r.path, r.children)
        }
        return r
      })
    }
    _routes.push.apply(_routes, handleRoutes(prefix, routes))
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
    // will merge store to module `config`
    { creator: i18n, identity: 'SYSTEM/I18N', name: 'config' },
    { creator: router, identity: 'SYSTEM/ROUTER', name: 'config' }
  )

  group('[PLATO] Module registering')

  ;(function next () {
    const middleware = middlewares.shift()

    if (middleware) {
      const { creator, identity, name, prefix } = middleware
      // fn(context, options, register)
      creator(context, middleware, ({ store, routes, translations } = {}, callback) => {
        callback && callbacks.push(callback)
        store && registerModule(name, store)
        routes && registerRoutes(name, prefix || name, routes)
        translations && registerTranslations(name, translations)
        log(`Module "%c${identity || '?'}"%c registered`, 'color: green', 'color: inherit')
        next()
      })
    } else {
      log('ALL modules have been registered')
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
