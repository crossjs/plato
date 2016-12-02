<template>
  <div class="c-progress">
    <div class="c-progress-content"
      :style="{transform: 'translate3d(-' + (100 - progress) + '%, 0, 0)'}"></div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0,
      validator (val) {
        return +val >= 0 && +val <= 100
      }
    }
  }
}
</script>

<style src="./styles/progress"></style>
