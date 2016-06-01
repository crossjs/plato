<template>
  <div class="role-create">
    <c-form
      :submit="create"
      :columns="columns"
      :items="items"
      :actions="actions">
    </c-form>
  </div>
</template>

<script>
import CForm from 'components/c-form'
import { roles } from 'vx/getters'
import { createRole } from 'vx/actions'
import { ROLE_LEVEL_OPTIONS } from 'vx/constants'
export default {
  data () {
    return {
      columns: {
        name: {
          label: '角色名称',
          type: 'text',
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
          type: 'text',
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
      items: {
        name: '',
        desc: '',
        level: 0
      },
      actions: [null, {
        submit: {
          type: 'submit',
          class: 'primary',
          // string or function
          label: this.progress ? '提交创建中...' : '提交创建',
          disabled: !!this.progress
        }
      }]
    }
  },

  watch: {
    roles: {
      handler (val) {
        this.$nextTick(() => {
          if (val.items.length) {
            this.$route.router.go('/roles')
          }
        })
      },
      deep: true
    }
  },

  methods: {
    create ($validation, $payload) {
      if (!$validation.valid) {
        return
      }
      this.createRole($payload)
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
    CForm
  }
}
</script>
