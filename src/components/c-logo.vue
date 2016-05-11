<template>
  <div
    class="c-logo"
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

<style src="styles/components/logo"></style>
