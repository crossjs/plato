<template>
  <div class="login">
    <c-form
      :pending="pending"
      :cls="cls"
      :submit="submit"
      :fields="fields"
      :buttons="buttons"></c-form>
  </div>
</template>

<script>
import CForm from 'components/c-form'
import { POST } from 'utils/ajax'
import { bearer } from 'vx/getters'
import { setBearer } from 'vx/actions'
import { RE_USERNAME, RE_PASSWORD } from 'utils/regex'
export default {
  data () {
    return {
      pending: false,
      submit: this.login,
      fields: [{
        label: '账号',
        icon: 'user-o',
        name: 'username',
        type: 'text',
        value: '',
        placeholder: RE_USERNAME[1],
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
            rule: `/${RE_USERNAME[0].source}/`,
            message: '账号不符合规则'
          }
        }
      }, {
        label: '密码',
        icon: 'lock-o',
        name: 'password',
        type: 'password',
        value: '',
        placeholder: RE_PASSWORD[1],
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
            rule: `/${RE_PASSWORD[0].source}/`,
            message: '密码不符合规则'
          }
        }
      }],
      buttons: [{
        role: 'submit',
        type: 'submit',
        label: '登录',
        validFirst: true,
        pendingLabel: '登录...'
      }]
    }
  },

  // methods
  methods: {
    login ($validation) {
      if (!$validation.valid) {
        return
      }
      this.pending = true
      POST('/apis/login', {
        body: {
          username: this.fields[0].value,
          password: this.fields[1].value
        }
      })
      .then(json => {
        this.setBearer(json)
        this.goUserIndex()
      })
      .catch(() => {
        this.pending = false
      })
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
    getters: {
      bearer
    },
    actions: {
      setBearer
    }
  },

  components: {
    CForm
  }
}
</script>
