import Vue from 'vue'
import Router from 'vue-router'
import Validator from 'vue-validator'

import App from 'app'
import { routes, alias } from 'routes'
import mixins from 'mixins'
import filters from 'filters'
import CRoute from 'components/c-route'

if (module.hot) {
  module.hot.accept()
}

// global mixins
Vue.mixin(mixins)

// global filters
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.config.debug = process.env.NODE_ENV === 'developmemnt'

Vue.use(Router)
Vue.use(Validator)

const router = new Router({
  history: false,
  saveScrollPosition: true,
  linkActiveClass: 'link-active'
})

// register route component for global use
Vue.component('c-route', CRoute)

// register routes
router.map(routes)
router.alias(alias)

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
