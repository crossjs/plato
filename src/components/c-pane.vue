<template>
  <div :class="['c-pane', className, dir]"><slot></slot></div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    dir: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="plato-styles/pane"></style>
