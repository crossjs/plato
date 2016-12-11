export default () => {
  return [
    {
      path: '/',
      meta: {
        icon: 'eye'
      },
      component: () => System.import('./views/index')
    },
    {
      path: '/:component',
      meta: {
        hidden: true
      },
      component: () => System.import('./views/index')
    }
  ]
}
