import createStore from './create-store'
import createRoutes from './create-routes'

export default (context, options = {}, register) => {
  options = { scope: 'faq', prefix: '/', ...options }

  register({
    store: createStore(context, options),
    routes: createRoutes(context, options),
    options
  })
}
