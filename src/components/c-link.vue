<template>
  <div :class="['c-link', class]"><a class="c-link-a" v-link="value.route">{{value.label}}</a></div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    value: {
    }
  }
}
</script>

<style src="styles/components/link"></style>
