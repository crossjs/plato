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
  })
}
