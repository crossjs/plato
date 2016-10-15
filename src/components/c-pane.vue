<template>
  <div class="c-pane"
    :class="{'c-pane-flex': flex}"><slot></slot></div>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase],

  props: {
    flex: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style src="styles/components/pane"></style>
