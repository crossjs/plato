export default () => {
  return [
    {
      path: '/',
      exact: true,
      component: () => import('./views/index')
    },
    {
      path: '/create',
      meta: {
        auth: true,
        icon: 'plus'
      },
      component: () => import('./views/create')
    }
  ]
}
