<template>
  <div :class="['c-navbar', class]">
    <mask v-show="opened"
      @touchend.prevent="opened = false"
      transition="fade"></mask>
    <button :class="['c-navbar-toggle', 'iconfont-nav', {active: opened}]"
      type="button"
      @click="opened = !opened"></button>
    <nav class="c-navbar-menu"
      v-show="opened"
      @click="opened = false"
      transition="fade">
      <slot></slot>
    </nav>
  </div>
</template>

<script>
import Mask from './c-mask'
export default {
  props: {
    class: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      opened: false
    }
  },

  components: {
    Mask
  }
}
</script>

<style src="styles/components/navbar"></style>
