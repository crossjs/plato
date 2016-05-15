<template>
  <div class="role-create">
    <c-form
      :submit="create"
      :fields="fields"
      :buttons="buttons">
    </c-form>
  </div>
</template>

<script>
import CForm from 'components/c-form'
import { createRole } from 'vx/actions'
import { ROLE_LEVEL_OPTIONS } from 'vx/constants'
export default {
  data () {
    return {
      fields: {
        name: {
          label: '角色名称',
          type: 'text',
          value: '',
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
          type: 'multiline',
          value: '',
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
          value: 0,
          attrs: {
            options: ROLE_LEVEL_OPTIONS
          },
          validate: {
            required: {
              rule: true,
              message: '请输入角色等级'
            }
          }
        }
      },
      buttons: {
        submit: {
          type: 'submit',
          // string or function
          label: $validation => {
            return this.progress ? '提交创建中...' : '提交创建'
          },
          // boolean or function
          disabled: $validation => {
            return !$validation.valid || !!this.progress
          }
        }
      }
    }
  },

  methods: {
    create ($validation, $data) {
      if (!$validation.valid) {
        return
      }
      this.createRole($data)
    }
  },

  vuex: {
    actions: {
      createRole
    }
  },

  components: {
    CForm
  }
}
</script>
