import createRoutes from './create-routes'

export default (context, options = {}, register) => {
  options = { scope: 'demo', prefix: '/', ...options }
  register({
    routes: createRoutes(options),
    ...options
  })
}
