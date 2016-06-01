<template>
  <div class="v-user-modify">
    <c-pane>
      <c-validation
        :validation="$validation"
        ></c-validation>
      <c-form
        :submit="modify"
        :title="title"
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
import CValidation from 'components/c-validation'
import CPane from 'components/c-pane'
import CForm from 'components/c-form'
import CButton from 'components/c-button'
import { profile } from 'vx/getters'
import { getProfile, updateProfile } from 'vx/actions'
export default {
  data () {
    return {
      payload: null,
      title: '修改资料',
      cells: {
        username: {
          label: '账号',
          type: 'textfield',
          attrs: {
            readonly: true
          }
        },
        signature: {
          label: '签名',
          type: 'textfield',
          validate: {
            maxlength: {
              rule: 50,
              message: '签名不能多于 50 个字符'
            }
          }
        },
        gender: {
          label: '性别',
          type: 'dropdown',
          extra: {
            options: [{
              label: '-',
              value: -1
            }, {
              label: '男',
              value: 0
            }, {
              label: '女',
              value: 1
            }, {
              label: '其它',
              value: 2
            }]
          }
        },
        birthday: {
          label: '出生年月',
          type: 'picker',
          extra: {
            data: [
              makeYearRange(),
              makeMonths()
            ],
            sep: '-'
          }
        },
        address: {
          label: '联系地址',
          type: 'textfield'
        }
      }
    }
  },

  computed: {
    items () {
      const {
        username, signature = '',
        gender, birthday = '', address
      } = this.profile
      return {
        username,
        signature,
        gender,
        birthday: birthday.split('-'),
        address
      }
    },
    action () {
      return {
        type: 'submit',
        class: 'warning',
        label: this.progress ? '提交修改中...' : '提交修改',
        disabled: !!this.progress || !this.payload || (this.$validation && this.$validation.invalid)
      }
    }
  },

  methods: {
    mutate ($payload) {
      this.payload = $payload
    },
    modify () {
      if (!this.payload) {
        return
      }
      // validate then submit
      this.$validate().then(() => {
        const $payload = { ...this.payload }
        $payload.birthday = $payload.birthday.join('-')
        this.updateProfile($payload)
      }).catch($validation => {
        // this.$emit('error', $validation)
      })
    }
  },

  // watch: {
  //   profile (val, old) {
  //     console.log(old === val)
  //   }
  // },

  validator: {
    auto: true
  },

  route: {
    activate () {
      if (!this.profile.username) {
        this.getProfile()
      }
    }
  },

  vuex: {
    getters: {
      profile
    },
    actions: {
      getProfile,
      updateProfile
    }
  },

  components: {
    CValidation,
    CPane,
    CForm,
    CButton
  }
}

function makeMonths (data) {
  return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(value => {
    return {
      label: value,
      value
    }
  })
}

function makeYearRange () {
  const max = new Date().getFullYear()
  const min = max - 99
  const arr = []
  for (let i = min; i <= max; i++) {
    arr.push({
      label: '' + i,
      value: '' + i
    })
  }
  return arr
}
</script>
