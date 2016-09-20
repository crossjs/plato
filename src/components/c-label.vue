<template>
  <label :class="['c-label', cls]"><slot></slot></label>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase]
}
</script>

<style src="styles/components/label"></style>
