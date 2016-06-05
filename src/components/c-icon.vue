<template>
  <div :class="['c-icon', class]">{{_value}}</div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    }
  },

  computed: {
    _value () {
      return String.fromCharCode(this.value)
    }
  }
}
</script>

<style src="styles/components/icon"></style>
