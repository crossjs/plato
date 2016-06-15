<template>
  <div :class="['c-flex', class]"><slot></slot></div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="styles/components/flex"></style>
