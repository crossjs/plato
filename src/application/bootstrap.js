import Vue from 'vue'
import { configure, use, run } from 'system'

import i18n from 'modules/i18n'
import validator from 'modules/validator'
import config from 'modules/config'
import faq from 'modules/faq'
import demo from 'modules/demo'
import about from 'modules/about'
import user from 'modules/user'
import core from 'modules/core'

import tap from './directives/tap'
import drag from './directives/drag'

import Root from './views/root'

/**
 * 全局配置
 */
configure({
  // 软件版本号
  // 原则上做较大变更时需要更新
  version: '1.0'
})

/**
 * Use Modules
 */

/**
 * 被依赖的模块，移除可能会影响部分功能
 */
use(i18n)
use(validator)

/**
 * 普通模块
 */
use(config, { prefix: 'config' })
use(user)
use(faq)
use(demo, { prefix: 'demo' })
use(about, { prefix: 'about' })

/**
 * 核心模块，不能移除
 */
use(core)

/**
 * Run Modules
 */

run(({ router, store }) => {
  __PROD__ || console.log('%c[PLATO] %cLet\'s go!', 'font-weight: bold', 'color: green; font-weight: bold')

  /**
   * Directives
   */

  // tap event
  Vue.directive('tap', tap)
  // drag event
  Vue.directive('drag', drag)

  router.afterEach(() => {
    // 解决 iOS 焦点 BUG
    if (document.activeElement && document.activeElement.nodeName !== 'BODY') {
      document.activeElement.blur()
    }
  })

  /**
   * Let's go!
   */

  // mounting
  new Vue({ router, store, ...Root }).$mount('#app')
})
