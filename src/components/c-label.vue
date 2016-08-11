<template>
  <div :class="['c-label', className]"><slot></slot></div>
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

<style src="plato-styles/label"></style>
