import Vue from 'vue'
import Router from 'vue-router'
import I18n from 'plato-i18n'
import Validator from 'plato-validator'
import App from 'app'
import routes from 'routes'
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
  mode: 'history',
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

// /* eslint no-new: 0 */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   // template: '<div><router-view></router-view></div>',
//   render (createElement) {
//     return createElement(App)
//   }
// })

new Vue(Vue.util.extend({ router, store }, App)).$mount('#app')
