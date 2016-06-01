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
import CForm from 'components/c-form'
import { pages } from 'vx/getters'
import { createPage } from 'vx/actions'
export default {
  data () {
    return {
      columns: {
        title: {
          label: '标题',
          type: 'text',
          validate: {
            required: {
              rule: true,
              message: '请输入标题'
            }
          }
        },
        content: {
          label: '正文',
          type: 'multiline',
          validate: {
            required: {
              rule: true,
              message: '请输入正文'
            }
          }
        }
      },
      items: {
        title: '',
        content: ''
      }
    }
  },

  computed: {
    actions () {
      return [null, {
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
    create ($payload) {
      this.$validate().then(() => {
        this.createPage($payload)
      }).catch($validation => {
        this.$emit('error', $validation)
      })
    }
  },

  validator: {
    auto: true
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
