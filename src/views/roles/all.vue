<template>
  <div class="roles">
    <c-grid
      :columns="columns"
      :actions="actions"
      :data="roles"
      @action="_action"></c-grid>
  </div>
</template>

<script>
import mGrid from 'mixins/m-grid'
import { roles } from 'vx/getters'
import { getRoles, deleteRole, updateRole } from 'vx/actions'
import { ROLE_LEVEL_OPTIONS } from 'vx/constants'
export default {
  mixins: [mGrid],

  data () {
    // let target
    return {
      columns: {
        name: {
          label: '名称',
          type: 'text'
        },
        desc: {
          label: '描述',
          type: 'text',
          editable: true
        },
        created: {
          label: '创建时间',
          type: 'datetime'
        },
        updated: {
          label: '更新时间',
          type: 'datetime'
        },
        level: {
          label: '等级',
          type: 'dropdown',
          attrs: {
            options: ROLE_LEVEL_OPTIONS
          },
          editable: true
        }
      },
      actions: [
        {
          modify: {
            label: '编辑',
            state: 1
          },
          remove: {
            label: '删除',
            confirm: true
          }
        },
        {
          submit: {
            label: '确定'
          },
          cancel: {
            label: '取消',
            state: 0
          }
        }
      ]
    }
  },

  methods: {
    _action (key, role, payload) {
      // console.log(key, role, payload)
      // `this` is c-row
      // const vm = this.$parent.$parent
      // row -> grid -> vm
      switch (key) {
        case 'remove':
          this.deleteRole(role)
          break
        // case 'modify':
        //   this.state = 1
        //   break
        case 'submit':
          if (payload) {
            this.updateRole(payload)
          }
          break
        // case 'cancel':
        //   this.state = 0
        //   break
      }
    }
  },

  route: {
    activate (transition) {
      transition.next()
      this.getRoles()
    }
  },

  vuex: {
    getters: {
      roles
    },
    actions: {
      getRoles,
      deleteRole,
      updateRole
    }
  }
}
</script>
