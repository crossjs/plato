<template>
  <div :class="['c-col', 'c-col-' + size, cls]"><slot></slot></div>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase],
  props: {
    size: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style src="styles/components/col"></style>
