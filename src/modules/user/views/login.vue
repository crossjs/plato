<template>
  <div class="main">
    <c-form @submit.native.prevent="login">
      <div>
        <c-row>
          <c-col class="padding" :size="1">
            <c-label for="username">{{__(username.label)}}</c-label>
          </c-col>
          <c-col class="padding" :size="3">
            <c-textfield
              id="username"
              :field="username.field"
              :validate="username.validate"
              :value="username.value"
              @change="username.value = $event"></c-textfield>
          </c-col>
        </c-row>
        <c-row>
          <c-col class="padding" :size="1">
            <c-label for="password">{{__(password.label)}}</c-label>
          </c-col>
          <c-col class="padding" :size="3">
            <c-password
              :attrs="{id: 'password'}"
              :field="password.field"
              :validate="password.validate"
              :value="password.value"
              @change="password.value = $event"></c-password>
          </c-col>
        </c-row>
      </div>
      <c-pane class="center" v-if="$validation.errors.length">
        <c-badge class="warning" size="small">
          {{$validation.errors.filter(function (error) { return error.field === 'username' }).map(function (error) { return error.message }).join(' ')}}
        </c-badge>
        <c-badge class="warning" size="small">
          {{$validation.errors.filter(function (error) { return error.field === 'password' }).map(function (error) { return error.message }).join(' ')}}
        </c-badge>
      </c-pane>
      <c-pane>
        <c-button class="primary" type="submit"
          :disabled="$validation.errors.length > 0">{{ __('login.submit') }}</c-button>
      </c-pane>
    </c-form>
  </div>
</template>

<script>
import CBadge from 'components/core/badge'
import CPane from 'components/core/pane'
import CForm from 'components/core/form'
import CRow from 'components/core/row'
import CCol from 'components/core/col'
import CLabel from 'components/core/label'
import CTextfield from 'components/core/textfield'
import CPassword from 'components/core/password'
import CButton from 'components/core/button'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      username: {
        field: 'username',
        label: 'login.username',
        value: 'username',
        validate: {
          required: {
            rule: true,
            message: this.__('/validator.required', this.__('login.username'))
          },
          minlength: {
            rule: 4,
            message: this.__('/validator.minlength', this.__('login.username'), 4)
          },
          maxlength: {
            rule: 20,
            message: this.__('/validator.maxlength', this.__('login.username'), 20)
          },
          pattern: {
            rule: '/^[a-z]{4,20}$/',
            message: this.__('/validator.pattern', this.__('login.username'))
          }
        }
      },
      password: {
        field: 'password',
        label: 'login.password',
        value: 'password',
        validate: {
          required: {
            message: this.__('/validator.required', this.__('login.password'))
          },
          minlength: {
            rule: 8,
            message: this.__('/validator.minlength', this.__('login.password'), 8)
          },
          maxlength: {
            rule: 20,
            message: this.__('/validator.maxlength', this.__('login.password'), 20)
          },
          pattern: {
            rule: '/^[`~!@#$%^&*_+=,.;\'?:"()<>{}\\-\\/\\[\\]\\\\ 0-9a-zA-Z]{8,20}$/',
            message: this.__('/validator.pattern', this.__('login.password'))
          }
        }
      }
    }
  },

  computed: mapGetters(['authorized']),

  // methods
  methods: {
    ...mapActions(['setCoreState']),
    login () {
      if (!this.username.value || !this.password.value) {
        return
      }
      // validate then submit
      this.$validate().then(() => {
        // mocking login
        this.setCoreState({
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
          this.$redirect('/logout', true)
        })
      }
    }
  },

  components: {
    CBadge,
    CForm,
    CRow,
    CCol,
    CLabel,
    CTextfield,
    CPassword,
    CPane,
    CButton
  }
}
</script>
