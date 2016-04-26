<template>
  <div class="pages">
    <c-modal
      :show.sync="modal.show"
      :body="modal.body"
      :buttons="modal.buttons"></c-modal>
    <c-grid
      :data="pages"
      :columns="columns"
      :actions="actions"></c-grid>
  </div>
</template>

<script>
import mModal from 'mixins/m-modal'
import mGrid from 'mixins/m-grid'
import { pages } from 'vx/getters'
import { getPages, deletePage } from 'vx/actions'
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
        this.deletePage(target)
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
          label: '用户'
        },
        title: {
          label: '页面标题'
        },
        content: {
          label: '页面内容'
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
        this.getPages()
      } else {
        this.$route.router.go('/')
      }
    }
  },

  vuex: {
    getters: {
      pages
    },
    actions: {
      getPages,
      deletePage
    }
  }
}
</script>

<style src="styles/views/pages"></style>
