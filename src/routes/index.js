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
    title: '首页',
    name: 'home',
    skip: true,
    exact: true,
    component: Home
  },
  '/about': {
    icon: 'about',
    title: '关于',
    name: 'about',
    component: About
  },
  '/users': {
    icon: 'users',
    title: '用户',
    name: 'users',
    auth: true,
    component: Users,
    subRoutes: {
      '/:username': {
        component: Users
      }
    }
  },
  '/profile': {
    icon: 'profile',
    title: '资料',
    name: 'profile',
    auth: true,
    component: Profile
  },
  '/signup': {
    icon: 'signup',
    title: '注册',
    name: 'signup',
    component: Signup
  },
  '/login': {
    icon: 'login',
    title: '登录',
    name: 'login',
    component: Login
  },
  '/logout': {
    icon: 'logout',
    title: '退出',
    name: 'logout',
    auth: true,
    component: Logout
  }
}
