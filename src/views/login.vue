<template>
  <div class="login">
    <c-form
      :submit="login"
      :columns="columns"
      :items="items"
      :actions="actions"></c-form>
  </div>
</template>

<script>
import Vue from 'vue'
import Validator from 'plugins/validator'
import CForm from 'duo/c-form'
import md5 from 'utils/md5'
import { getBearer } from 'vx/actions'
import { username, password } from 'utils/userFields'
Vue.use(Validator)
export default {
  data () {
    return {
      columns: {
        username,
        password
      },
      items: {
        username: this.$route.query.username,
        password: ''
      }
    }
  },

  computed: {
    actions () {
      return [null, {
        submit: {
          type: 'submit',
          class: 'primary',
          // string or function
          label: this.progress ? '提交登录中...' : '提交登录',
          disabled: !!this.progress
        }
      }]
    }
  },

  // methods
  methods: {
    login ($payload) {
      this.$validate().then(() => {
        $payload.password = md5($payload.password)
        this.getBearer($payload)
      }).catch($validation => {
        this.$emit('error', $validation)
      })
    }
  },

  validator: {
    auto: true
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
  },

  components: {
    CForm
  }
}
</script>
