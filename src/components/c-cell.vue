<template>
  <div :class="['c-cell', cls, direction]"><slot></slot></div>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    direction: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="styles/components/cell"></style>
