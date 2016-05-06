<template>
  <div class="logout">
    {{status}}
  </div>
</template>

<script>
import { deleteBearer } from 'vx/actions'
export default {
  data () {
    return {
      status: 'loading'
    }
  },

  route: {
    activate () {
      if (!this.auth) {
        return
      }
      return this.deleteBearer()
    }
  },

  vuex: {
    actions: {
      deleteBearer
    }
  },

  watch: {
    auth (value) {
      this.$nextTick(() => {
        if (!value) {
          this.$route.router.go('/')
        }
      })
    }
  }
}
</script>
