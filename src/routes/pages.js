export default {
  icon: 'pages',
  title: '页面',
  name: 'pages',
  auth: true,
  component: resolve => require(['views/pages'], resolve),
  subRoutes: {
    '/': {
      name: 'pages/all',
      auth: true,
      hidden: true,
      component: resolve => require(['views/pages/all'], resolve)
    },
    '/create': {
      icon: 'create',
      title: '创建页面',
      name: 'pages/create',
      auth: true,
      component: resolve => require(['views/pages/create'], resolve)
    }
  }
}
