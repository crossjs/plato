<template>
  <div class="signup">
    <c-form
      :submit="submit"
      :fields="fields"
      :buttons="buttons"></c-form>
  </div>
</template>

<script>
import mForm from 'mixins/m-form'
import { POST } from 'utils/ajax'
import md5 from 'utils/md5'
import userFields from 'utils/userFields'
export default {
  mixins: [mForm],

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
        body: this.formdata(data => {
          data.password = md5(data.password)
          return data
        })
      })
      .then(json => {
        this.goLogin(json)
      })
    },
    goLogin ({ username }) {
      this.$route.router.go({
        name: 'login',
        query: { username }
      })
    }
  }
}
</script>
