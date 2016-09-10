export default [
  {
    path: '/',
    component: resolve => require(['views/home'], resolve)
  },
  {
    path: '/demos',
    title: 'routes.demos',
    component: resolve => require(['views/demos'], resolve)
  },
  {
    path: '/demos/:component',
    title: 'routes.demos',
    hidden: true,
    component: resolve => require(['views/demos'], resolve)
  },
  {
    path: '/create',
    title: 'routes.create',
    component: resolve => require(['views/create'], resolve)
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
