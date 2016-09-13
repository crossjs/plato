<template>
  <a :class="['c-link', cls, size]"><slot></slot></a>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    size: {
      type: String,
      default: '',
      validator (value) {
        return !value || /^x?(large|small)$/.test(value)
      }
    }
  }
}
</script>

<style src="styles/components/link"></style>
