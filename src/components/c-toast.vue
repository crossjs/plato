<template>
  <transition :name="transition">
    <div :class="['c-toast', cls]"><slot></slot></div>
  </transition>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase],
  props: {
    // remove transition?
    transition: {
      type: String,
      default: 'fade'
    }
  }
}
</script>

<style src="styles/components/toast"></style>
