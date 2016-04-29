<template>
  <tr class="ui-grid-row">
    <td class="index">{{index + 1}}</td>
    <td v-for="column in columns">
      <component
        :is="column.component || 'text'"
        :state="state"
        :value.sync="data[$key]"></component>
    </td>
    <td v-if="actions[state]">
      <button v-for="action in actions[state]"
        class="link"
        :role="$key"
        :type="action.type || 'button'"
        @click="_click($key)">{{action.label}}</button>
    </td>
  </tr>
</template>

<script>
import Text from '../c-text'
import Switch from '../c-switch'
import Datetime from '../c-datetime'
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
      default: {}
    },
    columns: {
      type: Object,
      default: {}
    },
    actions: {
      type: Array,
      default: []
    },
    callback: {
      type: Function,
      default: () => true
    }
  },

  methods: {
    _click (key) {
      this.callback(key)
    }
  },

  components: {
    Text,
    Switch,
    Datetime
  }
}
</script>
