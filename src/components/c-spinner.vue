<template>
  <i :class="['c-spinner', theme, size, cls]"></i>
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
    },
    theme: {
      type: String,
      default: 'snake'
    }
  }
}
</script>

<style src="styles/components/spinner"></style>
