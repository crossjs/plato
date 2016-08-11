export default [
  {
    path: '/',
    component: resolve => require(['views/home'], resolve)
  },
  {
    path: '/new',
    title: 'routes.new',
    component: resolve => require(['views/new'], resolve)
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
