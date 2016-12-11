import Vue from 'vue'
import I18n from 'system/plugins/i18n'

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
    /**
     * Plugins
     */

    // 国际化
    Vue.use(I18n, {
      // 翻译资源库
      data (key) {
        return key ? translations[key] : translations
      }
    })
  })
}
