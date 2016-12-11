export default () => {
  return [
    {
      path: '/login',
      meta: {
        icon: 'lock',
        auth: false
      },
      component: () => System.import('./views/login')
    },
    {
      path: '/logout',
      meta: {
        icon: 'lock',
        auth: true
      },
      component: () => System.import('./views/logout')
    }
  ]
}
