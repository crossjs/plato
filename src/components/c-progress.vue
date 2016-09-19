<template>
  <i :class="['c-progress', cls]"
    :style="{width: '' + progress + '%'}"></i>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    progress: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>

<style src="styles/components/progress"></style>
