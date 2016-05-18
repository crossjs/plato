<template>
  <div class="pages">
    <c-form
      v-for="items in pages.items"
      track-by="_id"
      :state="state"
      :columns="columns"
      :items="items"
      :actions="actions"
      @mutate="_mutate(items._id, $arguments)"></c-form>
    <paginator
      v-if="pages.count !== -1"
      :query="pages.query"
      :count="pages.count"
      @paginate="_paginate"></paginator>
  </div>
</template>

<script>
import CForm from 'duo/c-form'
import Paginator from 'solo/c-paginator'
import { pages } from 'vx/getters'
import { getPages, updatePage } from 'vx/actions'
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
        title: {
          label: '标题',
          type: 'text'
        },
        content: {
          label: '正文',
          type: 'multiline'
        },
        created: {
          label: '创建时间',
          type: 'datetime',
          attrs: {
            readonly: true
          }
        },
        updated: {
          label: '修改时间',
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
    CForm,
    Paginator
  }
}
</script>

<style src="styles/views/pages"></style>
