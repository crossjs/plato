<template>
  <div :class="['c-flex-item', class]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="styles/components/flex-item"></style>
