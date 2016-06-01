import Vue from 'vue'
import Router from 'vue-router'
import Validator from 'plugins/validator'
import I18n from 'plugins/i18n'
import App from 'app'
import { routes, alias } from 'routes'
import { env, auth, progress } from 'vx/getters'
import utils from 'vx/utils'

if (module.hot) {
  module.hot.accept()
}

Vue.config.debug = process.env.NODE_ENV === 'development'

Vue.use(Router)
Vue.use(Validator)
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

const router = new Router({
  history: false,
  saveScrollPosition: true,
  linkActiveClass: 'link-active'
})

// register routes
router.map(routes)
router.alias(alias)

router.beforeEach(transition => {
  if (transition.to.auth && !utils.getAuth()) {
    transition.abort()
  } else {
    utils.setProgress(60)
    transition.next()
  }
})

router.afterEach(transition => {
  window.scrollTo(0, 0)
  utils.setProgress(100)
})

router.start(App, 'app')
