import Vue from 'vue'
import merge from 'utils/merge'
import { groupEnd, group, log, error } from 'utils/console'

const middlewares = []
const callbacks = []

export function use (creator, options = {}) {
  if (typeof creator !== 'function') {
    return error('`creator` must be a function')
  }
  middlewares.push({ creator, options })
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
    log('%c[PLATO] %cExecuting module callbacks', 'font-weight: bold', 'color: green; font-weight: bold')
    let callback
    while ((callback = callbacks.pop())) {
      callback(context)
    }

    if (finale) {
      finale(context)
    }
  }

  function next () {
    const { creator, options } = middlewares.shift() || {}

    if (creator) {
      // creator: fn(context, options, register)
      creator(context, options, (payload, callback) => {
        if (typeof payload === 'function') {
          callback = payload
          payload = null
        }
        // 将回调函数添加到队列
        callback && callbacks.push(callback)
        // 如果有提供配置数据，则进行 store 与 router 相关处理
        if (payload) {
          const { scope, prefix, store, routes } = payload
          if (scope) {
            log(`Module %c${scope}%c registered.`, 'color: green', 'color: inherit')
            store && registerModule(scope, store)
            routes && registerRoutes(scope, prefix, routes)
          } else {
            error('`scope` is required!')
          }
        }
        next()
      })
    } else {
      groupEnd()
      // 注册完毕，准备执行回调函数队列
      done()
    }
  }

  group('%c[PLATO] %cRegistering modules...', 'font-weight: bold', 'color: green; font-weight: bold')
  // 开始执行模块注册队列
  next()
}

function isFunction (val) {
  return typeof val === 'function'
}
