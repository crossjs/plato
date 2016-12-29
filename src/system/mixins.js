import Vue from 'vue'
import { isPlainObj } from 'utils/is'
import { addPrefixToPath } from './helpers'
import { error } from 'utils/console'

// 解析 getter, actions，state ，支持别名和模块名
function analysisMap (_val, _scope) {
  let _alias = _val

  // 解析 scope/value1 格式
  var formatAnalysis = _val.split('/')
  if (formatAnalysis.length === 2) {
    _scope = formatAnalysis[0]
    _alias = _val = formatAnalysis[1]
  }

  // 解析 as 别名
  var aliasAnalysis = _val.split(/\s+as\s+/)
  if (aliasAnalysis.length === 2) {
    _val = aliasAnalysis[0]
    _alias = aliasAnalysis[1]
  }

  return {
    _scope,
    _val,
    _alias
  }
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
        * mapState: ['scope1/value1', 'scope2/value2']
        * // 设置别名, 区别不同 scope 的 state
        * mapState: ['scope1/value1', 'scope2/value1 as value2']
       */
      if (Array.isArray(mapState)) {
        mapState.forEach(val => {
          const { _alias, _scope, _val } = analysisMap(val, scope)
          computed[_alias] = function mappedState () {
            return this.$store.state[_scope][_val]
          }
        })
      } else {
        error(('[PLATO] mapState format error: ' + JSON.stringify(mapState)))
      }
    }

    if (mapGetters) {
      /**
       * 将 mapGetters 转成 computed
       * @example
       * // 映射当前 scope 的 getters 里的值
       * mapGetters: ['value1', 'value2']
       * // 映射指定 scope 的 getters 里的值
       * mapGetters: ['scope1/value1', 'scope2/value2']
       * // 设置别名, 区别不同 scope 的 getters
       * mapGetters: ['scope1/value1', 'scope2/value1 as value2']
      */

      if (Array.isArray(mapGetters)) {
        mapGetters.forEach(val => {
          const { _alias, _scope, _val } = analysisMap(val, scope)

          computed[_alias] = function mappedGetter () {
            const _key = `${_scope}/${_val}`
            if (!(_key in this.$store.getters)) {
              error(('[PLATO] unknown getter: ' + val))
            }
            return this.$store.getters[_key]
          }
        })
      } else {
        error(('[PLATO] getter format error: ' + JSON.stringify(mapGetters)))
      }
    }

    if (mapActions) {
      /**
       * 将 mapActions 转成 methods
       * @example
       * // 映射当前 scope 的 actions 里的值
       * mapActions: ['action1', 'action2']
       *
       * // 映射指定 scope 的 actions 里的值
       * mapActions: ['scope1/action1', 'scope2/action2']
       *
       * // 设置别名, 区别不同 scope 的 actions
       * mapGetters: ['scope1/action1', 'scope2/action1 as action2']
       *
       */
      if (Array.isArray(mapActions)) {
        mapActions.forEach(val => {
          const { _alias, _scope, _val } = analysisMap(val, scope)
          methods[_alias] = function mappedAction (...args) {
            return this.$store.dispatch(`${_scope}/${_val}`, ...args)
          }
        })
      } else {
        error(('[PLATO] actions format error: ' + JSON.stringify(mapActions)))
      }
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
