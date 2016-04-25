<template>
  <div class="users">
    <c-grid
      :data="users"
      :columns="columns"
      :filter-key="query"></c-grid>
    <pre v-for="user in users" track-by="_id"><code>{{user | json}}</code></pre>
  </div>
</template>

<script>
import mGrid from 'mixins/m-grid'
import { GET } from 'utils/ajax'
import { bearer, users } from 'vx/getters'
import { setUsers } from 'vx/actions'
export default {
  mixins: [mGrid],

  data () {
    return {
      columns: {
        username: {
          label: '用户名'
        },
        created: {
          label: '创建时间',
          filters: 'datetime'
        }
      }
    }
  },

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
