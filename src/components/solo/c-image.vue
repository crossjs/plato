<template>
  <div :class="['c-image', class]">
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
    class: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
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
      default: ''
    },
    height: {
      type: Number,
      default: ''
    }
  }
}
</script>

<style src="styles/components/image"></style>
