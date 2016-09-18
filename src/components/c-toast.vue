<template>
  <transition :name="transition">
    <div :class="['c-toast', cls]"><slot></slot></div>
  </transition>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    transition: {
      type: String,
      default: 'fade'
    }
  }
}
</script>

<style src="styles/components/toast"></style>
