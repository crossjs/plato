import Vue from 'vue'
import I18n from 'system/plugins/i18n'

export default ({ registerModule, registerRoutes, translations }, options = {}, next) => {
  const { name = 'i18n', prefix = 'i18n' } = options

  registerModule({
    config: {
      // add routes to store
      state: {
        lang: navigator.language.split('-')[0],
        translations
      },
      getters: {
        lang: state => state.lang,
        translations: state => state.translations
      }
    }
  })

  next(() => {
    __PROD__ || console.log(`use module "${name}", with prefix "${prefix}" for routes`)

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
