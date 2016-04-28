<template>
  <div class="login">
    <c-form
      :submit="submit"
      :fields="fields"
      :buttons="buttons"></c-form>
  </div>
</template>

<script>
import mForm from 'mixins/m-form'
import md5 from 'utils/md5'
import { getBearer } from 'vx/actions'
import userFields from 'utils/userFields'
export default {
  mixins: [mForm],

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
      this.getBearer(this.formdata(data => {
        data.password = md5(data.password)
        return data
      }))
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
      getBearer
    }
  },

  watch: {
    bearer (value) {
      this.$nextTick(() => {
        if (value) {
          this.$route.router.go('/user')
        }
      })
    }
  }
}
</script>
