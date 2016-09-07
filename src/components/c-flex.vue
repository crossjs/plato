<template>
  <div :class="['c-flex', cls, align]"><slot></slot></div>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    align: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="styles/components/flex"></style>
