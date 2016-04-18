<template>
  <div>
    <form class="ui-form ui-form-login" v-on:submit.prevent="login" novalidate>
      <ul class="ui-form-items">
        <li class="ui-form-item ui-form-icon-item required">
          <span class="ui-form-icon iconfont iconfont-user-o"></span>
          <input class="ui-form-input" type="text" name="username" v-model="username" value="" placeholder="帐号" maxlength="71" required="required" pattern="^\w{2,20}(@\w{2,50})?$" data-display="帐号" data-errormessage-pattern="格式：用户@组织" data-widget-cid="widget-6">
        <div class="ui-form-explain"></div></li>
        <li class="ui-form-item ui-form-icon-item required">
          <span class="ui-form-icon iconfont iconfont-lock-o"></span>
          <input class="ui-form-input" type="password" name="password" v-model="password" value="" placeholder="密码" maxlength="32" required="required" data-display="密码" data-widget-cid="widget-7">
        <div class="ui-form-explain"></div></li>
      </ul>
      <div class="ui-form-buttons">
        <button class="ui-form-button button-form-submit" type="submit">登录</button>
      </div>
    </form>
    <ul class="errors">
      <li v-show="!validation.username">Name cannot be empty.</li>
      <li v-show="!validation.password">Please provide a valid email address.</li>
    </ul>
  </div>
</template>

<script>
import { POST } from 'utils/ajax'
import { bearer } from 'vx/getters'
import { setBearer } from 'vx/actions'
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

  // created () {
  //   this.bearer && this.goProfile()
  // },

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
        this.goProfile()
      })
      .catch(err => {
        console.log(err)
      })
    },
    goProfile () {
      this.$route.router.go('/profile')
    }
  },

  route: {
    activate (transition) {
      transition.next()
      this.bearer && this.goProfile()
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
/*@import "../themes/default/components/form"*/
/*@import "../themes/default/app/login"*/
</style>
