import Vue from 'vue'
import Router from 'vue-router'
import store from 'store'
import routes from 'routes'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes,
  linkActiveClass: 'link-active'
})

router.beforeEach((route, redirect, next) => {
  store.dispatch('setProgress', 80)
  if (route.matched.some(m => m.meta.auth) && !store.getters.authorized) {
    redirect('/')
  } else {
    next()
  }
})

router.afterEach((/* route, redirect, next */) => {
  store.dispatch('setProgress', 100)
  window.scrollTo(0, 0)
})

export default router
