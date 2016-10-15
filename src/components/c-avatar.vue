<template>
  <i class="c-avatar" :class="size"><slot></slot></i>
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
        return /^(large|small)?$/.test(value)
      }
    }
  }
}
</script>

<style src="styles/components/avatar"></style>
