<template>
  <div class="container">
    <toast></toast>
    <navi></navi>
    <router-view class="router-view" transition="router-view-transition" transition-mode="out-in" keep-alive></router-view>
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
@import "index";
.container {
  position: fixed;
  z-index: 1;
  box-sizing: border-box;
  padding-top: var(--header_height);
  padding-bottom: var(--footer_height);
  height: 100%;
  width: 100%;
}

.router-view {
  transition: all .5s ease;
}

.router-view-transition-enter, .router-view-transition-leave {
  opacity: 0;
  transform: translate3d(1rem, 0, 0);
}

[v-cloak] {
  display: none;
}
</style>
