<template>
  <div class="users">
    <c-modal
      :show.sync="modal.show"
      :body="modal.body"
      :buttons="modal.buttons"
      :callback="modal.callback"></c-modal>
    <c-grid
      :columns="columns"
      :data="users"
      :transformer="transformer"
      :actions="actions"
      :callback="callback"></c-grid>
  </div>
</template>

<script>
import datetime from 'nd-datetime'
import mModal from 'mixins/m-modal'
import mGrid from 'mixins/m-grid'
import { users } from 'vx/getters'
import { getUsers, deleteUser } from 'vx/actions'
export default {
  mixins: [mModal, mGrid],

  data () {
    const callback = function (key, entry) {
      // modal
      if (key === 'submit') {
        return this.deleteUser(this.target)
      }
      // grid
      if (entry) {
        this.target = entry
        if (key === 'remove') {
          this.modal.show = true
        } else if (key === 'modify') {
          this.$route.router.go({
            name: 'users/modify',
            params: {
              username: entry.username
            }
          })
        }
      }
    }.bind(this)
    return {
      target: null,
      modal: {
        show: false,
        body: '确定删除？',
        buttons: {
          submit: {
            label: '确定'
          },
          cancel: {
            label: '取消'
          }
        },
        callback
      },
      columns: {
        username: {
          label: '用户名'
        },
        created: {
          label: '创建时间'
        },
        updated: {
          label: '活跃时间'
        },
        token: {
          label: '登录状态'
        },
        state: {
          label: '用户状态'
        }
      },
      transformer (value, key) {
        if (/updated|created/.test(key)) {
          return datetime(value)
        }
        return value
      },
      actions: {
        modify: {
          label: '编辑'
        },
        remove: {
          label: '删除'
        }
      },
      callback
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
      deleteUser
    }
  }
}
</script>

<style src="styles/views/users"></style>
