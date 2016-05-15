<template>
  <div class="login">
    <c-form
      :submit="login"
      :columns="columns"
      :items="items"
      :actions="actions"
      @mutate="_mutate"></c-form>
  </div>
</template>

<script>
import CForm from 'components/c-form'
import md5 from 'utils/md5'
import { getBearer } from 'vx/actions'
import { username, password } from 'utils/userFields'
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
          cls: 'primary',
          // string or function
          label: this.progress ? '提交登录中...' : '提交登录',
          disabled: !!this.progress
        }
      }]
    }
  },

  // methods
  methods: {
    login ($validation, $payload) {
      if (!$validation.valid) {
        return
      }
      $payload.password = md5($payload.password)
      this.getBearer($payload)
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
  },

  components: {
    CForm
  }
}
</script>
