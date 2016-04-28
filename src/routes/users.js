export default {
  icon: 'users',
  title: '用户',
  name: 'users',
  auth: true,
  component: resolve => require(['views/users'], resolve),
  subRoutes: {
    '/': {
      name: 'users/all',
      auth: true,
      hidden: true,
      component: resolve => require(['views/users/all'], resolve)
    },
    '/:username': {
      hidden: true,
      component: resolve => require(['views/users/detail'], resolve)
    },
    '/:username/modify': {
      name: 'users/modify',
      auth: true,
      hidden: true,
      component: resolve => require(['views/users/modify'], resolve)
    }
  }
}
