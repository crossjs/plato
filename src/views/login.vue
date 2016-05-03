<template>
  <div class="login">
    <c-form
      :submit="login"
      :fields="fields"
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
      },
      buttons: {
        submit: {
          type: 'submit',
          // string or function
          label: $validation => {
            return this.progress ? '提交登录中...' : '提交登录'
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
