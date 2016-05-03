import { RE_USERNAME, RE_PASSWORD } from 'utils/regex'

export default [{
  label: '账号',
  icon: 'user-o',
  name: 'username',
  type: 'text',
  value: '',
  attrs: {
    placeholder: RE_USERNAME[1]
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
  attrs: {
    placeholder: RE_PASSWORD[1]
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
      rule: `/${RE_PASSWORD[0].source}/`,
      message: '密码不符合规则'
    }
  }
}]
