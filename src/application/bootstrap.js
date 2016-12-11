import Vue from 'vue'
import { use, run } from 'system/queue'
import config from 'modules/config'
import faq from 'modules/faq'
import demo from 'modules/demo'
import about from 'modules/about'
import user from 'modules/user'
import Root from 'application/components/root'
import { log } from 'utils/console'

/**
 * Use Modules
 */

use({
  creator: config,
  identity: 'CONFIG',
  name: 'config',
  prefix: 'config'
})
use({
  creator: user,
  identity: 'USER',
  name: 'user',
  prefix: '/'
})
use({
  creator: faq,
  identity: 'FAQ',
  name: 'faq',
  prefix: '/'
})
use({
  creator: demo,
  identity: 'DEMO',
  name: 'demo',
  prefix: 'demo'
})
use({
  creator: about,
  identity: 'ABOUT',
  name: 'about',
  prefix: 'about'
})

/**
 * Run Modules with context
 */

run(({ router, store }) => {
  log('%c[PLATO] %cLet\'s go!', 'font-weight: bold', 'color: green; font-weight: bold')
  /**
   * Let's go!
   */
  new Vue(Vue.util.extend({ router, store }, Root)).$mount('#app')
})
