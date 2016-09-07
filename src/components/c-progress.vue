<template>
  <div :class="['c-progress', cls]"
    :style="{width: '' + progress + '%'}"></div>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    progress: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style src="styles/components/progress"></style>
