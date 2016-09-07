<template>
  <div :class="['c-pane', cls, dir]"><slot></slot></div>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    dir: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="styles/components/pane"></style>
