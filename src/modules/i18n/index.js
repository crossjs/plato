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

  return [{
    store: createStore(options),
    options
  }, ({ store }) => {
    // vm for watching i18n
    // TODO 此处的实现略显繁琐，需要优化
    const vm = new Vue({
      store,
      scope,
      mapGetters: ['lang', 'translations'],
      mapActions: ['setI18n'],
      methods: {
        fetchTranslations (lang) {
          // add `dir="..."` to `<html>`
          document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
          // request json data
          request(template(urlPattern, { lang }))
          .then(translations => {
            this.setI18n({ translations })
          })
          .catch(() => {
            if (this.fallbackEnabled) {
              // 确保只执行一次，避免无限循环
              this.fallbackEnabled = false
              this.fetchTranslations(fallbackLang)
            }
          })
        }
      },
      watch: {
        lang (val) {
          this.fetchTranslations(val)
        }
      },
      created () {
        this.fallbackEnabled = true
        this.fetchTranslations(this.lang)
      }
    })

    /**
     * I18n
     */
    Vue.prototype.__ = Vue.prototype.$translate = function (keys, ...args) {
      if (!keys) {
        return keys
      }
      let scope
      let keyArray
      // 以 `/` 开头，说明是从全局里查找匹配
      // 否则，从当前 scope 里查找匹配
      if (keys.charAt(0) === '/') {
        const arr = keys.split('.')
        scope = arr[0].slice(1)
        keyArray = arr.slice(1)
      } else {
        scope = this.$scope
        keyArray = keys.split('.')
      }
      // keys 以 `.` 作为分隔符
      return template(keyArray.reduce((res, key) => {
        if (res && typeof res === 'object' && res.hasOwnProperty(key)) {
          return res[key]
        }
        return keys
      }, scope ? vm.translations[scope] : vm.translations), ...args)
    }
  }]
}
