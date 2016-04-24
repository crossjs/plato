<template>
  <div class="login">
    <c-form
      :submit="submit"
      :fields="fields"
      :buttons="buttons"></c-form>
  </div>
</template>

<script>
import form from 'mixins/form'
import { POST } from 'utils/ajax'
import md5 from 'utils/md5'
import { setBearer } from 'vx/actions'
import userFields from 'utils/userFields'
export default {
  mixins: [form],

  data () {
    userFields[0].value = this.$route.query.username || ''
    return {
      pending: false,
      submit: this.login,
      fields: userFields,
      buttons: [{
        role: 'submit',
        type: 'submit',
        // string or function
        label: $validation => {
          return this.progress ? '提交登录中...' : '提交登录'
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
    login ($validation) {
      if (!$validation.valid) {
        return
      }
      POST('/apis/login', {
        body: this.formdata(data => {
          data.password = md5(data.password)
          return data
        })
      })
      .then(json => {
        this.setBearer(json)
        this.goUserIndex()
      })
    },
    goUserIndex () {
      this.$route.router.go('/user')
    }
  },

  route: {
    activate (transition) {
      transition.next()
      this.bearer && this.goUserIndex()
    }
  },

  vuex: {
    actions: {
      setBearer
    }
  }
}
</script>
