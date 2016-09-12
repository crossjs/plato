<template>
  <div :class="['c-navbar', cls]">
    <transition name="fade">
      <c-mask v-show="opened"
        @touchend.native.prevent="opened = false"></c-mask>
    </transition>
    <c-button :cls="['toggle', {'active': opened}]"
      @click.native="opened = !opened">
        <c-icon>menu</c-icon>
    </c-button>
    <transition name="slide-left">
      <nav class="menu"
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
import CButton from './c-button'
export default {
  props: {
    cls: {
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
    CIcon,
    CButton
  }
}
</script>

<style src="styles/components/navbar"></style>
