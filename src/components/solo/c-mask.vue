<template>
  <div class="c-mask"
    :class="[cls]"><slot></slot></div>
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

<style src="styles/components/solo/mask"></style>
