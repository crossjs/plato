<template>
  <nav class="navi">
    <a v-for="link in links" v-link="{ path: link.path, exact: link.exact }" class="iconfont iconfont-{{link.icon}}">{{link.name}}</a>
  </nav>
</template>

<script>
import routes from 'routes'
import { bearer } from 'vx/getters'
export default {
  data () {
    return {
      links: [
        {
          icon: 'about',
          name: '关于',
          path: '/about'
        },
        {
          icon: 'users',
          name: '用户',
          path: '/users'
        },
        {
          icon: 'profile',
          name: '资料',
          path: '/profile'
        },
        {
          icon: 'signup',
          name: '注册',
          path: '/signup'
        },
        {
          icon: 'login',
          name: '登录',
          path: '/login'
        },
        {
          icon: 'logout',
          name: '退出',
          path: '/logout'
        }
      ]
    }
  },

  computed: {
    links () {
      if (this.bearer) {
        return walkRoutes(route => !route.skip && !!route.auth)
      } else {
        return walkRoutes(route => !route.skip && !route.auth)
      }
    }
  },

  vuex: {
    getters: {
      bearer
    }
  }
}

function walkRoutes (reducer) {
  if (!reducer) {
    reducer = () => {
      return true
    }
  }

  return Object.keys(routes)
    .filter(key => reducer(routes[key]))
    .map(key => {
      return {
        path: key,
        exact: routes[key].exact,
        icon: routes[key].icon,
        name: routes[key].name
      }
    })
}
</script>

<style>
@import "components/navi";
</style>
