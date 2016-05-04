<template>
  <tr class="c-grid-row">
    <td class="index">{{index + 1}}</td>
    <td v-for="column in columns">
      <component
        :is="column.type"
        :state="state"
        :field="$key"
        :attrs="column.attrs"
        :value="data[$key]"
        @mutate="_mutate($key, $arguments)"></component>
    </td>
    <td v-if="actions[state]">
      <button v-for="action in actions[state]"
        class="link"
        :role="$key"
        :type="action.type || 'button'"
        @click="_click($key, action)">{{action.label}}</button>
    </td>
  </tr>
</template>

<script>
import Text from './c-text'
import Checkbox from './c-checkbox'
import Datetime from './c-datetime'
export default {
  props: {
    state: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: -1
    },
    data: {
      type: Object,
      default: () => {}
    },
    columns: {
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

  watch: {
    // data 变化，从 dispatch 来
    data () {
      // 重置 payload
      this.payload = null
      // 先设置为中间态
      this.state = -1
      this.$nextTick(() => {
        // 再设置为展示态
        this.state = 0
      })
    }
  },

  methods: {
    _mutate (key, [value]) {
      if (!this.payload) {
        this.payload = { ...this.data }
      }
      // 数据变更，保存到 payload
      this.payload[key] = value
    },
    _click (key, action) {
      if (action.hasOwnProperty('state')) {
        this.state = action.state
      }
      this.$emit('action', key, action, this.data, this.payload)
    }
  },

  components: {
    Text,
    Checkbox,
    Datetime
  }
}
</script>
