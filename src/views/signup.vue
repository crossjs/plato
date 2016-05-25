<template>
  <div class="signup">
    <c-form
      :submit="signup"
      :columns="columns"
      :items="items"
      :actions="actions"></c-form>
  </div>
</template>

<script>
import CForm from 'duo/c-form'
import md5 from 'utils/md5'
import { createUser } from 'vx/actions'
import { username, password } from 'utils/userFields'
export default {
  data () {
    return {
      columns: {
        username,
        password
      },
      items: {
        username: '',
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
          label: this.progress ? '提交注册中...' : '提交注册',
          disabled: !!this.progress,
          mutation (ctx, modal) {
            modal.show = true
            modal.body = '确定注册？'
            // 阻止提交，以实现等待确认
            return false
          }
        }
      }]
    }
  },

  // methods
  methods: {
    signup ($payload) {
      // if (this.$validation.invalid) {
        // return
      // }
      $payload.password = md5($payload.password)
      this.createUser($payload)
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
      createUser
    }
  },

  watch: {
    auth (val) {
      this.$nextTick(() => {
        if (val) {
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
