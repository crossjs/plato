export default {
  '/': {
    icon: 'home',
    title: '首页',
    name: 'home',
    skip: true,
    exact: true,
    // component: resolve => require(['views/Home'], resolve)
    component: require('views/Home')
  },
  '/about': {
    icon: 'about',
    title: '关于',
    name: 'about',
    // component: resolve => require(['views/About'], resolve)
    component: require('views/About')
  },
  '/users': {
    icon: 'users',
    title: '用户',
    name: 'users',
    auth: true,
    // component: resolve => require(['views/Users'], resolve),
    component: resolve => require(['views/Users'], resolve),
    subRoutes: {
      '/:username': {
        // component: resolve => require(['views/Users'], resolve)
        component: resolve => require(['views/Users'], resolve)
      }
    }
  },
  '/profile': {
    icon: 'profile',
    title: '资料',
    name: 'profile',
    auth: true,
    // component: resolve => require(['views/Profile'], resolve)
    component: require('views/Profile')
  },
  '/signup': {
    icon: 'signup',
    title: '注册',
    name: 'signup',
    // component: resolve => require(['views/Signup'], resolve)
    component: require('views/Signup')
  },
  '/login': {
    icon: 'login',
    title: '登录',
    name: 'login',
    // component: resolve => require(['views/Login'], resolve)
    component: require('views/Login')
  },
  '/logout': {
    icon: 'logout',
    title: '退出',
    name: 'logout',
    auth: true,
    // component: resolve => require(['views/Logout'], resolve)
    component: require('views/Logout')
  }
}
