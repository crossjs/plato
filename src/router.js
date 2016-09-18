import Vue from 'vue'
import Router from 'vue-router'
import store from 'store'
import routes from 'routes'

Vue.use(Router)

const router = new Router({ routes })

router.beforeEach((route, redirect, next) => {
  store.dispatch('setProgress', 80)
  if (route.matched.some(m => m.meta.auth) && !store.getters.authorized) {
    redirect('/')
  } else {
    next()
  }
})

router.afterEach(() => {
  store.dispatch('setProgress', 100)
})

export default router
