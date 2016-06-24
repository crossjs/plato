export default {
  icon: 'docs',
  title: 'routes.docs',
  name: 'docs',
  component: resolve => require(['views/docs/index'], resolve),
  subRoutes: {
    '/:name': {
      name: 'docs/read',
      component: resolve => require(['views/docs/read'], resolve)
    }
  }
}
