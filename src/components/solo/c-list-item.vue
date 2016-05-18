<template>
  <div class="c-list-item"
    :class="[cls]">
    <icon cls="c-list-icon"
      :value="column.icon"></icon>
    <labe cls="c-list-labe"
      :value="column.label"></labe>
    <component cls="c-list-value"
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
    cls: {
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

<style src="styles/components/list-item"></style>
