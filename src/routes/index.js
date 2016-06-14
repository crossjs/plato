export default {
  routes: {
    '/': require('./home'),
    '/about': require('./about'),
    '/demo': require('./demo'),
    '/login': require('./login'),
    '/logout': require('./logout')
  },

  alias: {
    // '/login/:username': '/login'
  }
}
