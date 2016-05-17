<template>
  <div class="users">
    <c-form
      v-for="items in users.items"
      track-by="_id"
      :state="state"
      :columns="columns"
      :items="items"
      @mutate="_mutate(items._id, $arguments)"></c-form>
    <paginator
      v-if="users.count !== -1"
      :query="users.query"
      :count="users.count"
      @paginate="_paginate"></paginator>
  </div>
</template>

<script>
import CForm from 'components/c-form'
import Paginator from 'components/c-paginator'
import { users } from 'vx/getters'
import { getUsers, updateUser } from 'vx/actions'
export default {
  data () {
    return {
      state: 1,
      columns: {
        username: {
          label: '账号',
          type: 'text',
          attrs: {
            readonly: true
          }
        },
        state: {
          label: '状态',
          type: 'checkbox',
          attrs: {
            'true-label': '正常',
            'false-label': '禁用'
          }
        },
        created: {
          label: '创建时间',
          type: 'datetime',
          attrs: {
            readonly: true
          }
        },
        updated: {
          label: '活跃时间',
          type: 'datetime',
          attrs: {
            readonly: true
          }
        }
      }
    }
  },

  methods: {
    _paginate (query) {
      this.getUsers({
        query
      })
    },
    _mutate (_id, [val]) {
      this.updateUser({ _id, ...val })
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
      updateUser
    }
  },

  components: {
    CForm,
    Paginator
  }
}
</script>

<style src="styles/views/users"></style>
