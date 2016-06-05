<template>
  <div class="container">
    <c-progress class="progress"
      :progress="progress"></c-progress>
    <c-toast class="toast"
      :toasts="toasts"></c-toast>
    <header class="header">
      <c-logo class="logo">
        <a v-link="{ path: '/', exact: true }">PLATO</a>
      </c-logo>
      <c-navbar class="navbar">
        <c-route
          :recursive="recursive"
          :filter="filter"
          :routes="routes"></c-route>
      </c-navbar>
    </header>
    <router-view class="router-view"
      transition="router-view-transition"
      transition-mode="out-in"
      keep-alive></router-view>
  </div>
</template>

<script>
import CProgress from 'components/c-progress'
import CToast from 'components/c-toast'
import CLogo from 'components/c-logo'
import CNavbar from 'components/c-navbar'
import CRoute from 'components/c-route'
import store from 'vx/store'
import { toasts } from 'vx/getters'
import { routes } from 'routes'
import { GET } from 'utils/ajax'

export default {
  name: 'App',
  store,
  i18n: {
    resources: {}
  },

  data () {
    return {
      recursive: false,
      routes
    }
  },

  computed: {
    filter () {
      return (key, route) => {
        return key !== '/' && route.auth !== !this.auth
      }
    }
  },

  methods: {
    getResources () {
      const { lang } = this.env
      GET(`./i18n/${lang}.json`).then(resources => {
        this.$i18n.resources = resources
      })
    }
  },

  created () {
    this.getResources()
  },

  watch: {
    env (val, old) {
      if (val.lang !== old.lang) {
        this.$nextTick(() => {
          this.getResources()
        })
      }
    }
  },

  vuex: {
    getters: {
      toasts
    }
  },

  components: {
    CProgress,
    CToast,
    CLogo,
    CNavbar,
    CRoute
  }
}
</script>

<style src="styles/app"></style>
<style src="styles/views/components/logo"></style>
