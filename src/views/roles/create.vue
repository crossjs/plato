<template>
  <div class="role-create">
    <c-validation :validation="$validation"></c-validation>
    <c-form :submit="create" :title="title" :cells="columns" :items="items" @mutate="mutate">
      <c-pane dir="vertical" slot="footer">
        <c-button :class="action.class" :type="action.type" :disabled="action.disabled">{{action.label}}</c-button>
      </c-pane>
    </c-form>
  </div>
</template>

<script>
import CForm from 'components/c-form'
import CPane from 'components/c-pane'
import CButton from 'components/c-button'
import CValidation from 'components/c-validation'
import { roles } from 'vx/getters'
import { createRole } from 'vx/actions'
import { ROLE_LEVEL_OPTIONS } from 'vx/constants'
export default {
  data() {
      
    return {
      payload: null,
      title: '添加角色',
      columns: {
        name: {
          label: '角色名称',
          type: 'Textfield',
          validate: {
            required: {
              rule: true,
              message: '请输入角色名称'
            },
            maxlength: {
              rule: 20,
              message: '角色名称不能多于 20 个字符'
            }
          }
        },
        desc: {
          label: '角色描述',
          type: 'Textfield',
          validate: {
            required: {
              rule: true,
              message: '请输入角色描述'
            },
            maxlength: {
              rule: 100,
              message: '角色描述不能多于 100 个字符'
            }
          }
        },
        level: {
          label: '角色等级',
          type: 'dropdown',
          extra: {
            options: ROLE_LEVEL_OPTIONS

          },
          validate: {
            required: {
              rule: true,
              message: '请输入角色等级'
            }
          }
        }
      }
    }
  },

  computed: {
    items () {
      const {
        name, desc,
        level = 0
      } = this.roles
      return {
        name,
        desc,
        level
      }
    },
    action () {
      return {
        type: 'submit',
        class: 'primary',
        label: this.progress ? '提交创建中...' : '提交创建',
        disabled: !!this.progress || !this.payload || (this.$validation && this.$validation.invalid)
      }
    }
  },
  validator: {
    auto: true
  },
  methods: {
    mutate ($payload) {
      this.payload = $payload
    },
    create () {
      
      if (!this.payload) {
        return
      }
      // validate then submit
      this.$validate().then(() => {
        const $payload = { ...this.payload }
        this.createRole($payload)
      }).catch($validation => {
        // this.$emit('error', $validation)
      })
    }
  },

  vuex: {
    getters: {
      roles
    },
    actions: {
      createRole
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