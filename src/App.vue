<template>
  <div class="container">
    <toast></toast>
    <header class="header">
      <logo></logo>
      <navi></navi>
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
import Toast from 'views/components/Toast'
import Logo from 'views/components/Logo'
import Navi from 'views/components/Navi'
export default {
  name: 'App',
  store,
  components: {
    Toast,
    Logo,
    Navi
  }
}
</script>

<style src="styles/app"></style>
