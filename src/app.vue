<template>
  <div class="container">
    <progress class="progress"
      :progress="progress"></progress>
    <toast class="toast"
      :toasts="toasts"></toast>
    <header class="header">
      <logo class="logo">
        <a v-link="{ path: '/', exact: true }">plato</a>
      </logo>
      <navbar class="navbar">
        <route
          :recursive="recursive"
          :filter="filter"
          :routes="routes"
          ></route>
      </navbar>
    </header>
    <router-view class="router-view"
      transition="router-view-transition"
      transition-mode="out-in"
      keep-alive></router-view>
  </div>
</template>

<script>
import store from 'vx/store'
import { toasts } from 'vx/getters'
import Progress from 'components/c-progress'
import Toast from 'components/c-toast'
import Logo from 'components/c-logo'
import Navbar from 'components/c-navbar'
import Route from 'components/c-route'
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
    Progress,
    Toast,
    Logo,
    Navbar,
    Route
  }
}
</script>

<style src="styles/app"></style>
<style src="styles/views/components/logo"></style>
