<template>
  <i :class="['c-spinner', theme, size, cls]"></i>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase],
  props: {
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
