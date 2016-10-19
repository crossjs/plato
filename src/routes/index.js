export default [
  {
    path: '/',
    exact: true,
    component: () => System.import('views/home')
  },
  {
    path: '/demos',
    icon: 'eye',
    component: () => System.import('views/demos')
  },
  {
    path: '/demos/:component',
    hidden: true,
    component: () => System.import('views/demos')
  },
  {
    path: '/create',
    icon: 'plus',
    component: () => System.import('views/create')
  },
  {
    path: '/about',
    icon: 'question',
    component: () => System.import('views/about')
  },
  {
    path: '/login',
    icon: 'lock',
    auth: false,
    component: () => System.import('views/login')
  },
  {
    path: '/logout',
    icon: 'lock',
    auth: true,
    component: () => System.import('views/logout')
  },
  {
    path: '/globe',
    icon: 'globe',
    component: () => System.import('views/globe')
  }
]
