<template>
  <div class="c-navbar"
    :class="[cls]">
    <button class="iconfont-nav c-navbar-toggle"
      type="button"
      :class="{active: opened}"
      @click="opened = !opened"></button>
    <mask cls="c-datepicker-mask"
      @touchend.prevent="opened = false"
      v-show="opened"></mask>
    <nav class="c-navbar-menu"
      v-show="opened"
      @click="opened = false"
      transition="slide">
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
