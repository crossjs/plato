<template>
  <img :class="['c-image', cls]"
    :src="flexible ? _src : src"
    :width="width"
    :height="height"
    :alt="alt"
    :title="title">
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase],
  props: {
    src: {
      type: String,
      default: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    },
    alt: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    flexible: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    _src () {
      /* globals lib */
      return this.src.replace(/@[1-3]x/, '@' + lib.flexible.dpr + 'x')
    }
  }
}
</script>

<style src="styles/components/image"></style>
