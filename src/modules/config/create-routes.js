export default () => {
  return [
    {
      path: '/',
      meta: {
        icon: 'globe'
      },
      component: () => import('./views/index')
    }
  ]
}
