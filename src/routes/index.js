export default {
  routes: {
    '/': require('./home'),
    '/demo': require('./demo'),
    '/docs': require('./docs'),
    '/about': require('./about'),
    '/login': require('./login'),
    '/logout': require('./logout')
  },

  alias: {
    // '/login/:username': '/login'
  }
}
