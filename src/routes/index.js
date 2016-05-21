export default {
  routes: {
    '/': require('./home'),
    '/about': require('./about'),
    '/demo': require('./demo'),
    '/pages': require('./pages'),
    '/users': require('./users'),
    '/roles': require('./roles'),
    '/user': require('./user'),
    '/signup': require('./signup'),
    '/login': require('./login'),
    '/logout': require('./logout')
  },

  alias: {
    // '/login/:username': '/login'
  }
}
