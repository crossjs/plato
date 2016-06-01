<template>
  <div :class="['c-value', class]">
    <component :class="'c-value-' + type"
      :is="type"
      :value="value"></component>
  </div>
</template>

<script>
import Text from './c-text'
import Link from './c-link'
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
    }
  },

  components: {
    Text,
    Link
  }
}
</script>

<style src="styles/components/value"></style>
