<template>
  <div class="c-image"
    :class="[cls]">
    <img class="c-image-img"
      :src="src"
      :width="width"
      :height="height"
      :alt="alt"
      :title="title">
  </div>
</template>

<script>
export default {
  props: {
    cls: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style src="styles/components/image"></style>
