<template>
  <a class="c-link" :class="size"><slot></slot></a>
</template>

<script>
import mBase from './mixins/base'
import mSize from './mixins/size'

export default {
  mixins: [mBase, mSize]
}
</script>

<style src="styles/components/link"></style>
