<template>
  <div class="profile">
    <pre><code>{{profile | json}}</code></pre>
  </div>
</template>

<script>
import { profile } from 'vx/getters'
import { getProfile } from 'vx/actions'
export default {
  route: {
    activate () {
      if (this.bearer) {
        return this.getProfile()
      } else {
        this.$route.router.go('/login')
      }
    }
  },

  vuex: {
    getters: {
      profile
    },
    actions: {
      getProfile
    }
  }
}
</script>
