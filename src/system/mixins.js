import Vue from 'vue'
import normalizeMap from 'utils/normalize-map'
import { isPlainObj } from 'utils/is'
import { addPrefixToPath } from './helpers'

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

/**
 * 根据原始路径取真实路径
 * 因为模块内可能直接调用修改前的路由，
 * 所以需要提供一个自定义方法以确保可以跳转到添加了 prefix 的路由。
 * @todo 支持命名路由
 * @method $redirect
 * @param  {location}   path    路由地址
 * @param  {boolean}  replace   使用 replace，否则使用 push
 */
Vue.prototype.$redirect = function (path, replace) {
  let realPath
  if (isPlainObj(path)) {
    realPath = { ...path }
    // 如果提供了 prefix，一般是要跳转到其它模块定义的路由
    const { path, prefix = this.$prefix } = realPath
    if (path !== undefined) {
      realPath.path = addPrefixToPath(prefix, path)
    }
  } else {
    realPath = addPrefixToPath(this.$prefix, path)
  }
  replace ? this.$router.replace(realPath) : this.$router.push(realPath)
}
