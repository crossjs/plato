import Vue from 'vue'
import Router from 'vue-router'

import App from 'App'
import Home from 'views/Home'
import User from 'views/User'
import About from 'views/About'
import Profile from 'views/Profile'
import Login from 'views/Login'
import Signup from 'views/Signup'
import Logout from 'views/Logout'

if (module.hot) {
  module.hot.accept()
}

// process.env.NODE_ENV === 'developmemnt'
Vue.config.debug = true

Vue.use(Router)

const router = new Router({
  history: /127\.0\.0\.1/.test(location.href), // use history=false when testing
  saveScrollPosition: true
})

router.map({
  '/': {
    component: Home
  },
  '/about': {
    component: About
  },
  '/users': {
    component: User
  },
  '/login': {
    component: Login
  },
  '/profile': {
    component: Profile
  },
  '/logout': {
    component: Logout
  },
  '/signup': {
    component: Signup
  }
})

router.beforeEach(transition => {
  if (/\/http/.test(transition.to.path)) {
    const url = transition.to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    transition.next()
  }
})

router.afterEach(transition => {
  // if (transition.to.fullPath !== '/demo') {
  window.scrollTo(0, 0)
  // }
})

router.start(App, 'app')
