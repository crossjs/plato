<template>
  <div :class="['c-mask', cls]"
    tabindex="-1"><slot></slot></div>
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

<style src="styles/components/mask"></style>
