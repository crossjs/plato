<template>
  <div class="c-toast"
    :class="[cls]"
    v-show="toasts.length"
    transition="slide">
    <div class="toast"
      v-for="toast in toasts"
      track-by="_id"
      transition="slide">
      <button class="ignore" @click="_remove(toast)">ⓧ</button>
      <pre class="code"><code> {{toast.code}} </code></pre>
      <pre class="message"><code> {{toast.message}} </code></pre>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cls: {
      type: String,
      default: ''
    },
    toasts: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    _remove (toast) {
      this.$emit('remove', toast)
    }
  }
}
</script>

<style src="styles/components/toast"></style>
