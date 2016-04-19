export default {
  '/': {
    icon: 'home',
    title: '首页',
    name: 'home',
    skip: true,
    exact: true,
    component: resolve => require(['views/Home'], resolve)
  },
  '/about': {
    icon: 'about',
    title: '关于',
    name: 'about',
    component: resolve => require(['views/About'], resolve)
  },
  '/users': {
    icon: 'users',
    title: '用户',
    name: 'users',
    auth: true,
    component: resolve => require(['views/Users'], resolve),
    subRoutes: {
      '/:username': {
        component: resolve => require(['views/Users'], resolve)
      }
    }
  },
  '/profile': {
    icon: 'profile',
    title: '资料',
    name: 'profile',
    auth: true,
    component: resolve => require(['views/Profile'], resolve)
  },
  '/signup': {
    icon: 'signup',
    title: '注册',
    name: 'signup',
    component: resolve => require(['views/Signup'], resolve)
  },
  '/login': {
    icon: 'login',
    title: '登录',
    name: 'login',
    component: resolve => require(['views/Login'], resolve)
  },
  '/logout': {
    icon: 'logout',
    title: '退出',
    name: 'logout',
    auth: true,
    component: resolve => require(['views/Logout'], resolve)
  }
}
