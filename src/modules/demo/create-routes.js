export default () => {
  return [
    {
      path: '/',
      meta: {
        icon: 'eye'
      },
      component: () => System.import('./views/index'),
      children: [{
        path: ':component',
        meta: {
          hidden: true
        },
        component: () => System.import('./views/index')
      }]
    }
  ]
}
