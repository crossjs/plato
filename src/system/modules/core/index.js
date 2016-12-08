import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import createStore from 'system/create-store'
import createRouter from 'system/create-router'
import I18n from 'system/plugins/i18n'
import Validator from 'system/plugins/validator'
import tap from 'system/directives/tap'

// module `config` is requied

export default (context, options = {}, next) => {
  const { registerModule, modules, routes } = context
  const { name = 'core', prefix = 'core' } = options

  registerModule({
    config: {
      // add routes to store
      state: {
        authorized: false,
        routes
      },
      getters: {
        authorized: state => state.authorized,
        routes: (state, { authorized }) => state.routes.filter(({ path, meta }) => path !== '/' && (!meta || (!meta.hidden && (meta.auth === undefined || meta.auth === authorized))))
      }
    }
  })

  // inject store and router
  context.store = createStore(modules)
  context.router = createRouter(routes)

  next(({ store, router }) => {
    __PROD__ || console.log(`use module "${name}", with prefix "${prefix}" for routes`)

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
