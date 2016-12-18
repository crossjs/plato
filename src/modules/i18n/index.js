import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Promise from 'nuo'
import merge from 'utils/merge'
import request from 'utils/request'
import template from 'string-template'
import createStore from './create-store'

export default (context, options = {}, register) => {
  // 将国际化信息注入到 context
  const lang = global.lang || navigator.language.split('-')[0]
  // { en: ..., zh: ..., ...}
  const translations = global.translations || {}

  const scopes = []
  context.i18n = function ({ scope }) {
    scopes.push(scope)
  }

  register({
    store: createStore({
      lang,
      translations: translations[lang] || {}
    }, options)
  }, ({ store }) => {
    // watching
    const vm = new Vue({
      store,
      computed: mapGetters(['lang', 'translations']),
      methods: mapActions(['setI18n']),
      created () {
        getTranslations(this.lang)
      },
      watch: {
        lang (val) {
          getTranslations(val)
        }
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
        scope = this.$options.__scope
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

    function getTranslations (lang) {
      if (!translations[lang]) {
        translations[lang] = {}
      }
      Promise.all(
        scopes.map(scope => request(`./i18n/${scope}/${lang}.json`).then(r => merge(translations[lang], {
          [scope]: r
        })))
      ).then(() => {
        vm.setI18n({
          translations: translations[lang]
        })
        // add `dir="..."` to `<html>`
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
      })
    }
  })
}
