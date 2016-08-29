<template>
  <div :class="['c-progress', className]"
    :style="{width: '' + progress + '%'}"></div>
</template>

<script>
export default {
  props: {
    className: {
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

<style src="plato-styles/progress"></style>
