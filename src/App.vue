<template>
  <div>
    <toast></toast>
    <navi></navi>
    <router-view class="view" transition="view-transition" transition-mode="out-in" keep-alive></router-view>
  </div>
</template>

<script>
import store from 'vx/store'
import Toast from 'components/Toast'
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
.view {
  transition: all .5s ease;
}
.view-transition-enter, .view-transition-leave {
  opacity: 0;
  transform: translate3d(10px, 0, 0);
}
[v-cloak] {
  display: none;
}
</style>
