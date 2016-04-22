<template>
  <div class="users">
    <nav class="sub-navi">
      <c-route
        :recursive="recursive"
        :routes="routes"
        :filter="filter"
        ></c-route>
    </nav>
    <pre v-for="user in users" track-by="_id"><code>{{user | json}}</code></pre>
    <router-view></router-view>
  </div>
</template>

<script>
import routes from 'routes'
import { GET } from 'utils/ajax'
import { bearer, users } from 'vx/getters'
import { setUsers } from 'vx/actions'
export default {
  data () {
    return {
      recursive: true,
      routes: routes(['/users'])
    }
  },

  // computed: {
  //   filter () {
  //     return (key, route) => {
  //       return key !== '/users'
  //     }
  //   }
  // },

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

<style src="styles/views/users"></style>
