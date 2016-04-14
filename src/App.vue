<template>
  <div>
    <navi></navi>
    <router-view
    transition
    transition-mode="out-in"></router-view>
  </div>
</template>

<script>
import store from 'vx/store'
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
    Navi
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
  background-color: #fbf9fe;
  font-size: 1.5rem;
}
</style>
