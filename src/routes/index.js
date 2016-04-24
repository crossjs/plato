const routes = {
  '/': {
    icon: 'home',
    title: '首页',
    name: 'home',
    exact: true,
    component: resolve => require(['views/home'], resolve)
  },
  '/about': {
    icon: 'about',
    title: '关于',
    name: 'about',
    component: resolve => require(['views/about'], resolve)
  },
  '/pages': {
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
  },
  '/users': {
    icon: 'users',
    title: '用户',
    name: 'users',
    auth: true,
    component: resolve => require(['views/users'], resolve),
    subRoutes: {
      '/': {
        name: 'users/all',
        auth: true,
        hidden: true,
        component: resolve => require(['views/users/all'], resolve)
      },
      '/:username': {
        hidden: true,
        component: resolve => require(['views/users/detail'], resolve)
      }
    }
  },
  '/user': {
    icon: 'user',
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
        icon: 'modify',
        title: '修改密码',
        name: 'user/modify',
        auth: true,
        component: resolve => require(['views/user/modify'], resolve)
      }
    }
  },
  '/signup': {
    icon: 'signup',
    title: '注册',
    name: 'signup',
    auth: false,
    component: resolve => require(['views/signup'], resolve)
  },
  '/login': {
    icon: 'login',
    title: '登录',
    name: 'login',
    auth: false,
    component: resolve => require(['views/login'], resolve)
  },
  '/logout': {
    icon: 'logout',
    title: '退出',
    name: 'logout',
    auth: true,
    component: resolve => require(['views/logout'], resolve)
  }
}

export default paths => {
  if (!paths || !paths.length) {
    return routes
  }

  let path
  let matched = routes
  while ((path = paths.shift())) {
    matched = matched[path]
    if (matched) {
      matched = matched.subRoutes
    }
    if (!matched) {
      break
    }
  }
  return matched || {}
}
