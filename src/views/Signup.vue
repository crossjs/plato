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
          return this.pending ? '提交注册中...' : '提交注册'
        },
        // boolean or function
        disabled: $validation => {
          return !$validation.valid || this.pending
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
      this.pending = true
      POST('/apis/signup', {
        body: {
          username: this.fields[0].value,
          password: this.fields[1].value
        }
      })
      .then(json => {
        this.goLogin(json)
        this.pending = false
      })
      .catch(() => {
        this.pending = false
      })
    },
    goLogin ({ username }) {
      this.$route.router.go('login', { username })
    }
  },

  components: {
    CForm
  }
}
</script>
