<template>
  <div :class="['c-mask', className]"
    tabindex="-1"><slot></slot></div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="plato-styles/mask"></style>
