export default () => {
  return [
    {
      path: '/',
      meta: {
        icon: 'question'
      },
      component: () => import('./views/index')
    }
  ]
}
