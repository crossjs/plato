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
import { PATCH } from 'utils/ajax'
import { bearer } from 'vx/getters'
import { setProfile } from 'vx/actions'
export default {
  data () {
    return {
      pending: false,
      submit: this.modify,
      fields: [{
        label: '旧密码',
        icon: 'lock-o',
        name: 'password0',
        type: 'password',
        value: '',
        validate: {
          required: {
            rule: true,
            message: '请输入旧密码'
          },
          minlength: {
            rule: 4,
            message: '旧密码不能少于 4 个字符'
          },
          maxlength: {
            rule: 20,
            message: '旧密码不能多于 20 个字符'
          },
          pattern: {
            rule: '/^[0-9A-Za-z]{4,20}$/',
            message: '旧密码不符合规则'
          }
        }
      }, {
        label: '新密码',
        icon: 'lock-o',
        name: 'password',
        type: 'password',
        value: '',
        placeholder: '新密码（由英文字母或下划线组成）',
        validate: {
          required: {
            rule: true,
            message: '请输入新密码'
          },
          minlength: {
            rule: 4,
            message: '新密码不能少于 4 个字符'
          },
          maxlength: {
            rule: 20,
            message: '新密码不能多于 20 个字符'
          },
          pattern: {
            rule: '/^[0-9A-Za-z]{4,20}$/',
            message: '新密码不符合规则'
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
      PATCH('/apis/profile', {
        body: {
          password: this.fields[1].value
        }
      })
      .then(json => {
        this.setProfile(json)
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

  // route: {
  //   activate (transition) {
  //     transition.next()
  //     this.bearer && this.goUserIndex()
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
