import createRoutes from './create-routes'

export default (context, options = {}, register) => {
  register({
    routes: createRoutes(options)
  }, () => {
  })
}
