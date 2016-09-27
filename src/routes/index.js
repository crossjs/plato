export default [
  {
    path: '/',
    exact: true,
    component: resolve => require(['views/home'], resolve)
  },
  {
    path: '/demos',
    // title: 'routes.demos',
    icon: 'eye',
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
    // title: 'routes.create',
    icon: 'plus',
    component: resolve => require(['views/create'], resolve)
  },
  {
    path: '/about',
    // title: 'routes.about',
    icon: 'question',
    component: resolve => require(['views/about'], resolve)
  },
  {
    path: '/login',
    // title: 'routes.login',
    icon: 'lock',
    auth: false,
    component: resolve => require(['views/login'], resolve)
  },
  {
    path: '/logout',
    // title: 'routes.logout',
    icon: 'lock',
    auth: true,
    component: resolve => require(['views/logout'], resolve)
  }
]
