import { use, run } from 'application/_core'

import faq from 'modules/faq'
import demo from 'modules/demo'
import about from 'modules/about'

/**
 * Use Modules
 */

use(faq({
  // name: 'faq', // for modules, defaults to `faq`
  prefix: '/' // for routes, defaults to `{name}`
}), demo(), about())

/**
 * Run Modules with context
 */

run({
  modules: {},
  routes: []
})
