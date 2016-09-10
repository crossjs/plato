<template>
  <div :class="['c-row', cls]"><slot></slot></div>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    }
  }
}
</script>

<style src="styles/components/row"></style>
