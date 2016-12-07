import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import createStore from 'application/store/create'
import createRouter from 'application/router/create'
import I18n from 'application/plugins/i18n'
import Validator from 'application/plugins/validator'
import tap from 'application/directives/tap'
import Root from 'application/components/root'

import store from './store'
import { createRoutes } from './routes'
import merge from 'application/utils/merge'

export default (options = {}) => {
  const { name = '_core', prefix = '_core' } = options

  return (context, next) => {
    const { modules } = context
    let { routes } = context

    routes = routes.concat(createRoutes({ prefix }))

    modules[name] = merge(store, {
      // add routes to store
      state: {
        routes
      },
      getters: {
        routes: (state, { authorized }) => state.routes.filter(({ path, meta }) => path !== '/' && (!meta || (!meta.hidden && (meta.auth === undefined || meta.auth === authorized))))
      }
    })

    context.routes = routes

    // inject store and router
    context.store = createStore(modules)
    context.router = createRouter(routes)

    // call next with callback
    // callback will be executed after bootstrap
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

      /**
       * Let's go!
       */

      new Vue(Vue.util.extend({ router, store }, Root)).$mount('#app')
    })
  }
}
