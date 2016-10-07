export default [
  {
    path: '/',
    exact: true,
    component: resolve => require(['views/home'], resolve)
  },
  {
    path: '/demos',
    icon: 'eye',
    component: resolve => require(['views/demos'], resolve)
  },
  {
    path: '/demos/:component',
    hidden: true,
    component: resolve => require(['views/demos'], resolve)
  },
  {
    path: '/create',
    icon: 'plus',
    component: resolve => require(['views/create'], resolve)
  },
  {
    path: '/about',
    icon: 'question',
    component: resolve => require(['views/about'], resolve)
  },
  {
    path: '/login',
    icon: 'lock',
    auth: false,
    component: resolve => require(['views/login'], resolve)
  },
  {
    path: '/logout',
    icon: 'lock',
    auth: true,
    component: resolve => require(['views/logout'], resolve)
  },
  {
    path: '/globe',
    icon: 'globe',
    component: resolve => require(['views/globe'], resolve)
  }
]
