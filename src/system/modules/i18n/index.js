import Vue from 'vue'
import template from 'string-template'

export default ({ translations }, options = {}, register) => {
  register({
    store: {
      state: {
        lang: navigator.language.split('-')[0],
        translations
      },
      getters: {
        lang: state => state.lang,
        translations: state => state.translations
      }
    }
  }, () => {
    Vue.prototype.__ = Vue.prototype.$translate = function (keys, ...args) {
      if (!keys) {
        return keys
      }
      // `.` 作为分隔符
      return template(keys.split('.').reduce((res, key) => {
        if (res && typeof res === 'object' && res.hasOwnProperty(key)) {
          return res[key]
        }
        return keys
      }, getTranslations(this.$options.__name)), ...args)
    }

    function getTranslations (name) {
      return name ? translations[name] : translations
    }
  })
}
