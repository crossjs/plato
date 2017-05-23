import createRoutes from './create-routes'

export default (context, options = {}) => {
  options = { scope: 'about', prefix: 'about', ...options }

  // only data
  return {
    routes: createRoutes(context, options),
    options
  }
}
