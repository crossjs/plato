import Vue from 'vue'
import merge from 'utils/merge'
import { error } from 'utils/console'

const middlewares = []
const callbacks = []

export function use (creator, { scope, prefix }) {
  if (typeof creator !== 'function') {
    return error('`creator` must be a function')
  }
  if (!scope) {
    return error('`scope` must be a non-empty string')
  }
  middlewares.push({ creator, scope, prefix })
}

export function run (finale) {
  const _modules = {}
  const _routes = []

  const context = new Vue({
    data: {
      // for Vuex.Store
      modules: _modules,
      // for Vue-Router
      routes: _routes
    }
  })

  function registerModule (key, obj) {
    if (_modules[key]) {
      merge(_modules[key], obj)
    } else {
      _modules[key] = obj
    }
  }

  function registerRoutes (scope, prefix, routes) {
    function injector (module) {
      // add scope as vm.$options.__scope
      if (module) {
        if (__DEV__) {
          module._Ctor[0].options.__scope = scope
        } else {
          module.__scope = scope
        }
      }
      return module
    }
    function injectscopeToVm (component) {
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
        meta.__scope = scope
        meta.__path = path
        r.meta = meta
        // inject component and components
        if (component) {
          r.component = injectscopeToVm(component)
        }
        if (components) {
          Object.keys(components).forEach(key => {
            components[key] = injectscopeToVm(components[key])
          })
        }
        if (children) {
          r.children = handleRoutes(r.path, r.children)
        }
        return r
      })
    }
    _routes.push.apply(_routes, handleRoutes(prefix || scope, routes))
  }

  function done () {
    let callback
    while ((callback = callbacks.pop())) {
      callback(context)
    }

    if (finale) {
      finale(context)
    }
  }

  function next () {
    const middleware = middlewares.shift()

    if (middleware) {
      const { creator, scope, prefix } = middleware
      // creator: fn(context, options, register)
      creator(context, middleware, (payload, callback) => {
        if (typeof payload === 'function') {
          callback = payload
          payload = null
        }
        callback && callbacks.push(callback)
        if (payload) {
          const { store, routes } = payload
          store && registerModule(scope, store)
          routes && registerRoutes(scope, prefix, routes)
        }
        next()
      })
    } else {
      done()
    }
  }

  next()
}

function isFunction (val) {
  return typeof val === 'function'
}
