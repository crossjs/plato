<template>
  <div>
    {{status}}
  </div>
</template>

<script>
import { DELETE } from 'utils/ajax'
import { setBearer } from 'vx/actions'
export default {
  data () {
    return {
      status: 'loading'
    }
  },

  methods: {
    logout () {
      if (!this.bearer) {
        this.setBearer(null)
        this.$route.router.go('/')
        return
      }
      DELETE('/apis/user/logout')
      .then(json => {
        this.setBearer(null)
        this.$route.router.go('/')
      })
    }
  },

  route: {
    activate (transition) {
      transition.next()
      this.logout()
    }
  },

  vuex: {
    actions: {
      setBearer
    }
  }
}
</script>
