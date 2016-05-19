<template>
  <div class="page-create">
    <c-form
      :submit="create"
      :columns="columns"
      :items="items"
      :actions="actions">
    </c-form>
  </div>
</template>

<script>
import CForm from 'duo/c-form'
import { pages } from 'vx/getters'
import { createPage } from 'vx/actions'
export default {
  data () {
    return {
      columns: {
        title: {
          label: '标题',
          type: 'text'
        },
        content: {
          label: '正文',
          type: 'multiline'
        }
      },
      items: {
        title: '',
        content: ''
      },
      actions: [null, {
        submit: {
          type: 'submit',
          class: 'primary',
          // string or function
          label: this.progress ? '提交创建中...' : '提交创建',
          disabled: !!this.progress
        }
      }]
    }
  },

  watch: {
    pages: {
      handler (val) {
        this.$nextTick(() => {
          if (val.items.length) {
            this.$route.router.go('/pages')
          }
        })
      },
      deep: true
    }
  },

  methods: {
    create ($validation, $payload) {
      if (!$validation.valid) {
        return
      }
      this.createPage($payload)
    }
  },

  vuex: {
    getters: {
      pages
    },
    actions: {
      createPage
    }
  },

  components: {
    CForm
  }
}
</script>
