<template>
  <div :class="['c-labe', class]"
    v-if="value">{{value}}</div>
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
