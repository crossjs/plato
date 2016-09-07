<template>
  <div class="container">
    <c-progress class="progress"
      :progress="progress"></c-progress>
    <c-toast class="toast"
      :toasts="toasts"></c-toast>
    <header class="header">
      <div class="logo">
        <router-link class="c-route-link" to="/">
          PLATO <sub>based on vue@2</sub>
        </router-link>
      </div>
      <div class="history">
        <c-button cls="none" @click.native="_back">
          <c-icon value="back"></c-icon>
        </c-button>
      </div>
      <c-navbar class="navbar">
        <c-route :routes="routes"></c-route>
      </c-navbar>
    </header>
    <transition name="fade" mode="out-in" appear>
      <router-view keep-alive></router-view>
    </transition>
  </div>
</template>

<script>
import CProgress from 'components/c-progress'
import CToast from 'components/c-toast'
import CButton from 'components/c-button'
import CIcon from 'components/c-icon'
import CNavbar from 'components/c-navbar'
import CRoute from 'components/c-route'
import { mapGetters, mapActions } from 'vuex'
import routes from 'routes'

export default {
  computed: {
    ...mapGetters(['authorized', 'lang', 'i18n', 'progress', 'toasts']),
    routes () {
      return walkRoutes.call(this, routes, route => {
        return route.path !== '/' && route.auth !== !this.authorized
      })
    }
  },

  methods: {
    ...mapActions(['setEnv']),
    _back () {
      this.$router.back()
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
      title: route.title
      // comment out for children
      // ,children: walkRoutes.call(this, route.children, filter)
    }
  })
}
</script>

<style src="styles/app"></style>
