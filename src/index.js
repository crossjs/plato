import Vue from 'vue'
import Router from 'vue-router'
import I18n from 'vue-i18n'
import App from 'app'
import { routes, alias } from 'routes'
import store from 'vx/store'
import { env, auth, progress } from 'vx/getters'
import applyLocales from 'locales/apply'

if (module.hot) {
  module.hot.accept()
}

Vue.config.debug = process.env.NODE_ENV === 'development'

Vue.use(Router)

Vue.use(I18n)

// global mixins
Vue.mixin({
  vuex: {
    getters: {
      env,
      auth,
      progress
    }
  }
})

applyLocales(env, store, Vue)

const router = new Router({
  history: false,
  saveScrollPosition: true,
  linkActiveClass: 'link-active'
})

// register routes
router.map(routes)
router.alias(alias)

router.beforeEach(transition => {
  if (transition.to.auth && !auth(store.state)) {
    transition.abort()
  } else {
    transition.next()
  }
})

router.afterEach(transition => {
  window.scrollTo(0, 0)
})

router.start(App, 'app')
