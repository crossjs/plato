<template>
  <div :class="['c-loading', cls]"><div :class="['c-loading-' + theme]"></div><slot></slot></div>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    theme: {
      type: String,
      default: 'snake'
    }
  }
}
</script>

<style src="styles/components/loading"></style>
