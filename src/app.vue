<template>
  <div class="container">
    <c-progress class="progress"
      :progress="progress"></c-progress>
    <c-toast class="toast"
      :toasts="toasts"></c-toast>
    <header class="header">
      <div class="logo">
        <router-link class="c-route-link" to="/">
          PLATO
        </router-link>
      </div>
      <div class="history">
        <c-button className="none" @click="historyBack">
          <c-icon value="back"></c-icon>
        </c-button>
      </div>
      <c-navbar class="navbar">
        <c-route :routes="routes"></c-route>
      </c-navbar>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import CProgress from 'plato-components/c-progress'
import CToast from 'plato-components/c-toast'
import CButton from 'plato-components/c-button'
import CIcon from 'plato-components/c-icon'
import CNavbar from 'plato-components/c-navbar'
import CRoute from 'plato-components/c-route'
import { mapGetters, mapActions } from 'vuex'
import routes from 'routes'

export default {
  i18n: {
  //   // 翻译资源库
  //   // 覆盖上级（或全局）
  //   data () {
  //     return {}
  //   }
  },

  computed: {
    ...mapGetters(['lang', 'i18n', 'progress', 'toasts']),
    routes () {
      return walkRoutes.call(this, routes, route => {
        return route.path !== '/' && route.auth !== !this.authorized
      })
    }
  },

  methods: {
    ...mapActions(['setEnv']),
    historyBack () {
      history.back()
    }
  },

  created () {
    // for get i18n in first
    if (!this.i18n) {
      this.setEnv({
        lang: this.lang
      })
    }
    document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr'
  },

  watch: {
    lang (val) {
      document.documentElement.dir = val === 'ar' ? 'rtl' : 'ltr'
    }
  },

  components: {
    CProgress,
    CToast,
    CButton,
    CIcon,
    CNavbar,
    CRoute
  }
}

function walkRoutes (routes, filter) {
  if (!routes) {
    return []
  }
  return routes
  .filter(route => !route.hidden)
  .filter(route => filter(route))
  .map(route => {
    return {
      path: route.path,
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
