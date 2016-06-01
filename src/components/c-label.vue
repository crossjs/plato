<template>
  <div :class="['c-label', class]"><slot></slot></div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField]
}
</script>

<style src="styles/components/label"></style>
