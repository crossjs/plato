<template>
  <div :class="['c-row', {'flex': flex}, cls]"><slot></slot></div>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    flex: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style src="styles/components/row"></style>
