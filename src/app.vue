<template>
  <div class="container">
    <progress></progress>
    <toast></toast>
    <header class="header">
      <logo></logo>
      <navbar cls="navbar">
        <c-route
          :filter="filter"
          :routes="routes"
          ></c-route>
      </navbar>
    </header>
    <section class="content">
      <router-view class="router-view" transition="router-view-transition" transition-mode="out-in" keep-alive></router-view>
    </section>
    <footer class="footer">
      &copy; 2016
    </footer>
  </div>
</template>

<script>
import store from 'vx/store'
import Progress from 'views/components/progress'
import Toast from 'views/components/toast'
import Logo from 'views/components/logo'
import Navbar from 'components/c-navbar'
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
  components: {
    Progress,
    Toast,
    Logo,
    Navbar
  }
}
</script>

<style src="styles/app"></style>
<style src="styles/views/components/navbar"></style>
