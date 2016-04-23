<template>
  <div class="signup">
    <c-form
      :submit="submit"
      :fields="fields"
      :buttons="buttons"></c-form>
  </div>
</template>

<script>
import CForm from 'components/c-form'
import { POST } from 'utils/ajax'
import { progress } from 'vx/getters'
import userFields from 'utils/userFields'
export default {
  data () {
    return {
      pending: false,
      submit: this.signup,
      fields: userFields,
      buttons: [{
        role: 'submit',
        type: 'submit',
        // string or function
        label: $validation => {
          return this.progress ? '提交注册中...' : '提交注册'
        },
        // boolean or function
        disabled: $validation => {
          return !$validation.valid || !!this.progress
        }
      }]
    }
  },

  // methods
  methods: {
    signup ($validation) {
      if (!$validation.valid) {
        return
      }
      POST('/apis/signup', {
        body: {
          username: this.fields[0].value,
          password: this.fields[1].value
        }
      })
      .then(json => {
        this.goLogin(json)
      })
    },
    goLogin ({ username }) {
      this.$route.router.go('login', { username })
    }
  },

  vuex: {
    getters: {
      progress
    }
  },

  components: {
    CForm
  }
}
</script>
