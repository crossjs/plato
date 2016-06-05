export default {
  icon: 0xe61b,
  title: '角色',
  name: 'roles',
  auth: true,
  component: resolve => require(['views/roles'], resolve),
  subRoutes: {
    '/': {
      name: 'roles/all',
      auth: true,
      hidden: true,
      component: resolve => require(['views/roles/all'], resolve)
    },
    '/create': {
      icon: 'create',
      title: '创建角色',
      name: 'roles/create',
      auth: true,
      component: resolve => require(['views/roles/create'], resolve)
    }
  }
}
