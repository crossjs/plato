import createStore from './create-store'
import createRoutes from './create-routes'
import translations from './i18n/zh.json'

export default (context, options = {}, register) => {
  register({
    store: createStore(options),
    routes: createRoutes(options),
    translations
  }, () => {
  })
}
