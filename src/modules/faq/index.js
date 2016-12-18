import createStore from './create-store'
import createRoutes from './create-routes'

export default (context, options = {}, register) => {
  register({
    store: createStore(options),
    routes: createRoutes(options)
  }, () => {
    // nothing to do
    // should be removed
  })
}
