import Vue from 'vue'
import { use, run } from 'system/queue'

import base from 'modules/base'
import faq from 'modules/faq'
import demo from 'modules/demo'
import about from 'modules/about'

import Root from 'application/components/root'

/**
 * Use Modules
 */

use(
  base({
    // name: 'base', // for modules, defaults to `base`
    prefix: '/' // for routes, defaults to `{name}`
  }),
  faq({
    // name: 'faq', // for modules, defaults to `faq`
    prefix: '/' // for routes, defaults to `{name}`
  }),
  demo(),
  about()
)

/**
 * Run Modules with context
 */

run({
  modules: {},
  routes: []
}, ({ router, store }) => {
  /**
   * Let's go!
   */
  new Vue(Vue.util.extend({ router, store }, Root)).$mount('#app')
})
