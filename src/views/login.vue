<template>
  <div class="v-login">
    <c-pane>
      <c-validation
        :validation="$validation"
        ></c-validation>
      <c-form
        :submit="login"
        :cells="cells"
        :items="items"
        @mutate="mutate">
        <c-pane dir="vertical" slot="footer">
          <c-button :class="action.class"
            :type="action.type"
            :disabled="action.disabled">{{action.label}}</c-button>
        </c-pane>
      </c-form>
    </c-pane>
  </div>
</template>

<script>
import CValidation from 'components/c-validation'
import CPane from 'components/c-pane'
import CForm from 'components/c-form'
import CButton from 'components/c-button'
import md5 from 'utils/md5'
import { getAuth } from 'vx/actions'
import { username, password } from 'utils/userFields'
export default {
  data () {
    return {
      cells: {
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
    action () {
      return {
        type: 'submit',
        class: 'primary',
        label: this.progress ? '提交登录中...' : '提交登录',
        disabled: !!this.progress || (this.$validation && this.$validation.invalid)
      }
    }
  },

  // methods
  methods: {
    mutate ($payload) {
      this.payload = $payload
    },
    login () {
      if (!this.payload) {
        return
      }
      // validate then submit
      this.$validate().then(() => {
        const $payload = { ...this.payload }
        $payload.password = md5($payload.password)
        this.getAuth($payload)
      }).catch($validation => {
        // this.$emit('error', $validation)
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
      getAuth
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
    CValidation,
    CPane,
    CForm,
    CButton
  }
}
</script>

<style src="styles/views/login"></style>
