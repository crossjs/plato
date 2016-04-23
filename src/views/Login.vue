<template>
  <div class="login">
    <c-form
      :submit="submit"
      :fields="fields"
      :buttons="buttons"></c-form>
  </div>
</template>

<script>
import CForm from 'components/c-form'
import { POST } from 'utils/ajax'
import { bearer } from 'vx/getters'
import { setBearer } from 'vx/actions'
import userFields from 'utils/userFields'
export default {
  data () {
    return {
      pending: false,
      submit: this.login,
      fields: userFields,
      buttons: [{
        role: 'submit',
        type: 'submit',
        // string or function
        label: $validation => {
          return this.pending ? '提交登录中...' : '提交登录'
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
    login ($validation) {
      if (!$validation.valid) {
        return
      }
      this.pending = true
      POST('/apis/login', {
        body: {
          username: this.fields[0].value,
          password: this.fields[1].value
        }
      })
      .then(json => {
        this.setBearer(json)
        this.goUserIndex()
        this.reset()
      })
      .catch(() => this.reset)
    },
    goUserIndex () {
      this.$route.router.go('/user')
    },
    reset () {
      this.pending = false
    }
  },

  route: {
    activate (transition) {
      transition.next()
      this.bearer && this.goUserIndex()
    }
  },

  vuex: {
    getters: {
      bearer
    },
    actions: {
      setBearer
    }
  },

  components: {
    CForm
  }
}
</script>
