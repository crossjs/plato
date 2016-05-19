<template>
  <div :class="['c-pane', class]">
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

<style src="styles/components/pane"></style>
