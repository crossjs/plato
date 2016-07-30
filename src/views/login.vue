<template>
  <div class="v-login">
    <c-pane>
      <c-validation
        :validation="$validation"></c-validation>
      <c-form
        :submit="login"
        :cells="cells"
        :items="items"
        @mutate="mutate">
        <c-pane dir="vertical" slot="footer">
          <c-button :className="action.className"
            :type="action.type"
            :disabled="action.disabled">{{action.label}}</c-button>
        </c-pane>
      </c-form>
    </c-pane>
  </div>
</template>

<script>
import CValidation from 'plato-components/c-validation'
import CPane from 'plato-components/c-pane'
import CForm from 'plato-components/c-form'
import CButton from 'plato-components/c-button'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      items: {
        username: this.$route.query.username || '',
        password: ''
      }
    }
  },

  computed: {
    ...mapGetters(['authorized']),
    cells () {
      return {
        username: {
          label: '账号',
          icon: 'user',
          type: 'textfield',
          attrs: {
            placeholder: '只能包含小写英文字母'
          },
          validate: {
            required: {
              rule: true,
              message: '请输入账号'
            },
            minlength: {
              rule: 4,
              message: '账号不能少于 4 个字符'
            },
            maxlength: {
              rule: 20,
              message: '账号不能多于 20 个字符'
            },
            pattern: {
              rule: '/^[a-z]{4,20}$/',
              message: '账号不符合规则'
            }
          }
        },
        password: {
          label: '密码',
          icon: 'lock',
          type: 'password',
          attrs: {
            placeholder: '字母、数字或标点符号'
          },
          validate: {
            required: {
              rule: true,
              message: '请输入密码'
            },
            minlength: {
              rule: 8,
              message: '密码不能少于 8 个字符'
            },
            maxlength: {
              rule: 20,
              message: '密码不能多于 20 个字符'
            },
            pattern: {
              rule: '/^[`~!@#$%^&*_+=,.;\'?:"()<>{}\\-\\/\\[\\]\\\\ 0-9a-zA-Z]{8,20}$/',
              message: '密码不符合规则'
            }
          }
        }
      }
    },
    action () {
      return {
        type: 'submit',
        className: 'primary',
        label: this.progress ? '提交登录中...' : '提交登录',
        disabled: !!this.progress || (this.$validation && this.$validation.invalid)
      }
    }
  },

  // methods
  methods: {
    ...mapActions(['setEnv']),
    mutate ($payload) {
      this.items = $payload
    },
    login () {
      if (!this.items) {
        return
      }
      // validate then submit
      this.$validate().then(() => {
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
    CPane,
    CForm,
    CButton
  }
}
</script>

<style src="styles/views/login"></style>
