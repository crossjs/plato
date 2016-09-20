<template>
  <i :class="['c-icon', cls]"><slot></slot></i>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase]
}
</script>

<style src="styles/components/icon"></style>
