<template>
  <form class="ui-form" v-on:submit.prevent="login" autocomplete="off" novalidate>
    <validator name="validation">
      <ul class="ui-form-errors" v-if="$validation.modified">
        <li class="ui-form-error" v-for="error in $validation.errors">
          {{error.message}}
        </li>
      </ul>
      <ul class="ui-form-items">
        <li class="ui-form-item ui-form-icon-item" v-for="field in fields">
          <span class="ui-form-icon iconfont iconfont-{{field.icon}}"></span>
          <input class="ui-form-input"
            :type="field.type"
            :field="field.name"
            :placeholder="field.placeholder"
            v-model="field.value"
            v-validate="field.validate">
        </li>
      </ul>
      <div class="ui-form-buttons">
        <button class="ui-form-button button-form-submit"
          type="submit" :disabled="!$validation.valid">登录</button>
      </div>
      <!-- <pre>{{ $validation | json }}</pre> -->
    </validator>
  </form>
</template>

<script>
import { POST } from 'utils/ajax'
import { bearer } from 'vx/getters'
import { setBearer } from 'vx/actions'
export default {
  data () {
    return {
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
      }]
    }
  },

  // methods
  methods: {
    login () {
      if (!this.$validation.valid) {
        return
      }
      POST('/apis/login', {
        body: {
          username: this.fields[0].value,
          password: this.fields[1].value
        }
      })
      .then(json => {
        this.setBearer(json)
        this.goProfile()
      })
    },
    goProfile () {
      this.$route.router.go('/profile')
    }
  },

  route: {
    activate (transition) {
      transition.next()
      this.bearer && this.goProfile()
    }
  },

  vuex: {
    getters: {
      bearer
    },
    actions: {
      setBearer
    }
  }
}
</script>

<style src="styles/utils/form"></style>

<style src="styles/views/login" scoped></style>
