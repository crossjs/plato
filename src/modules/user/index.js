import createRoutes from './create-routes'

export default ({ i18n }, options = {}, register) => {
  i18n(options)
  register({
    routes: createRoutes(options)
  }, () => {
  })
}
