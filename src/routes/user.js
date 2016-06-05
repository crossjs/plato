export default {
  icon: 0xe601,
  title: '个人中心',
  name: 'user',
  auth: true,
  component: resolve => require(['views/user'], resolve),
  subRoutes: {
    '/': {
      name: 'user/profile',
      auth: true,
      hidden: true,
      component: resolve => require(['views/user/profile'], resolve)
    },
    '/modify': {
      name: 'user/modify',
      auth: true,
      hidden: true,
      component: resolve => require(['views/user/modify'], resolve)
    }
  }
}
