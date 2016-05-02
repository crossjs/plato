<template>
  <div class="users">
    <c-grid
      :columns="columns"
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
          component: 'text'
        },
        // created: {
        //   label: '创建时间',
        //   component: 'datetime'
        // },
        // updated: {
        //   label: '活跃时间',
        //   component: 'datetime'
        // },
        // token: {
        //   label: '登录状态',
        //   component: 'text'
        // },
        state: {
          label: '禁止',
          component: 'switch'
        }
      }
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
      if (this.bearer) {
        transition.next()
        this.getUsers()
      } else {
        this.$route.router.go('/')
      }
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
