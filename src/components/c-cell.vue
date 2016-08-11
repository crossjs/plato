<template>
  <div :class="['c-cell', className, direction]"><slot></slot></div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    direction: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="plato-styles/cell"></style>
