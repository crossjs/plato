export default () => {
  return [
    {
      path: '/login',
      meta: {
        icon: 'lock',
        auth: false
      },
      component: () => import('./views/login')
    },
    {
      path: '/logout',
      meta: {
        icon: 'lock',
        auth: true
      },
      component: () => import('./views/logout')
    }
  ]
}
