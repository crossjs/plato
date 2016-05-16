<template>
  <div class="container">
    <progress cls="progress"
      :progress="progress"></progress>
    <toast cls="toast"
      :toasts="toasts"
      @remove="removeToast"></toast>
    <header class="header">
      <logo cls="logo">
        <a v-link="{ path: '/', exact: true }">plat</a>
      </logo>
      <navbar cls="navbar">
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
import { deleteToast } from 'vx/actions'
import Progress from 'components/c-progress'
import Toast from 'components/c-toast'
import Logo from 'components/c-logo'
import Navbar from 'components/c-navbar'
import Route from 'components/c-route'
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

  methods: {
    removeToast (toast) {
      this.deleteToast(toast)
    }
  },

  vuex: {
    getters: {
      progress,
      toasts
    },
    actions: {
      deleteToast
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
<style src="styles/views/components/navbar"></style>
