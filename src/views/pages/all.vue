<template>
  <div class="pages">
    <pane>
      <c-button class="primary"
        @click="_create">Create</c-button>
    </pane>
    <pane>
      <group :cells="cells"></group>
    </pane>
    <paginator
      v-if="pages.count !== -1"
      :query="pages.query"
      :count="pages.count"
      @paginate="_paginate"></paginator>
  </div>
</template>

<script>
import Pane from 'components/c-pane'
import CButton from 'components/c-button'
import Group from 'components/c-group'
import Paginator from 'components/c-paginator'
import { pages } from 'vx/getters'
import { getPages, updatePage } from 'vx/actions'
export default {
  computed: {
    cells () {
      return this.pages.items.map(item => {
        return {
          label: item.title,
          value: item.created,
          click: () => {
            this.$route.router.go({
              name: 'pages/preview',
              params: {
                id: item._id
              }
            })
          }
        }
      })
    }
  },

  methods: {
    _create () {
      this.$route.router.go('/pages/create')
    },
    _paginate (query) {
      this.getPages({
        query
      })
    },
    _mutate (_id, [val]) {
      this.updatePage({ _id, ...val })
    }
  },

  route: {
    activate (transition) {
      transition.next()
      this.getPages()
    }
  },

  vuex: {
    getters: {
      pages
    },
    actions: {
      getPages,
      updatePage
    }
  },

  components: {
    CButton,
    Pane,
    Group,
    Paginator
  }
}
</script>

<style src="styles/views/pages"></style>
