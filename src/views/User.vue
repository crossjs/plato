<template>
  <ul v-for="user in users" track-by="_id">
    <li>username: <br> {{user.username}}</li>
    <li>password: <br> {{user.password}}</li>
    <li>token: <br> {{user.token}}</li>
    <li>expires: <br> {{user.expires}}</li>
  </ul>
</template>

<script>
import 'whatwg-fetch'
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
      fetch('/apis/users')
      .then(res => {
        return res.json()
      })
      .then(json => {
        this.users = json
      })
    }
  }
}
</script>

<style>
</style>
