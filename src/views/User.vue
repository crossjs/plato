<template>
  <ul>
    <li v-for="user in users" track-by="_id">
      {{user.username}} - {{user.password}}
    </li>
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
