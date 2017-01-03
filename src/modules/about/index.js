import createRoutes from './create-routes'

export default (context, options = {}, register) => {
  options = { scope: 'about', prefix: '/', ...options }

  register({
    routes: createRoutes(context, options),
    options
  })
}
