export default [
  {
    path: '/',
    component: resolve => require(['views/home'], resolve)
  },
  {
    path: '/demo',
    component: resolve => require(['views/demo'], resolve)
  },
  {
    path: '/docs',
    title: 'routes.docs',
    component: resolve => require(['views/docs'], resolve),
    children: [{
      path: 'read/:name',
      name: 'docs/read',
      component: resolve => require(['views/docs/read'], resolve)
    }]
  },
  {
    path: '/about',
    title: 'routes.about',
    component: resolve => require(['views/about'], resolve)
  },
  {
    path: '/login',
    title: 'routes.login',
    auth: false,
    component: resolve => require(['views/login'], resolve)
  },
  {
    path: '/logout',
    title: 'routes.logout',
    auth: true,
    component: resolve => require(['views/logout'], resolve)
  }
]
