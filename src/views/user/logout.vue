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
      if (!this.bearer) {
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
    bearer (value) {
      this.$nextTick(() => {
        if (!value) {
          this.$route.router.go('/')
        }
      })
    }
  }
}
</script>
