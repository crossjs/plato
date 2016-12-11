import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import createStore from './create-store'
import createRouter from './create-router'
import Validator from 'system/plugins/validator'
import tap from 'system/directives/tap'

export default (context, options = {}, register) => {
  const { modules, routes } = context

  register({
    store: {
      state: {
        routes
      },
      getters: {
        routes: (state, { authorized }) => state.routes.filter(({ path, meta }) => path !== '/' && (!meta || (!meta.hidden && (meta.auth === undefined || meta.auth === authorized))))
      }
    }
  }, () => {
    // inject store and router
    const store = context.store = createStore(modules)
    const router = context.router = createRouter(routes)

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

    // (表单)验证，如果未使用，请移除
    Vue.use(Validator)

    /**
     * Directives
     */

    // tap event
    Vue.directive('tap', tap)
  })
}
