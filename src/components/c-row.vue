<template>
  <div class="c-row" :class="{'c-row-flex': flex}"><slot></slot></div>
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
