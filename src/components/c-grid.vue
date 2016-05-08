<template>
  <div class="c-grid" :class="[cls]">
    <modal
      :show.sync="modal.show"
      :args.sync="modal.args"
      :title="modal.title"
      :body="modal.body"
      :callback="modal.callback"></modal>
    <validator name="validation">
      <table>
        <thead>
          <tr>
            <th class="index">#</th>
            <th v-for="column in columns" :key="$key">{{column.label}}</th>
            <th v-if="actions">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="entry in data.items" track_by="_id">
            <row
              :index="data.query.$offset || 0 + $index"
              :data="entry"
              :columns="columns"
              :actions="actions"
              @action="_action"></row>
          </template>
        </tbody>
      </table>
      <paginator
        v-if="data.count !== -1"
        :query="data.query"
        :count="data.count"
        @paginate="_paginate"
        ></paginator>
    </validator>
  </div>
</template>

<script>
import Modal from './c-modal'
import Row from './c-row'
import Paginator from './c-paginator'
export default {
  props: {
    cls: {
      type: String,
      default: ''
    },
    columns: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    },
    actions: {
      type: Array,
      default: () => []
    },
    callback: {
      type: Function,
      default: () => true
    }
  },

  data () {
    return {
      modal: {
        show: false,
        args: [],
        title: '',
        body: '确定删除？',
        callback (key) {
          if (key === 'submit') {
            this.$parent.$emit(...this.args)
          }
        }
      },
      payload: {}
    }
  },

  methods: {
    _action (key, action, data, payload) {
      const args = ['action', key, data, payload]
      if (action.confirm) {
        this.modal.show = true
        this.modal.args = args
        return
      }
      this.$emit(...args)
    },
    _paginate (query) {
      this.$emit('paginate', query)
    }
  },

  components: {
    Modal,
    Row,
    Paginator
  }
}
</script>

<style src="styles/components/grid"></style>
<style src="styles/components/form"></style>
