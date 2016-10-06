<template>
  <div id="container">
    <c-progress id="progress"
      :progress="progress"></c-progress>
    <transition name="fade">
      <c-toast v-if="toast">{{toast}}</c-toast>
    </transition>
    <header id="header">
      <div id="logo">
        <router-link class="c-route-link" to="/">
          PLATO <sub>based on vue 2.x</sub>
        </router-link>
      </div>
      <div id="history">
        <c-link v-tap="_back">
          <c-icon>chevron-left</c-icon>
        </c-link>
      </div>
      <c-navbar id="navbar">
        <c-icon class="c-reddot" slot="icon">three-bars</c-icon>
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
import CLink from 'components/c-link'
import CIcon from 'components/c-icon'
import CNavbar from 'components/c-navbar'
import CRoute from 'components/c-route'
import { mapGetters, mapActions } from 'vuex'
import routes from 'routes'

export default {
  computed: {
    ...mapGetters(['authorized', 'lang', 'i18n', 'progress', 'toast']),
    routes () {
      return walkRoutes.call(this, routes, route => {
        return !route.hidden && route.path !== '/' && route.auth !== !this.authorized
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
    CLink,
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
<style src="styles/components/reddot"></style>
