import Vue from 'vue'
import normalizeMap from 'utils/normalize-map'
import merge from 'utils/merge'
import { isFunction } from 'utils/is'
import { groupEnd, group, log, error } from 'utils/console'

const middlewares = []

export function use (creator, options = {}) {
  if (typeof creator !== 'function') {
    return error('`creator` must be a function')
  }
  middlewares.push({ creator, options })
}

export function run (finale) {
  const callbacks = []

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

  function registerModule (scope, obj) {
    const {
      state,
      getters,
      actions,
      mutations
    } = obj
    // state 与 mutations 直接拷贝
    const newObj = {
      state,
      mutations
    }
    // getters 与 actions 需要添加 scope 前缀
    if (getters) {
      newObj.getters = {}
      Object.keys(getters).forEach(key => {
        newObj.getters[`${scope}/${key}`] = getters[key]
      })
    }
    if (actions) {
      newObj.actions = {}
      Object.keys(actions).forEach(key => {
        newObj.actions[`${scope}/${key}`] = actions[key]
      })
    }
    // 合入
    if (_modules[scope]) {
      merge(_modules[scope], newObj)
    } else {
      _modules[scope] = newObj
    }
  }

  function registerRoutes (scope, prefix, routes) {
    function injectOptions (module) {
      // add scope as vm.$options.scope
      // add context as vm.$options.context
      if (module) {
        const options = __DEV__ ? module._Ctor[0].options : module
        Object.assign(options, {
          scope,
          context
        })
      }
      return module
    }
    function addOptionsToVm (component) {
      if (isFunction(component)) {
        return () => component().then(injectOptions).catch(injectOptions)
      } else {
        return injectOptions(component)
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
        meta.scope = scope
        meta.path = path
        r.meta = meta
        // inject component and components
        if (component) {
          r.component = addOptionsToVm(component)
        }
        if (components) {
          Object.keys(components).forEach(key => {
            components[key] = addOptionsToVm(components[key])
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

Vue.mixin({
  beforeCreate () {
    const {
      scope,
      methods = {},
      computed = {},
      mapState, mapGetters, mapActions
    } = this.$options

    // 将 mapState 转成 computed
    if (mapState) {
      normalizeMap(mapState).forEach(({ key, val }) => {
        let _scope = scope
        if (Array.isArray(val)) {
          _scope = key || _scope
        } else {
          val = [val]
        }
        val.forEach(val => {
          computed[val] = function mappedState () {
            return this.$store.state[_scope][val]
          }
        })
      })
    }

    // 将 mapGetters 转成 computed
    if (mapGetters) {
      normalizeMap(mapGetters).forEach(({ key, val }) => {
        let _scope = scope
        if (Array.isArray(val)) {
          _scope = key || _scope
        } else {
          val = [val]
        }
        val.forEach(val => {
          computed[val] = function mappedGetter () {
            const _key = `${_scope}/${val}`
            if (!(_key in this.$store.getters)) {
              console.error(('[PLATO] unknown getter: ' + val))
            }
            return this.$store.getters[_key]
          }
        })
      })
    }

    // 将 mapActions 转成 methods
    if (mapActions) {
      normalizeMap(mapActions).forEach(({ key, val }) => {
        let _scope = scope
        if (Array.isArray(val)) {
          _scope = key || _scope
        } else {
          val = [val]
        }
        val.forEach(val => {
          methods[val] = function mappedAction (...args) {
            return this.$store.dispatch(`${_scope}/${val}`, ...args)
          }
        })
      })
    }

    this.$options.computed = computed
    this.$options.methods = methods
  }
})
