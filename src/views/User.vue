<template>
  <div>
    <ul v-for="user in users" track-by="_id">
      <li>username: <br> {{user.username}}</li>
      <li>password: <br> {{user.password}}</li>
      <li>token: <br> {{user.token}}</li>
      <li>expires: <br> {{user.expires}}</li>
    </ul>
  </div>
</template>

<script>
import ajax from 'utils/ajax'
export default {
  data () {
    return {
      users: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      ajax('/apis/users')
      .then(json => {
        this.users = json
      })
    }
  }
}
</script>

<style>
</style>
