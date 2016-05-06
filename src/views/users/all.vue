<template>
  <div class="users">
    <c-grid
      :columns="columns"
      :actions="actions"
      :data="users"
      @action="_action"></c-grid>
  </div>
</template>

<script>
import mGrid from 'mixins/m-grid'
import { users } from 'vx/getters'
import { getUsers, deleteUser, updateUser } from 'vx/actions'
export default {
  mixins: [mGrid],

  data () {
    // let target
    return {
      columns: {
        username: {
          label: '用户名',
          type: 'text'
        },
        created: {
          label: '创建时间',
          type: 'datetime'
        },
        updated: {
          label: '更新时间',
          type: 'datetime'
        },
        // token: {
        //   label: '登录状态',
        //   type: 'text'
        // },
        state: {
          label: '禁止',
          type: 'checkbox',
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
    _action (key, user, payload) {
      // console.log(key, user, payload)
      // `this` is c-row
      // const vm = this.$parent.$parent
      // row -> grid -> vm
      switch (key) {
        case 'remove':
          this.deleteUser(user)
          break
        // case 'modify':
        //   this.state = 1
        //   break
        case 'submit':
          if (payload) {
            this.updateUser(payload)
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
      this.getUsers()
    }
  },

  vuex: {
    getters: {
      users
    },
    actions: {
      getUsers,
      deleteUser,
      updateUser
    }
  }
}
</script>

<style src="styles/views/users"></style>
