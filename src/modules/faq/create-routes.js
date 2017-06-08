export default () => {
  return [
    {
      path: '/',
      exact: true,
      // 异步
      component: () => import('./views/index')
      // 同步
      // component: require('./views/index')
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
