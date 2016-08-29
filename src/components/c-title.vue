<template>
  <div :class="['c-title', className]"><slot></slot></div>
</template>

<script>
export default {
  props: {
    className: {
      type: [String, Array],
      default: ''
    }
  }
}
</script>

<style src="plato-styles/title"></style>
