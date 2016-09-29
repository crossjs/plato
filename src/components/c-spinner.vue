<template>
  <i class="c-spinner" :class="[theme, size]"></i>
</template>

<script>
import mBase from './mixins/base'
import mSize from './mixins/size'

export default {
  mixins: [mBase, mSize],

  props: {
    theme: {
      type: String,
      default: 'snake'
    }
  }
}
</script>

<style src="styles/components/spinner"></style>
