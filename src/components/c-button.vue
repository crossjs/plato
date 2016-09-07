<template>
  <button :class="['c-button', cls]"
    :type="type"
    v-bind="attrs"><slot></slot></button>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
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

<style src="styles/components/button"></style>
