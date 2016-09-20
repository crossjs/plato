<template>
  <a :class="['c-link', size, cls]"><slot></slot></a>
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
    }
  }
}
</script>

<style src="styles/components/link"></style>
