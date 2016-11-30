export default [
  {
    path: '/login',
    meta: {
      icon: 'lock',
      auth: false
    },
    component: () => System.import('./views/login')
  },
  {
    path: '/logout',
    meta: {
      icon: 'lock',
      auth: true
    },
    component: () => System.import('./views/logout')
  },
  {
    path: '/globe',
    meta: {
      icon: 'globe'
    },
    component: () => System.import('./views/globe')
  }
]
