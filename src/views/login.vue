<template>
  <div class="v-login">
    <c-form @submit.native.prevent="login">
      <c-row>
        <c-label cls="col c-row-label">{{__(username.label)}}</c-label>
        <c-textfield cls="c-row-value"
          :field="username.field"
          :validate="username.validate"
          :value="username.value"
          @mutate="username.value = arguments[0]"
          ></c-textfield>
      </c-row>
      <c-validation :validation="$validation" field="username"></c-validation>
      <c-row>
        <c-label cls="col c-row-label">{{__(password.label)}}</c-label>
        <c-password cls="c-row-value"
          :field="password.field"
          :validate="password.validate"
          :value="password.value"
          @mutate="password.value = arguments[0]"
          ></c-password>
      </c-row>
      <c-validation :validation="$validation" field="password"></c-validation>
      <c-pane>
        <c-button cls="primary" type="submit"
          :disabled="$validation.errors.length > 0">{{ __('views.login.submit') }}</c-button>
      </c-pane>
    </c-form>
  </div>
</template>

<script>
import CValidation from 'components/c-validation'
import CPane from 'components/c-pane'
import CForm from 'components/c-form'
import CRow from 'components/c-row'
// import CIcon from 'components/c-icon'
import CLabel from 'components/c-label'
import CTextfield from 'components/c-textfield'
import CPassword from 'components/c-password'
import CButton from 'components/c-button'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      username: {
        field: 'username',
        label: 'views.login.username',
        value: '',
        validate: {
          required: {
            rule: true,
            message: this.__('message.required', this.__('views.login.username'))
          },
          minlength: {
            rule: 4,
            message: this.__('message.minlength', this.__('views.login.username'), 4)
          },
          maxlength: {
            rule: 20,
            message: this.__('message.maxlength', this.__('views.login.username'), 20)
          },
          pattern: {
            rule: '/^[a-z]{4,20}$/',
            message: this.__('message.pattern', this.__('views.login.username'))
          }
        }
      },
      password: {
        field: 'password',
        label: 'views.login.password',
        value: '',
        validate: {
          required: {
            message: this.__('message.required', this.__('views.login.password'))
          },
          minlength: {
            rule: 8,
            message: this.__('message.minlength', this.__('views.login.password'), 8)
          },
          maxlength: {
            rule: 20,
            message: this.__('message.maxlength', this.__('views.login.password'), 20)
          },
          pattern: {
            rule: '/^[`~!@#$%^&*_+=,.;\'?:"()<>{}\\-\\/\\[\\]\\\\ 0-9a-zA-Z]{8,20}$/',
            message: this.__('message.pattern', this.__('views.login.password'))
          }
        }
      }
    }
  },

  computed: mapGetters(['authorized']),

  // methods
  methods: {
    ...mapActions(['setEnv']),
    login () {
      if (!this.username.value || !this.password.value) {
        return
      }
      // validate then submit
      this.$validate().then(() => {
        // mocking login
        this.setEnv({
          authorized: true
        })
      }).catch($validation => {
        // this.$emit('error', $validation)
      })
    }
  },

  validator: {
    auto: true
  },

  created () {
    this.authorized && this.$router.replace('/')
  },

  watch: {
    authorized (val) {
      if (val) {
        this.$nextTick(() => {
          this.$router.replace('/logout')
        })
      }
    }
  },

  components: {
    CValidation,
    CForm,
    CRow,
    // CIcon,
    CLabel,
    CTextfield,
    CPassword,
    CPane,
    CButton
  }
}
</script>

<style src="styles/views/login"></style>
