<template>
  <div class="container">
    <progress></progress>
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
import Progress from 'views/components/progress'
import Toast from 'views/components/toast'
import Logo from 'views/components/logo'
import Navi from 'views/components/navi'
export default {
  name: 'App',
  store,
  components: {
    Progress,
    Toast,
    Logo,
    Navi
  }
}
</script>

<style src="styles/app"></style>
