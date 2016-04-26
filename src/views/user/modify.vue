<template>
  <div class="modify">
    <c-form
      :submit="submit"
      :fields="fields"
      :buttons="buttons"></c-form>
  </div>
</template>

<script>
import mForm from 'mixins/m-form'
import md5 from 'utils/md5'
import { RE_PASSWORD } from 'utils/regex'
import { updateProfile } from 'vx/actions'
export default {
  mixins: [mForm],

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
            rule: 8,
            message: '旧密码不能少于 8 个字符'
          },
          maxlength: {
            rule: 20,
            message: '旧密码不能多于 20 个字符'
          },
          pattern: {
            rule: `/${RE_PASSWORD[0].source}/`,
            message: '旧密码不符合规则'
          }
        }
      }, {
        label: '新密码',
        icon: 'lock-o',
        name: 'password',
        type: 'password',
        value: '',
        placeholder: RE_PASSWORD[1],
        validate: {
          required: {
            rule: true,
            message: '请输入新密码'
          },
          minlength: {
            rule: 8,
            message: '新密码不能少于 8 个字符'
          },
          maxlength: {
            rule: 20,
            message: '新密码不能多于 20 个字符'
          },
          pattern: {
            rule: `/${RE_PASSWORD[0].source}/`,
            message: '新密码不符合规则'
          }
        }
      }],
      buttons: [{
        role: 'submit',
        type: 'submit',
        // string or function
        label: $validation => {
          return this.progress ? '提交修改中...' : '提交修改'
        },
        // boolean or function
        disabled: $validation => {
          return !$validation.valid || !!this.progress
        }
      }]
    }
  },

  // methods
  methods: {
    modify ($validation) {
      if (!$validation.valid) {
        return
      }
      this.updateProfile(this.formdata(data => {
        data.password0 = md5(data.password0)
        data.password = md5(data.password)
        return data
      }))
      // this.$route.router.go('/user')
    }
  },

  vuex: {
    actions: {
      updateProfile
    }
  }
}
</script>
