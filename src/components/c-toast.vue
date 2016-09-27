<template>
  <div :class="['c-toast', cls]"><slot></slot></div>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase]
}
</script>

<style src="styles/components/toast"></style>
