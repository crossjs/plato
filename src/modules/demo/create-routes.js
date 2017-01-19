export default () => {
  return [
    {
      path: '/',
      meta: {
        icon: 'eye'
      },
      component: () => import('./views/index'),
      children: [{
        path: ':component',
        meta: {
          hidden: true
        },
        component: () => import('./views/index')
      }]
    }
  ]
}
