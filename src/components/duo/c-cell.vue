<template>
  <div :class="['c-cell', class]">
    <icon class="c-cell-icon"
      :value="column.icon"></icon>
    <labe class="c-cell-labe"
      :value="column.label"></labe>
    <component class="c-cell-value"
      :is="column.type"
      :state="state"
      :field="field"
      :attrs="column.attrs"
      :validate="column.validate"
      :value.sync="value"></component>
  </div>
</template>

<script>
import Icon from '../solo/c-icon'
import Labe from '../solo/c-labe'
import Text from './c-text'
import Multiline from './c-multiline'
import Password from './c-password'
import Checkbox from './c-checkbox'
import Datetime from './c-datetime'
import Dropdown from './c-dropdown'
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    state: {
      type: Number,
      default: 0
    },
    field: {
      type: String,
      default: ''
    },
    column: {
      type: Object,
      default: () => {}
    },
    value: {
    }
  },

  watch: {
    value (val) {
      this.$nextTick(() => {
        this.$emit('mutate', val)
      })
    }
  },

  components: {
    Icon,
    Labe,
    Text,
    Multiline,
    Password,
    Checkbox,
    Datetime,
    Dropdown
  }
}
</script>

<style src="styles/components/cell"></style>
