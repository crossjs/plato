<template>
  <div :class="['c-icon', class]"><slot>{{value}}</slot></div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    value: {
      default: ''
    }
  }
}
</script>

<style src="styles/components/icon"></style>
