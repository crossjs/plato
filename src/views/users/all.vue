<template>
  <div class="users">
    <c-modal
      :show.sync="modal.show"
      :title="modal.title"
      :body="modal.body"
      :callback="modal.callback"></c-modal>
    <c-grid
      :columns="grid.columns"
      :data="users"
      :actions="grid.actions"
      :callback="grid.callback"></c-grid>
  </div>
</template>

<script>
import mModal from 'mixins/m-modal'
import mGrid from 'mixins/m-grid'
import { users } from 'vx/getters'
import { getUsers, deleteUser, updateUser } from 'vx/actions'
export default {
  mixins: [mModal, mGrid],

  data () {
    const modal = {
      show: false,
      // title: '？',
      body: '确定删除？',
      callback (key) {
        if (key === 'submit') {
          return this.$parent.deleteUser(this.$parent.target)
        }
      }
    }
    const grid = {
      columns: {
        username: {
          label: '用户名',
          component: 'text'
        },
        created: {
          label: '创建时间',
          component: 'datetime'
        },
        updated: {
          label: '活跃时间',
          component: 'datetime'
        },
        // token: {
        //   label: '登录状态',
        //   component: 'text'
        // },
        state: {
          label: '禁止',
          component: 'switch'
        }
      },
      // actions will auto switch by state
      actions: [
        {
          modify: {
            label: '编辑'
          },
          remove: {
            label: '删除'
          }
        },
        {
          submit: {
            label: '确定'
          },
          cancel: {
            label: '取消'
          }
        }
      ],
      callback (key) {
        const vm = this.$parent.$parent
        // row -> grid -> vm
        switch (key) {
          case 'remove':
            vm.modal.show = true
            break
          case 'modify':
            this.state = 1
            break
          case 'submit':
            vm.updateUser(this.data)
            break
          case 'cancel':
            this.state = 0
            break
        }
      }
    }
    return {
      target: null,
      modal,
      grid
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
