export default {
  icon: 'demo',
  title: '示例',
  name: 'demo',
  hidden: true,
  component: resolve => require(['views/demo'], resolve),
  subRoutes: {
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
    },
    '/chart': {
      icon: 'chart',
      title: 'chart',
      name: 'demo/chart',
      component: resolve => require(['views/demo/chart'], resolve)
    },
    '/misc': {
      icon: 'misc',
      title: 'misc',
      name: 'demo/misc',
      component: resolve => require(['views/demo/misc'], resolve)
    }
  }
}
