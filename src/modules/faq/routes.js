export default [
  {
    path: '/',
    // load as site index
    alias: '/',
    exact: true,
    component: () => System.import('./views/index')
  },
  {
    path: '/create',
    meta: {
      icon: 'plus'
    },
    component: () => System.import('./views/create')
  }
]
