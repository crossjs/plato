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
import { GET, DELETE } from 'utils/ajax'
import { pages } from 'vx/getters'
import { setPages } from 'vx/actions'
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

  methods: {
    fetchPages () {
      GET('/apis/pages')
      .then(json => {
        Promise.all(json.map(data => {
          return GET(`/apis/users/${data.user}`).then(user => {
            data.username = user.username
          })
        })).then(() => {
          this.setPages(json)
        })
      })
    },
    deleteUser (page) {
      if (!page || !page._id) {
        return
      }
      DELETE(`/apis/pages/${page._id}`)
      .then(json => {
        this.pages.$remove(page)
      })
    }
  },

  route: {
    activate (transition) {
      if (this.bearer) {
        transition.next()
        this.fetchPages()
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
      setPages
    }
  }
}
</script>

<style src="styles/views/pages"></style>
