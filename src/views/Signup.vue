<template>
  <div>
    <div class="message" v-show="!!message">{{message}}</div>
    <form v-on:submit.prevent="signup">
      <div>
        <label>账号</label>
        <input type="text" name="username" v-model="username">
        <div class="desc">4-20 个小写字母</div>
      </div>
      <div>
        <label>密码</label>
        <input type="password" name="password" v-model="password">
        <div class="desc">8-20 个数字或大小写字母</div>
      </div>
      <div>
        <input type="submit" value="Sign Up">
      </div>
    </form>
  </div>
</template>

<script>
import 'whatwg-fetch'
const usernameRE = /^[a-z]{4,20}$/
const passwordRE = /^[0-9A-Za-z]{8,20}$/
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
      message: 'message',
      username: 'username',
      password: 'password'
    }
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
    signup () {
      if (this.isValid) {
        fetch('/apis/users', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        })
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            return res
          } else {
            const error = new Error(res.statusText)
            error.response = res.json()
            throw error
          }
        })
        .then(res => {
          return res.json()
        })
        .then(json => {
          console.log('1', json)
        })
        .catch(err => {
          console.log('2', err)
          return err.response
        })
        .then(err => {
          console.log('3', err)
          this.message = err.error
        })
      } else {
        this.message = '请输入账号与密码'
      }
    }
  }
}
</script>

<style>
</style>
