<template>
  <div :class="['c-flex', className, align]"><slot></slot></div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="plato-styles/flex"></style>
