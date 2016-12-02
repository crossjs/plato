export default [
  {
    path: '/',
    meta: {
      icon: 'question'
    },
    component: () => System.import('./views/index')
  }
]
