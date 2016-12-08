import Vue from 'vue'
import { use, run } from 'system/queue'

import config from 'modules/config'
import faq from 'modules/faq'
import demo from 'modules/demo'
import about from 'modules/about'
import user from 'modules/user'

import Root from 'application/components/root'

/**
 * Use Modules
 */

use(config)
use(user, {
  // name: 'user', // for modules, defaults to `user`
  prefix: '/' // for routes, defaults to `{name}`
})
use(faq, {
  // name: 'faq', // for modules, defaults to `faq`
  prefix: '/' // for routes, defaults to `{name}`
})
use(demo)
use(about)

/**
 * Run Modules with context
 */

run(({ router, store }) => {
  /**
   * Let's go!
   */
  new Vue(Vue.util.extend({ router, store }, Root)).$mount('#app')
})
