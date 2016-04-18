<template>
  <div class="container">
    <toast></toast>
    <header class="header">
      <logo></logo>
      <navi></navi>
    </header>
    <router-view class="router-view" transition="router-view-transition" transition-mode="out-in" keep-alive></router-view>
    <footer class="footer">
      &copy; 2016
    </footer>
  </div>
</template>

<script>
import store from 'vx/store'
import Toast from 'components/Toast'
import Logo from 'components/Logo'
import Navi from 'components/Navi'
export default {
  name: 'App',
  store,
  // data () {
  //   return {
  //     authenticating: false
  //   }
  // },
  components: {
    Toast,
    Logo,
    Navi
  }
}
</script>

<style>
@import "app";
</style>
