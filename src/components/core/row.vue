<template>
  <div class="c-row"
    :class="{'c-row-flex': flex}">
    <slot></slot>
    <c-icon class="c-row-link" v-if="link">chevron-up</c-icon>
  </div>
</template>

<script>
import CIcon from './icon'

export default {
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

<style src="./styles/row"></style>
