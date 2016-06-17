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
      required: true
    }
  },

  computed: {
    _value () {
      return String.fromCharCode(+this.value)
    }
  }
}
</script>

<style src="styles/components/icon"></style>
