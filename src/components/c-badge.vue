<template>
  <i class="c-badge" :class="size"><slot></slot></i>
</template>

<script>
import mBase from './mixins/base'
import mSize from './mixins/size'

export default {
  mixins: [mBase, mSize]
}
</script>

<style src="styles/components/badge"></style>
