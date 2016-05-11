<template>
  <div
    class="c-navbar"
    :class="[cls]"
    :style="{width: '' + progress + '%'}"></div>
</template>

<script>
export default {
  props: {
    cls: {
      type: String,
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
