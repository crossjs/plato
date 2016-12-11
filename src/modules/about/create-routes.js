export default () => {
  return [
    {
      path: '/',
      meta: {
        icon: 'question'
      },
      component: () => System.import('./views/index')
    }
  ]
}
