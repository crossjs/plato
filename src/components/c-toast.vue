<template>
  <transition :name="transition">
    <div :class="['c-toast', cls]"
      v-show="toasts.length">
      <transition-group tag="div" :name="transition">
        <div class="toast"
          v-for="toast in toasts"
          :key="toast._id">
          <pre class="name"><code> {{toast.name}} </code></pre>
          <pre class="message"><code> {{toast.message}} </code></pre>
        </div>
      </transition-group>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    cls: {
      type: [String, Array],
      default: ''
    },
    transition: {
      type: String,
      default: 'slide'
    },
    toasts: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style src="styles/components/toast"></style>
