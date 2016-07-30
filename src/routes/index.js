export default [
  {
    path: '/',
    component: resolve => require(['views/home'], resolve)
  },
  {
    path: '/demo',
    component: resolve => require(['views/demo/index'], resolve),
    children: [{
      path: 'chart',
      name: 'demo/chart',
      component: resolve => require(['views/demo/chart'], resolve)
    }, {
      path: 'misc',
      name: 'demo/misc',
      component: resolve => require(['views/demo/misc'], resolve)
    }]
  },
  {
    path: '/docs',
    title: 'routes.docs',
    component: resolve => require(['views/docs'], resolve)
  },
  {
    path: '/about',
    title: 'routes.about',
    component: resolve => require(['views/about'], resolve)
  },
  {
    path: '/login',
    title: 'routes.login',
    component: resolve => require(['views/login'], resolve)
  },
  {
    path: '/logout',
    title: 'routes.logout',
    component: resolve => require(['views/logout'], resolve)
  }
]
