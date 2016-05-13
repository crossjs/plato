<template>
  <div class="login">
    <c-form
      :submit="login"
      :fields.sync="fields"
      :buttons="buttons"></c-form>
  </div>
</template>

<script>
import mForm from 'mixins/m-form'
import md5 from 'utils/md5'
import { getBearer } from 'vx/actions'
import { username, password } from 'utils/userFields'
export default {
  mixins: [mForm],

  data () {
    return {
      fields: {
        // copy
        username: Object.assign({}, username, {
          value: this.$route.query.username
        }),
        password
      }
    }
  },

  computed: {
    buttons () {
      return {
        submit: {
          type: 'submit',
          // string or function
          label: this.progress ? '提交登录中...' : '提交登录',
          disabled: !!this.progress
        }
      }
    }
  },

  // methods
  methods: {
    login ($validation, $data) {
      if (!$validation.valid) {
        return
      }
      $data.password = md5($data.password)
      this.getBearer($data)
    }
  },

  route: {
    activate (transition) {
      transition.next()
      this.auth && this.$route.router.go('/user')
    }
  },

  vuex: {
    actions: {
      getBearer
    }
  },

  watch: {
    auth (value) {
      this.$nextTick(() => {
        if (value) {
          this.$route.router.go('/user')
        }
      })
    }
  }
}
</script>
