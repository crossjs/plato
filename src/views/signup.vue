<template>
  <div class="v-signup">
    <c-modal
      :show.sync="modal.show"
      :callback="modal.callback">{{modal.body}}</c-modal>
    <c-pane>
      <c-validation
        :validation="$validation"
        ></c-validation>
      <c-form class="c-form-expand"
        :submit="signup"
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
import CModal from 'components/c-modal'
import CValidation from 'components/c-validation'
import CPane from 'components/c-pane'
import CForm from 'components/c-form'
import CButton from 'components/c-button'
import md5 from 'utils/md5'
import { createUser } from 'vx/actions'
import { username, password } from 'utils/userFields'
export default {
  data () {
    const vm = this
    return {
      modal: {
        show: false,
        body: '请确认',
        callback (key) {
          vm.confirmed = key === 'submit'
          vm.confirmed && vm.signup()
          // return `false` to prevent hidding modal
        }
      },
      cells: {
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
    action () {
      return {
        type: 'submit',
        class: 'primary',
        label: this.progress ? '提交注册中...' : '提交注册',
        disabled: !!this.progress || !this.payload || (this.$validation && this.$validation.invalid)
      }
    }
  },

  // methods
  methods: {
    mutate ($payload) {
      this.payload = $payload
    },
    signup () {
      if (!this.payload) {
        return
      }
      if (!this.confirmed) {
        this.modal.show = true
        this.modal.body = '确定注册？'
        return
      }
      // reset confirmed
      this.confirmed = false
      // validate then submit
      this.$validate().then(() => {
        const $payload = { ...this.payload }
        $payload.password = md5($payload.password)
        this.createUser($payload)
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
    CModal,
    CValidation,
    CPane,
    CForm,
    CButton
  }
}
</script>

<style src="styles/views/signup"></style>
