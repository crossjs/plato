<template>
  <div class="users">
    <c-modal
      :show.sync="modal.show"
      :body="modal.body"
      :buttons="modal.buttons"></c-modal>
    <c-grid
      :data="users"
      :columns="columns"
      :actions="actions"></c-grid>
  </div>
</template>

<script>
import mModal from 'mixins/m-modal'
import mGrid from 'mixins/m-grid'
import { users } from 'vx/getters'
import { getUsers, deleteUser } from 'vx/actions'
export default {
  mixins: [mModal, mGrid],

  data () {
    let target
    const showModal = function (column) {
      target = column
      this.modal.show = true
    }.bind(this)
    const dismissModal = function (ok) {
      this.modal.show = false
      if (ok) {
        this.deleteUser(target)
      }
      target = null
    }.bind(this)
    return {
      target: null,
      modal: {
        show: false,
        body: '确定删除？',
        buttons: {
          ok: {
            label: '确定',
            role: 'submit',
            click () {
              dismissModal(true)
            }
          },
          no: {
            label: '取消',
            role: 'cancel',
            click () {
              dismissModal(false)
            }
          }
        }
      },
      columns: {
        username: {
          label: '用户名'
        },
        created: {
          label: '创建时间',
          filters: 'datetime'
        }
      },
      actions: {
        remove: {
          label: '删除',
          click: showModal
        }
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
      deleteUser
    }
  }
}
</script>

<style src="styles/views/users"></style>
