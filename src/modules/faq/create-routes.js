export default () => {
  return [
    {
      path: '/',
      exact: true,
      component: () => System.import('./views/index')
    },
    {
      path: '/create',
      meta: {
        auth: true,
        icon: 'plus'
      },
      component: () => System.import('./views/create')
    }
  ]
}
