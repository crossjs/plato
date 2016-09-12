<template>
  <button :class="['c-button', cls, size]"
    :type="type"
    v-bind="attrs"><slot></slot></button>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    type: {
      type: String,
      default: 'button'
    },
    size: {
      type: String,
      default: '',
      validator (value) {
        return !value || /^x?(large|small)$/.test(value)
      }
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
