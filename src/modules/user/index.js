import createRoutes from './create-routes'
import translations from './i18n/zh.json'

export default (context, options = {}, register) => {
  // do something, then call register function
  register({
    routes: createRoutes(options),
    translations
  }, () => {
  })
}
