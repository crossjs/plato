<template>
  <div
    class="c-navbar"
    :class="[cls]">
    <button
      type="button"
      class="iconfont-nav c-navbar-toggle"
      :class="{active: opened}"
      @click="opened = !opened"></button>
    <nav
      class="c-navbar-menu"
      v-show="opened"
      @mouseup="opened = false">
      <slot></slot>
    </nav>
  </div>
</template>

<script>
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
  }
}
</script>

<style src="styles/components/navbar"></style>
