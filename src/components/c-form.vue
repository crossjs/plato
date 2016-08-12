<template>
  <form :class="['c-form', className]"
    autocomplete="off" novalidate>
    <slot></slot>
  </form>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
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

<style src="plato-styles/form"></style>
