import createStore from './create-store'
import createRoutes from './create-routes'

export default ({ i18n }, options = {}, register) => {
  i18n(options)
  register({
    store: createStore(options),
    routes: createRoutes(options)
  }, () => {
    // nothing to do
    // should be removed
  })
}
