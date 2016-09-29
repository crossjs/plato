<template>
  <div :class="['c-row', {'c-row-flex': flex}, cls]"><slot></slot></div>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase],
  props: {
    flex: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style src="styles/components/row"></style>
