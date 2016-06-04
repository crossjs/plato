<template>
  <div class="users">
    <c-pane>
      <c-group
        v-for="item in items"
        track-by="title"
        :title="item.title"
        :cells="item.cells"></c-group>
      <paginator
        v-if="users.count !== -1"
        :query="users.query"
        :count="users.count"
        @paginate="_paginate"></paginator>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CGroup from 'components/c-group'
import Paginator from 'components/c-paginator'
import { users } from 'vx/getters'
import { getUsers, updateUser } from 'vx/actions'
export default {
  computed: {
    items () {
      return this.users.items.map(item => {
        return {
          title: '#' + item._id,
          cells: [{
            label: '账号',
            value: item.username
          }, {
            label: '状态',
            value: ['禁用', '正常'][item.state]
          }]
        }
      })
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
    CPane,
    CGroup,
    Paginator
  }
}
</script>

<style src="styles/views/users"></style>
