<template>
  <div>
    {{status}}
  </div>
</template>

<script>
import { DELETE } from 'utils/ajax'
import { setBearer } from 'vx/actions'
import { bearer } from 'vx/getters'
export default {
  data () {
    return {
      status: 'loading'
    }
  },

  created () {
    this.logout()
  },

  // methods
  methods: {
    logout () {
      if (!this.bearer) {
        this.$route.router.go('/')
        return
      }
      const { token, expires } = this.bearer
      if (!token || expires < Date.now()) {
        this.setBearer(null)
        this.$route.router.go('/')
        return
      }
      DELETE('/apis/logout')
      .then(json => {
        this.setBearer(null)
        this.$route.router.go('/')
      })
    }
  },

  vuex: {
    getters: {
      bearer
    },
    actions: {
      setBearer
    }
  }
}
</script>

<style>
</style>
