export default {
  icon: 'demo',
  title: '示例',
  name: 'demo',
  component: resolve => require(['views/demo'], resolve),
  subRoutes: {
    '/': {
      hidden: true,
      name: 'demo/all',
      component: resolve => require(['views/demo/all'], resolve)
    },
    '/duo': {
      icon: 'duo',
      title: 'duo',
      name: 'demo/duo',
      component: resolve => require(['views/demo/duo'], resolve)
    },
    '/solo': {
      icon: 'solo',
      title: 'solo',
      name: 'demo/solo',
      component: resolve => require(['views/demo/solo'], resolve)
    }
  }
}
