import Vue from 'vue'
import Router from 'vue-router'
import I18n from 'plato-i18n'
import Validator from 'plato-validator'
import App from 'app'
import { routes, alias } from 'routes'
import store from 'store'

if (module.hot) {
  module.hot.accept()
}

Vue.config.debug = __DEV__

// 国际化，如果未使用，请移除
Vue.use(I18n, {
  // 翻译资源库
  data () {
    return store.getters.i18n
  }
})

// (表单)验证，如果未使用，请移除
Vue.use(Validator)

Vue.use(Router)

const router = new Router({
  history: false,
  saveScrollPosition: true,
  linkActiveClass: 'link-active'
})

// register routes
router.map(routes)
router.alias(alias)

router.beforeEach(transition => {
  store.dispatch('setProgress', 80)
  if (transition.to.auth && !store.getters.authorized) {
    transition.abort()
  } else {
    transition.next()
  }
})

router.afterEach(transition => {
  store.dispatch('setProgress', 100)
  window.scrollTo(0, 0)
})

router.start(App, 'app')
