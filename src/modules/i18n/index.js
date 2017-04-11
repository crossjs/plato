import { watch } from 'platojs/system'
import request from 'platojs/util/request'
import template from 'string-template'
import createStore from './create-store'

export default ({ Vue }, options = {}) => {
  options = {
    scope: 'i18n',
    lang: (navigator.language || navigator.browserLanguage).toLowerCase().split('-')[0],
    translations: {},
    ...options
  }

  const {
    scope,
    fallbackLang = 'zh',
    urlPattern = './i18n/{lang}.json'
  } = options

  // 必须使用 Vue，以实现响应式
  const vm = new Vue({
    data: {
      translations: {}
    }
  })

  function parseKeys (keys, scope) {
    switch (keys.indexOf('/')) {
      case 0: // 以 `/` 开头，说明是从全局里查找匹配
        console.warn('[I18N] 斜杠开头的规则已废弃，请直接使用`scope/k.e.y.s`')
        const arr1 = keys.split('.')
        return {
          scope: arr1[0].slice(1),
          keyArray: arr1.slice(1)
        }
      case -1:
        return {
          scope,
          keyArray: keys.split('.')
        }
      default:
        const arr2 = keys.split('/')
        return {
          scope: arr2[0],
          keyArray: arr2[1].split('.')
        }
    }
  }

  /**
   * I18n
   */
  Vue.prototype.__ = Vue.prototype.$translate = function (keys, ...args) {
    if (!keys) {
      return keys
    }

    const { scope, keyArray } = parseKeys(keys, this.$scope)

    // keys 以 `.` 作为分隔符
    return template(keyArray.reduce((res, key) => {
      if (res && typeof res === 'object' && res.hasOwnProperty(key)) {
        return res[key]
      }
      return keys
    }, scope ? vm.translations[scope] : vm.translations), ...args)
  }

  return [{
    store: createStore(options),
    options
  }, ({ store }) => {
    let fallbackEnabled = false

    function fetchTranslations (lang) {
      // add `dir="..."` to `<html>`
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
      // request json data
      request(template(urlPattern, { lang }))
      .then(value => {
        vm.translations = value
      })
      .catch(() => {
        if (fallbackEnabled) {
          // 确保只执行一次，避免无限循环
          fallbackEnabled = false
          this.fetchTranslations(fallbackLang)
        }
      })
    }

    // vm for watching i18n
    watch(`${scope}/lang`, {
      create (lang) {
        fallbackEnabled = true
        fetchTranslations(lang)
      },
      change: fetchTranslations
    })
  }]
}
