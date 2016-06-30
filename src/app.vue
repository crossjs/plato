<template>
  <div class="container">
    <c-progress class="progress"
      :progress="progress"></c-progress>
    <c-toast class="toast"
      :toasts="toasts"></c-toast>
    <header class="header">
      <div class="logo">
        <c-route-link :route="{
            link: { path: '/', exact: true },
            title: 'PLATO'
          }"></c-route-link>
      </div>
      <div class="history">
        <c-button class="none" @click="historyBack">
          <c-icon value="back"></c-icon>
        </c-button>
      </div>
      <c-navbar class="navbar">
        <c-route :routes="routes"></c-route>
      </c-navbar>
    </header>
    <router-view class="router-view"
      transition="slide-up"
      transition-mode="out-in"
      keep-alive></router-view>
  </div>
</template>

<script>
import CProgress from 'plato-components/c-progress'
import CToast from 'plato-components/c-toast'
import CButton from 'plato-components/c-button'
import CIcon from 'plato-components/c-icon'
import CRouteLink from 'plato-components/c-route-link'
import CNavbar from 'plato-components/c-navbar'
import CRoute from 'plato-components/c-route'
import store from 'vx/store'
import { progress, toasts } from 'vx/getters'
import { setEnv } from 'vx/actions'
import { routes } from 'routes'

export default {
  name: 'App',
  store,
  // i18n: {
  //   // 翻译资源库
  //   // 覆盖上级（或全局）
  //   data () {
  //     return {}
  //   }
  // },

  computed: {
    routes () {
      return walkRoutes.call(this, routes, (key, route) => {
        return key !== '/' && route.auth !== !this.env.authorized
      })
    }
  },

  methods: {
    historyBack () {
      history.back()
    }
  },

  created () {
    // for get i18n in first
    this.setEnv(this.env)
    if (this.env.lang) {
      document.documentElement.dir = this.env.lang === 'ar' ? 'rtl' : 'ltr'
    }
  },

  watch: {
    'env.lang' (val) {
      if (val) {
        this.$nextTick(() => {
          document.documentElement.dir = val === 'ar' ? 'rtl' : 'ltr'
        })
      }
    }
  },

  vuex: {
    getters: {
      progress,
      toasts
    },
    actions: {
      setEnv
    }
  },

  components: {
    CProgress,
    CToast,
    CButton,
    CIcon,
    CRouteLink,
    CNavbar,
    CRoute
  }
}

function walkRoutes (routes, filter) {
  if (!routes) {
    return []
  }
  return Object.keys(routes)
  .filter(key => !routes[key].hidden)
  .filter(key => filter(key, routes[key]))
  .map(key => {
    const route = routes[key]
    return {
      path: route.path || key,
      name: route.name,
      exact: route.exact,
      icon: route.icon,
      title: this.__(route.title)
      // comment out for subRoutes
      // ,subRoutes: walkRoutes.call(this, route.subRoutes, filter)
    }
  })
}
</script>

<style src="styles/app"></style>
