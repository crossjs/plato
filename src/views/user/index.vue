<template>
  <div class="view-user">
    <router-view></router-view>
  </div>
</template>

<script>
import { bearer } from 'vx/getters'
export default {
  route: {
    activate () {
      if (this.bearer) {
        return true
      } else {
        this.$route.router.go('/login')
      }
    }
  },

  vuex: {
    getters: {
      bearer
    }
  }
}
</script>
