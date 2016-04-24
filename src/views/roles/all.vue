<template>
  <div class="roles">
    <pre v-for="role in roles" track-by="_id"><code>{{role | json}}</code></pre>
  </div>
</template>

<script>
import { GET } from 'utils/ajax'
import { bearer, roles } from 'vx/getters'
import { setRoles } from 'vx/actions'
export default {
  methods: {
    fetchRoles () {
      GET('/apis/roles')
      .then(json => {
        this.setRoles(json)
      })
    }
  },

  route: {
    activate (transition) {
      if (this.bearer) {
        transition.next()
        this.fetchRoles()
      } else {
        this.$route.router.go('/')
      }
    }
  },

  vuex: {
    getters: {
      bearer,
      roles
    },
    actions: {
      setRoles
    }
  }
}
</script>
