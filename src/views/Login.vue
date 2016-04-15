<template>
  <div>
    <form v-on:submit.prevent="login">
      <div>
        <label>Username:</label>
        <input type="text" name="username" v-model="username">
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div>
        <input type="submit" value="Log In">
      </div>
    </form>
    <ul class="errors">
      <li v-show="!validation.username">Name cannot be empty.</li>
      <li v-show="!validation.password">Please provide a valid email address.</li>
    </ul>
  </div>
</template>

<script>
import { GET, POST } from 'utils/ajax'
import { setBearer } from 'vx/actions'
import { bearer } from 'vx/getters'
const usernameRE = /^[a-z]{4,20}$/
const passwordRE = /^[0-9A-Za-z]{4,20}$/
// http://stackoverflow.com/questions/3802192/regexp-java-for-password-validation
// ^                 # start-of-string
// (?=.*[0-9])       # a digit must occur at least once
// (?=.*[a-z])       # a lower case letter must occur at least once
// (?=.*[A-Z])       # an upper case letter must occur at least once
// (?=.*[@#$%^&+=])  # a special character must occur at least once
// (?=\S+$)          # no whitespace allowed in the entire string
// .{8,}             # anything, at least eight places though
// $                 # end-of-string
// const passwordRE = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/
export default {
  data () {
    return {
      username: 'username',
      password: 'password'
    }
  },

  created () {
    this.check()
  },

  // computed property for form validation state
  computed: {
    validation () {
      return {
        username: usernameRE.test(this.username),
        password: passwordRE.test(this.password)
      }
    },
    isValid () {
      const validation = this.validation
      return Object.keys(validation).every(key => {
        return validation[key]
      })
    }
  },

  // methods
  methods: {
    login () {
      if (!this.isValid) {
        return
      }
      POST('/apis/login', {
        body: {
          username: this.username,
          password: this.password
        }
      })
      .then(json => {
        this.setBearer(json)
        this.$route.router.go('/users')
      })
      .catch(err => {
        console.log(err)
      })
    },
    check () {
      if (!this.bearer) {
        return
      }
      const { token, expires } = this.bearer
      if (!token || expires < Date.now()) {
        return
      }
      GET('/apis/check')
      .then(json => {
        this.setBearer(json)
        this.$route.router.go('/users')
      })
      .catch(err => {
        console.log(err)
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
