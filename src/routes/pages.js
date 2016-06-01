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
    '/preview/:id': {
      // icon: 'preview',
      // title: '预览页面',
      name: 'pages/preview',
      auth: true,
      hidden: true,
      component: resolve => require(['views/pages/preview'], resolve)
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
