<template>
  <div class="c-navbar"
    :class="[cls]">
    <mask v-show="opened"
      @touchend.prevent="opened = false"
      transition="fade"></mask>
    <button class="iconfont-nav c-navbar-toggle"
      type="button"
      :class="{active: opened}"
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
    cls: {
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
