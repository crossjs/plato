<template>
  <div :class="['c-cell', class]">
    <icon class="c-cell-icon"
      :value="column.icon"></icon>
    <labe class="c-cell-labe"
      :value="column.label"></labe>
    <component class="c-cell-value"
      :is="column.type"
      :value="value"
      :attrs="column.attrs"></component>
  </div>
</template>

<script>
import Icon from './c-icon'
import Labe from './c-labe'
import Text from './c-text'
import Link from './c-link'
import Checkbox from './c-checkbox'
import Datetime from './c-datetime'
import Dropdown from './c-dropdown'
export default {
  props: {
    class: {
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
    Link,
    Checkbox,
    Datetime,
    Dropdown
  }
}
</script>

<style src="styles/components/cell"></style>
