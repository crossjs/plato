<template>
  <div :class="['c-col', size ? 'c-col-' + size : null, cls]"><slot></slot></div>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase],
  props: {
    size: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style src="styles/components/col"></style>
