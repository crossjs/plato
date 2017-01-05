import Vue from 'vue'
import merge from 'utils/merge'
import promisify from 'utils/promisify'
import { isFunction } from 'utils/is'
import { addPrefixToPath, injectOptionsToComponent } from './helpers'

/**
 * Vue mixins
 */
import './mixins'

/**
 * 上下文，用于储存全局数据
 * 这里使用 Vue 实例的一个好处是可以直接使用 Vue 的一些特性，比如事件订阅
 * @type {vue}
 */
export const context = new Vue({
  data: {
    // for Vuex.Store
    modules: {},
    plugins: [],
    // for Vue-Router
    routes: [],
    name: 'PLATO',
    version: '1.0'
  }
})

export function configure (options) {
  for (const i in options) {
    context[i] = options[i]
  }
}

/**
 * middlewares
 * @type {Array}
 */
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

  const { modules, plugins, routes } = context

  function registerModule (scope, obj) {
    // 直接使用 vuex 2.1.1 的 namespaced 特性
    obj.namespaced = true

    // 合入
    if (modules[scope]) {
      merge(modules[scope], obj)
    } else {
      modules[scope] = obj
    }
  }

  function registerPlugins (scope, arr) {
    plugins.push.apply(plugins, arr)
  }

  function registerRoutes (scope, prefix, _routes) {
    // 将 scope 添加到 vm.$options
    // 将 prefix 添加到 vm.$options
    function injectOptions (component, injection) {
      if (isFunction(component)) {
        return () => component().then(component => injectOptionsToComponent(component, injection))
      } else {
        return injectOptionsToComponent(component, injection)
      }
    }

    // 添加 `prefix` 到路由的 `path` 参数
    function handleRoutes (prefixes, r) {
      return r.map(r => {
        const { path = '', redirect, alias, component, components, children } = r

        r.path = addPrefixToPath(prefixes, path)
        // 转换重定向
        if (redirect !== undefined) {
          r.redirect = addPrefixToPath(prefixes, redirect)
        }
        // 转换别名
        if (alias !== undefined) {
          r.alias = addPrefixToPath(prefixes, alias)
        }

        // inject component and components
        const injection = { scope, prefixes }
        if (component) {
          r.component = injectOptions(component, injection)
        }
        if (components) {
          Object.keys(components).forEach(key => {
            components[key] = injectOptions(components[key], injection)
          })
        }

        // 递归处理子路由
        if (children) {
          r.children = handleRoutes(prefixes.concat(path), r.children, prefix)
        }

        return r
      })
    }

    // 处理路由配置
    routes.push.apply(routes, handleRoutes([prefix || scope], _routes))
  }

  function done () {
    __PROD__ || console.log('%c[PLATO] %cExecuting module callbacks', 'font-weight: bold', 'color: green; font-weight: bold')

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
    const middleware = middlewares.shift()

    if (middleware && middleware.creator) {
      if (middleware.creator.length === 3) {
        // creator: fn(context, options, register)
        // 使用回调
        middleware.creator(context, middleware.options, register)
      } else {
        // creator: fn(context, options)
        // 支持异步
        promisify(middleware.creator(context, middleware.options))
        .then(ret => register.apply(null, Array.isArray(ret) ? ret : [ret]))
      }
    } else {
      __PROD__ || console.groupEnd()

      // 注册完毕
      done()
    }
  }

  function register (data, callback) {
    if (typeof data === 'function') {
      callback = data
      data = null
    }
    if (callback) {
      // 将回调函数添加到队列
      callbacks.push(callback)
    }
    if (data) {
      // 进行 store 与 router 相关处理
      const { options, store, plugins, routes } = data
      if (options) {
        const { scope, prefix } = options
        if (scope) {
          __PROD__ || console.log(`Module %c${scope}%c registered.`, 'color: green', 'color: inherit')
          store && registerModule(scope, store)
          routes && registerRoutes(scope, prefix, routes)
        } else {
          if (store || routes) {
            __PROD__ || console.error('`options.scope` is required!')
          }
        }
        // plugins
        plugins && registerPlugins(scope, plugins)
      } else {
        __PROD__ || console.error('`options` is required!')
      }
    }
    next()
  }

  __PROD__ || console.group('%c[PLATO] %cRegistering modules...', 'font-weight: bold', 'color: green; font-weight: bold')

  // 执行模队列
  next()
}
