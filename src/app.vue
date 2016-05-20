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
import { progress, toasts } from 'vx/getters'
import Progress from 'solo/c-progress'
import Toast from 'solo/c-toast'
import Logo from 'solo/c-logo'
import Navbar from 'solo/c-navbar'
import Route from 'solo/c-route'
import { routes } from 'routes'
export default {
  name: 'App',
  store,

  data () {
    return {
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

  vuex: {
    getters: {
      progress,
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
