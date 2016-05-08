<template>
  <div class="users">
    <c-grid
      :columns="columns"
      :actions="actions"
      :data="users"
      @action="_action"
      @paginate="_paginate"></c-grid>
  </div>
</template>

<script>
import mGrid from 'mixins/m-grid'
import { users } from 'vx/getters'
import { getUsers, deleteUser, updateUser } from 'vx/actions'
export default {
  mixins: [mGrid],

  data () {
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
          label: '启用',
          type: 'checkbox',
          editable: true
        }
      },
      actions: [
        {
          detail: {
            label: '详情'
          },
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
      switch (key) {
        case 'detail':
          this.$route.router.go({
            name: 'users/detail',
            params: {
              id: user._id
            }
          })
          break
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
    },
    _paginate (query) {
      this.getUsers({
        query
      })
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
