export default () => {
  return [
    {
      path: '/',
      meta: {
        icon: 'globe'
      },
      component: () => System.import('./views/index')
    }
  ]
}
