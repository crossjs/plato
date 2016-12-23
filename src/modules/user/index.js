import createRoutes from './create-routes'

export default (context, options = {}, register) => {
  options = { scope: 'user', prefix: '/', ...options }

  register({
    routes: createRoutes(context, options),
    ...options
  })
}
