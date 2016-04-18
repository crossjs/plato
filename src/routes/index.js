import Home from 'views/Home'
import Users from 'views/Users'
import About from 'views/About'
import Profile from 'views/Profile'
import Login from 'views/Login'
import Signup from 'views/Signup'
import Logout from 'views/Logout'

export default {
  '/': {
    icon: 'home',
    name: '首页',
    skip: true,
    auth: false,
    exact: true,
    component: Home
  },
  '/about': {
    icon: 'about',
    name: '关于',
    auth: false,
    component: About
  },
  '/users': {
    icon: 'users',
    auth: true,
    name: '用户',
    component: Users,
    subRoutes: {
      '/:username': {
        component: Users
      }
    }
  },
  '/profile': {
    icon: 'profile',
    auth: true,
    name: '资料',
    component: Profile
  },
  '/signup': {
    icon: 'signup',
    name: '注册',
    component: Signup
  },
  '/login': {
    icon: 'login',
    name: '登录',
    component: Login
  },
  '/logout': {
    icon: 'logout',
    auth: true,
    name: '退出',
    component: Logout
  }
}
