import Vue from 'vue'
import Router from 'vue-router'
import Validator from 'plugins/validator'
import I18n from 'plugins/i18n'
import Ajax from 'plugins/ajax'
import App from 'app'
import iconmap from 'utils/iconmap'
import { routes, alias } from 'routes'
import { env, progress } from 'vx/getters'
import { getEnv, setProgress, addToast } from 'vx/utils'

if (module.hot) {
  module.hot.accept()
}

Vue.config.debug = __DEV__

// global mixins
Vue.mixin({
  data () {
    return { iconmap }
  },
  vuex: {
    getters: {
      env,
      progress
    }
  }
})

// (表单)验证，如果未使用，请移除
Vue.use(Validator)

// 国际化，如果未使用，请移除
Vue.use(I18n)

Vue.use(Ajax, {
  // headers: {
  //   'Accept-Language': getEnv().lang
  // },
  hooks: {
    before () {
      setProgress(60)
    },
    failure (err) {
      addToast(err)
    },
    after () {
      setProgress(100)
    }
  }
})

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
  if (transition.to.auth && !getEnv().authorized) {
    transition.abort()
  } else {
    setProgress(60)
    transition.next()
  }
})

router.afterEach(transition => {
  window.scrollTo(0, 0)
  setProgress(100)
})

router.start(App, 'app')
