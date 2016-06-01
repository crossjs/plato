<template>
  <div :class="['c-text', class]">{{value}}</div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    value: {
    }
  }
}
</script>

<style src="styles/components/text"></style>
