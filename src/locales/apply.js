export default (env, store, Vue) => {
  const { lang } = env(store.state)

  function update (lang) {
    Vue.config.lang = lang
    Vue.locale(lang, require(`locales/${lang}.json`))
  }

  store.watch(({ env }) => {
    return env.env.lang
  }, update)

  update(lang)
}
