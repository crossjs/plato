import { use, run } from 'application/core'

import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import I18n from 'application/plugins/i18n'
import Validator from 'application/plugins/validator'
import tap from 'application/directives/tap'
import createStore from 'application/store/create'
import createRouter from 'application/router/create'

import Root from 'application/components/root'

import faq from 'modules/faq'
import base from 'modules/base'
import demo from 'modules/demo'
import about from 'modules/about'
import core from 'modules/core'

/**
 * Use Modules
 */

use(base({
  // name: 'base', // for modules, defaults to `base`
  prefix: '/' // for routes, defaults to `/{name}`
}))
use(faq({
  // name: 'faq', // for modules, defaults to `faq`
  prefix: '/' // for routes, defaults to `/{name}`
}))
use(demo())
use(about())

// protected
use(core())

/**
 * Run Modules
 */

run({}, [], (modules, routes) => {
  const store = createStore(modules)
  const router = createRouter(routes)

  // keep vue-router and vuex store in sync.
  sync(store, router)

  // router hooks
  router.beforeEach((to, from, next) => {
    store.dispatch('setProgress', 80)
    if (to.matched.some(m => m.meta.auth) && !store.getters.authorized) {
      next('/')
    } else {
      next()
    }
  })
  router.afterEach(() => {
    if (document.activeElement && document.activeElement.nodeName !== 'BODY') {
      document.activeElement.blur()
    }
    store.dispatch('setProgress', 100)
  })

  /**
   * Plugins
   */

  // 国际化，如果未使用，请移除
  Vue.use(I18n, {
    // 翻译资源库
    data () {
      return store.getters.i18n
    }
  })

  // (表单)验证，如果未使用，请移除
  Vue.use(Validator)

  /**
   * Directives
   */

  // tap event
  Vue.directive('tap', tap)

  /**
   * Let's go!
   */

  new Vue(Vue.util.extend({ router, store }, Root)).$mount('#app')
})
