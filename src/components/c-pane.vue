<template>
  <div class="c-pane"
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

<style src="styles/components/pane"></style>
