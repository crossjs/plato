<template>
  <div class="c-flex-item"
    :class="[cls]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    cls: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="styles/components/flex-item"></style>
