<template>
  <div class="detail">
    {{user | json}}
  </div>
</template>

<script>
import { users } from 'vx/getters'
import { getUser } from 'vx/actions'
export default {
  computed: {
    user () {
      let _user
      this.users.some(user => {
        if (user._id === this.$route.params.id) {
          _user = user
          return true
        }
      })
      return _user
    }
  },

  route: {
    activate (transition) {
      transition.next()
      this.getUser({
        _id: transition.to.params.id
      })
    }
  },

  vuex: {
    getters: {
      users
    },
    actions: {
      getUser
    }
  }
}
</script>
