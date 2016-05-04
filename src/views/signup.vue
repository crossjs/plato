<template>
  <div class="signup">
    <c-form
      :submit="signup"
      :fields="fields"
      :buttons="buttons"></c-form>
  </div>
</template>

<script>
import mForm from 'mixins/m-form'
import md5 from 'utils/md5'
import { username } from 'vx/getters'
import { createUser } from 'vx/actions'
import userFields from 'utils/userFields'
export default {
  mixins: [mForm],

  data () {
    return {
      fields: userFields,
      buttons: {
        submit: {
          type: 'submit',
          // string or function
          label: $validation => {
            return this.progress ? '提交注册中...' : '提交注册'
          },
          // boolean or function
          disabled: $validation => {
            return !$validation.valid || !!this.progress
          }
        }
      }
    }
  },

  // methods
  methods: {
    signup ($validation) {
      if (!$validation.valid) {
        return
      }
      this.createUser(this.formdata(data => {
        data.password = md5(data.password)
        return data
      }))
    }
  },

  vuex: {
    getters: {
      username
    },
    actions: {
      createUser
    }
  },

  watch: {
    username (username) {
      this.$nextTick(() => {
        if (username) {
          this.$route.router.go({
            name: 'login',
            query: { username }
          })
        }
      })
    }
  }
}
</script>
