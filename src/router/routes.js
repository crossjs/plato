export default [
  {
    path: '/',
    exact: true,
    component: () => System.import('views/home')
  },
  {
    path: '/demos',
    meta: {
      icon: 'eye'
    },
    component: () => System.import('views/demos')
  },
  {
    path: '/demos/:component',
    meta: {
      hidden: true
    },
    component: () => System.import('views/demos')
  },
  {
    path: '/create',
    meta: {
      icon: 'plus'
    },
    component: () => System.import('views/create')
  },
  {
    path: '/about',
    meta: {
      icon: 'question'
    },
    component: () => System.import('views/about')
  },
  {
    path: '/login',
    meta: {
      icon: 'lock',
      auth: false
    },
    component: () => System.import('views/login')
  },
  {
    path: '/logout',
    meta: {
      icon: 'lock',
      auth: true
    },
    component: () => System.import('views/logout')
  },
  {
    path: '/globe',
    meta: {
      icon: 'globe'
    },
    component: () => System.import('views/globe')
  }
]
