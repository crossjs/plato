<template>
  <div class="c-row"
    :class="{'c-row-flex': flex}">
    <slot></slot>
    <c-icon class="c-row-link" v-if="link">chevron-right</c-icon>
  </div>
</template>

<script>
import CIcon from './c-icon'
import mBase from './mixins/base'

export default {
  mixins: [mBase],

  props: {
    flex: {
      type: Boolean,
      default: true
    },
    link: {
      type: Boolean,
      default: false
    }
  },

  components: {
    CIcon
  }
}
</script>

<style src="styles/components/row"></style>
