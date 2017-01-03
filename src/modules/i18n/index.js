import Vue from 'vue'
import request from 'utils/request'
import template from 'string-template'
import createStore from './create-store'

export default (context, options = {}, register) => {
  options = {
    scope: 'i18n',
    prefix: '/',
    lang: navigator.language.split('-')[0],
    translations: {},
    ...options
  }

  const {
    scope,
    fallbackLang = 'zh',
    urlPattern = './i18n/{lang}.json'
  } = options

  register({
    store: createStore(context, options),
    options
  }, ({ store }) => {
    // vm for watching i18n
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
            this.fetchTranslations(fallbackLang)
          })
        }
      },
      watch: {
        lang (val) {
          this.fetchTranslations(val)
        }
      },
      created () {
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
      // searching at global or local
      if (keys.charAt(0) === '/') {
        const arr = keys.split('.')
        scope = arr[0].slice(1)
        keyArray = arr.slice(1)
      } else {
        scope = this.$scope
        keyArray = keys.split('.')
      }
      // `.` 作为分隔符
      return template(keyArray.reduce((res, key) => {
        if (res && typeof res === 'object' && res.hasOwnProperty(key)) {
          return res[key]
        }
        return keys
      }, scope ? vm.translations[scope] : vm.translations), ...args)
    }
  })
}
