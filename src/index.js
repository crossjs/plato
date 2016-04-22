import Vue from 'vue'
import Router from 'vue-router'
import Validator from 'vue-validator'

import App from 'app'
import routes from 'routes'
import CRoute from 'components/c-route'

if (module.hot) {
  module.hot.accept()
}

// process.env.NODE_ENV === 'developmemnt'
Vue.config.debug = true

Vue.use(Router)
Vue.use(Validator)

const router = new Router({
  history: false,
  saveScrollPosition: true,
  linkActiveClass: 'link-active'
})

// register for global use
Vue.component('c-route', CRoute)
router.map(routes())

router.beforeEach(transition => {
  if (/\/http/.test(transition.to.path)) {
    const url = transition.to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    transition.next()
  }
})

router.afterEach(transition => {
  // if (transition.to.fullPath !== '/demo') {
  window.scrollTo(0, 0)
  // }
})

router.start(App, 'app')
