<template>
  <form :class="['c-form', cls]"
    autocomplete="off" novalidate>
    <slot></slot>
  </form>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    submit: {
      type: Function,
      default () {
        return true
      }
    }
  }
}
</script>

<style src="styles/components/form"></style>
