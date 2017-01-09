import Vue from 'vue'
import { configure, use, run } from 'system'

import persist from 'modules/persist'
import request from 'modules/request'
import i18n from 'modules/i18n'
import validator from 'modules/validator'
import config from 'modules/config'
import faq from 'modules/faq'
import demo from 'modules/demo'
import about from 'modules/about'
import user from 'modules/user'
import core from 'modules/core'

import Root from './views/root'

/**
 * 全局配置
 */
configure({
  // 项目名称
  name: 'PLATO',
  // 项目版本号
  // 原则上做较大变更时需要更新
  version: '1.0'
})

/**
 * Use Modules
 */

/**
 * 被依赖的模块，移除可能会影响部分功能
 */
use(persist)
use(request)
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
  // TODO 可以考虑移到 system 统一处理
  new Vue({ router, store, ...Root }).$mount('#app')
})
