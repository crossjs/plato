<template>
  <div :class="['c-navbar', className]">
    <transition name="fade">
      <c-mask v-show="opened"
      @touchend.prevent="opened = false"></c-mask>
    </transition>
    <button :class="['c-navbar-toggle', {active: opened}]"
      type="button"
      @click="opened = !opened">
        <c-icon value="menu"></c-icon>
    </button>
    <transition name="slide-left">
      <nav class="c-navbar-menu"
        v-show="opened"
        @click="opened = false">
        <slot></slot>
      </nav>
    </transition>
  </div>
</template>

<script>
import CMask from './c-mask'
import CIcon from './c-icon'
export default {
  props: {
    className: {
      type: [String, Array],
      default: ''
    }
  },

  data () {
    return {
      opened: false
    }
  },

  components: {
    CMask,
    CIcon
  }
}
</script>

<style src="plato-styles/navbar"></style>
