<template>
  <div :class="['c-mask', cls]" tabindex="-1"><slot></slot></div>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase]
}
</script>

<style src="styles/components/mask"></style>
