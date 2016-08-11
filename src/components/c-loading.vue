<template>
  <div :class="['c-loading', className]"><div :class="['c-loading-' + theme]"></div><slot></slot></div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'snake'
    }
  }
}
</script>

<style src="plato-styles/loading"></style>
