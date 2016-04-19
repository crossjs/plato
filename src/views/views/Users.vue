<template>
  <div>
    <pre v-for="user in users" track-by="_id"><code>{{user | json}}</code></pre>
  </div>
</template>

<script>
import { GET } from 'utils/ajax'
import { bearer, users } from 'vx/getters'
import { setUsers } from 'vx/actions'
export default {
  methods: {
    fetchUsers () {
      GET('/apis/users')
      .then(json => {
        this.setUsers(json)
      })
    }
  },

  route: {
    activate (transition) {
      if (this.bearer) {
        transition.next()
        this.fetchUsers()
      } else {
        this.$route.router.go('/')
      }
    }
  },

  vuex: {
    getters: {
      bearer,
      users
    },
    actions: {
      setUsers
    }
  }
}
</script>
