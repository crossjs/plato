import createStore from './create-store'
import createRoutes from './create-routes'

export default (context, options = {}, register) => {
  options = { scope: 'faq', prefix: '/', ...options }
  register({
    store: createStore(options),
    routes: createRoutes(options),
    ...options
  })
}
