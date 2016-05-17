<template>
  <div class="c-icon"
    :class="[cls, value]"
    v-if="value">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['cls', 'value']
}
</script>

<style src="styles/components/icon"></style>
