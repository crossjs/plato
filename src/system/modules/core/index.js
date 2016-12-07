import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import createStore from 'system/create-store'
import createRouter from 'system/create-router'
import I18n from 'system/plugins/i18n'
import Validator from 'system/plugins/validator'
import tap from 'system/directives/tap'

export default (options = {}) => {
  const { name = 'core', prefix = 'core' } = options

  return (context, next) => {
    const { modules, routes } = context

    modules[name] = {
      // add routes to store
      state: {
        routes
      },
      getters: {
        routes: (state, { authorized }) => state.routes.filter(({ path, meta }) => path !== '/' && (!meta || (!meta.hidden && (meta.auth === undefined || meta.auth === authorized))))
      }
    }

    // inject store and router
    context.store = createStore(modules)
    context.router = createRouter(routes)

    // 执行 next：将 context 传递给下一个模块
    // 第二个参数：系统初始化后执行的回调函数，同样传递 context 参数，只是这时候的 context 上已经有 store 与 router 了
    next(context, ({ store, router }) => {
      __PROD__ || console.log(`use module "${name}", with prefix "${prefix}"`)

      // keep vue-router and vuex store in sync.
      sync(store, router)

      // router hooks
      router.beforeEach((to, from, next) => {
        store.dispatch('setProgress', 80)
        if (to.matched.some(m => m.meta.auth) && !store.getters.authorized) {
          next('/')
        } else {
          next()
        }
      })
      router.afterEach(() => {
        if (document.activeElement && document.activeElement.nodeName !== 'BODY') {
          document.activeElement.blur()
        }
        store.dispatch('setProgress', 100)
      })

      /**
       * Plugins
       */

      // 国际化，如果未使用，请移除
      Vue.use(I18n, {
        // 翻译资源库
        data () {
          return store.getters.i18n
        }
      })

      // (表单)验证，如果未使用，请移除
      Vue.use(Validator)

      /**
       * Directives
       */

      // tap event
      Vue.directive('tap', tap)
    })
  }
}
