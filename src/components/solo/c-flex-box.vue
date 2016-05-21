<template>
  <div :class="['c-flex-box', class, direction]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    direction: {
      type: String,
      default: 'row'
    }
  }
}
</script>

<style src="styles/components/flex-box"></style>
