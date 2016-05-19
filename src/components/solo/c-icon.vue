<template>
  <div :class="['c-icon', class, value]"
    v-if="value"><slot></slot></div>
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

<style src="styles/components/icon"></style>
