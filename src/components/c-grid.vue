<template>
  <div class="c-grid" :class="[cls]">
    <c-modal
      :show.sync="modal.show"
      :args.sync="modal.args"
      :title="modal.title"
      :body="modal.body"
      :callback="modal.callback"></c-modal>
    <validator name="validation">
      <table>
        <thead>
          <tr>
            <th class="index">#</th>
            <th v-for="column in columns" :key="$key">{{column.label}}</th>
            <th v-if="actions"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="entry in data" track-by="_id">
            <c-row
              :index="$index"
              :data="entry"
              :columns="columns"
              :actions="actions"
              @action="_action"></c-row>
          </template>
        </tbody>
      </table>
    </validator>
  </div>
</template>

<script>
import CModal from './c-modal'
import CRow from './c-row'
export default {
  props: {
    cls: {
      type: String,
      default: ''
    },
    columns: {
      type: Object,
      default: {}
    },
    data: {
      type: Array,
      default: []
    },
    actions: {
      type: Array,
      default: () => [
        {
          modify: {
            label: '编辑',
            state: 1
          },
          remove: {
            label: '删除',
            confirm: true
          }
        },
        {
          submit: {
            label: '确定'
          },
          cancel: {
            label: '取消',
            state: 0
          }
        }
      ]
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
        // args: [],
        // title: '？',
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
    }
  },

  components: {
    CModal,
    CRow
  }
}
</script>

<style src="styles/components/grid"></style>
<style src="styles/components/form"></style>
