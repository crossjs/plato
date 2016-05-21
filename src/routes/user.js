export default {
  icon: 'user',
  title: '个人中心',
  name: 'user',
  auth: true,
  component: resolve => require(['views/user'], resolve),
  subRoutes: {
    '/': {
      name: 'user/profile',
      auth: true,
      // hidden: true,
      component: resolve => require(['views/user/profile'], resolve)
    }
  }
}
