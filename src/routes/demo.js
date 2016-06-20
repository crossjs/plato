export default {
  name: 'demo',
  component: resolve => require(['views/demo/index'], resolve),
  subRoutes: {
    '/form': {
      name: 'demo/form',
      component: resolve => require(['views/demo/form'], resolve)
    },
    '/chart': {
      name: 'demo/chart',
      component: resolve => require(['views/demo/chart'], resolve)
    },
    '/misc': {
      name: 'demo/misc',
      component: resolve => require(['views/demo/misc'], resolve)
    }
  }
}
