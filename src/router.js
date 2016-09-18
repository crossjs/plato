import Vue from 'vue'
import Router from 'vue-router'
import store from 'store'
import routes from 'routes'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      // savedPosition is only available for popstate navigations.
      return savedPosition
    } else {
      const position = {}
      // new navigation.
      // scroll to anchor by returning the selector
      if (to.hash) {
        position.selector = to.hash
      }
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // cords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.x = 0
        position.y = 0
      }
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return position
    }
  },
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
  // window.scrollTo(0, 0)
})

export default router
