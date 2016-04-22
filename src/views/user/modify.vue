<template>
  <div class="modify">
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
import { setProfile } from 'vx/actions'
export default {
  data () {
    return {
      pending: false,
      cls: 'ui-form-slim',
      submit: this.modify,
      fields: [{
        icon: 'user-o',
        name: 'username',
        type: 'text',
        value: '',
        placeholder: '账号（由小写英文字母组成）',
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
      }, {
        icon: 'lock-o',
        name: 'password',
        type: 'password',
        value: '',
        placeholder: '密码（由英文字母或下划线组成）',
        validate: {
          required: {
            rule: true,
            message: '请输入密码'
          },
          minlength: {
            rule: 4,
            message: '密码不能少于 4 个字符'
          },
          maxlength: {
            rule: 20,
            message: '密码不能多于 20 个字符'
          },
          pattern: {
            rule: '/^[0-9A-Za-z]{4,20}$/',
            message: '密码不符合规则'
          }
        }
      }],
      buttons: [{
        role: 'submit',
        type: 'submit',
        label: '提交修改',
        validFirst: true,
        pendingLabel: '提交修改...'
      }]
    }
  },

  // methods
  methods: {
    modify ($validation) {
      if (!$validation.valid) {
        return
      }
      this.pending = true
      POST('/apis/profile', {
        body: {
          username: this.fields[0].value,
          password: this.fields[1].value
        }
      })
      .then(json => {
        this.setProfile(json)
        this.goProfile()
      })
    },
    goProfile () {
      this.$route.router.go('/profile')
    }
  },

  // route: {
  //   activate (transition) {
  //     transition.next()
  //     this.bearer && this.goProfile()
  //   }
  // },

  vuex: {
    getters: {
      bearer
    },
    actions: {
      setProfile
    }
  },

  components: {
    CForm
  }
}
</script>
