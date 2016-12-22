import Vue from 'vue'
import normalizeMap from 'utils/normalize-map'
import merge from 'utils/merge'
import { isFunction } from 'utils/is'
import { groupEnd, group, log, error } from 'utils/console'

const middlewares = []

/**
 * 注册模块
 * @method use
 * @param  {function} creator     模块
 * @param  {object} [options={}]  模块配置
 * @example
 * use(core, { // 提供自定义的模块配置，将覆盖模块默认配置
 *   scope: 'core', // 指定 store 数据存储的命名空间，可通过 vm.$store.state.core 访问
 *   prefix: 'core'  // 指定路由 path 前缀，默认 `/`
 * })
 */
export function use (creator, options = {}) {
  if (typeof creator !== 'function') {
    throw new Error('`creator` must be a function')
  }
  middlewares.push({ creator, options })
}

/**
 * 加载模块
 * 按正序依次处理模块注册的数据，
 * 完成后逆序执行模块注册的回调
 * @method run
 * @param  {function} finale 初始化成功回调
 */
export function run (finale) {
  const callbacks = []

  const context = new Vue({
    data: {
      // for Vuex.Store
      modules: {},
      // for Vue-Router
      routes: []
    }
  })

  const { modules, routes } = context

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

    if (getters) {
      newObj.getters = {}
      // 为 getters 添加 scope 前缀
      Object.keys(getters).forEach(key => {
        newObj.getters[`${scope}/${key}`] = getters[key]
      })
    }

    if (actions) {
      newObj.actions = {}
      // 为 actions 添加 scope 前缀
      Object.keys(actions).forEach(key => {
        newObj.actions[`${scope}/${key}`] = actions[key]
      })
    }

    // 合入
    if (modules[scope]) {
      merge(modules[scope], newObj)
    } else {
      modules[scope] = newObj
    }
  }

  function registerRoutes (scope, prefix, _routes) {
    function injectOptions (module) {
      if (module) {
        const options = __DEV__ ? module._Ctor[0].options : module
        // 将 scope 添加到 vm.$options
        options.scope = scope
      }
      return module
    }
    function addScopeToOptions (component) {
      if (isFunction(component)) {
        return () => component().then(injectOptions).catch(injectOptions)
      } else {
        return injectOptions(component)
      }
    }

    // 添加 `prefix` 到如有的 `path` 参数
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
          r.component = addScopeToOptions(component)
        }
        if (components) {
          Object.keys(components).forEach(key => {
            components[key] = addScopeToOptions(components[key])
          })
        }
        if (children) {
          r.children = handleRoutes(r.path, r.children)
        }
        return r
      })
    }
    routes.push.apply(routes, handleRoutes(prefix || scope, _routes))
  }

  function done () {
    log('%c[PLATO] %cExecuting module callbacks', 'font-weight: bold', 'color: green; font-weight: bold')

    let callback
    // 执行回调函数队列
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
            if (store || routes) {
              error('`scope` is required!')
            }
          }
        }
        next()
      })
    } else {
      groupEnd()

      // 注册完毕
      done()
    }
  }

  group('%c[PLATO] %cRegistering modules...', 'font-weight: bold', 'color: green; font-weight: bold')

  // 执行模队列
  next()
}

/**
 * 注册生命周期 `beforeCreate` 函数
 * 进行 mapState/mapGetters/mapActions 数据处理
 * !!! 此处的 map*** 不同于 vuex 的 map***，作用类似，用法不同
 */
Vue.mixin({
  beforeCreate () {
    const options = this.$options
    const {
      scope,
      parent,
      methods = {},
      computed = {},
      mapState, mapGetters, mapActions
    } = options

    // scope injection
    if (scope) {
      this.$scope = scope
    } else if (parent && parent.$scope) {
      this.$scope = parent.$scope
    }

    if (mapState) {
      /**
       * 将 mapState 转成 computed
       * @example
       * // 映射当前 scope 的 state 里的值
       * mapState: ['value1', 'value2']
       * // 映射指定 scope 的 state 里的值
       * mapState: {
       *   '': ['value1', 'value2'], // key 为空代表当前 scope
       *   scope1: ['value3', 'value4']
       * }
       */
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

    if (mapGetters) {
      /**
       * 将 mapGetters 转成 computed
       * @example
       * // 映射当前 scope 的 getters 里的值
       * mapGetters: ['value1', 'value2']
       * // 映射指定 scope 的 getters 里的值
       * mapGetters: {
       *   '': ['value1', 'value2'], // key 为空代表当前 scope
       *   scope1: ['value3', 'value4']
       * }
       */
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

    if (mapActions) {
      /**
       * 将 mapActions 转成 methods
       * @example
       * // 映射当前 scope 的 actions 里的值
       * mapActions: ['value1', 'value2']
       * // 映射指定 scope 的 actions 里的值
       * mapActions: {
       *   '': ['value1', 'value2'], // key 为空代表当前 scope
       *   scope1: ['value3', 'value4']
       * }
       */
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

    options.computed = computed
    options.methods = methods
  }
})
