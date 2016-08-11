<template>
  <button :class="['c-button', className]"
    :type="type"
    v-bind="attrs"><slot></slot></button>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: 'default'
    },
    type: {
      type: String,
      default: 'button'
    },
    attrs: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style src="plato-styles/button"></style>
