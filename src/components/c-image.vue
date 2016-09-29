<template>
  <img class="c-image"
    :src="flexible ? _src : src"
    :width="flexible ? _width : width"
    :height="flexible ? _height : height">
</template>

<script>
import mBase from './mixins/base'

/* globals lib */
const { dpr } = typeof lib === 'object' ? lib.flexible : { dpr: 2 }

export default {
  mixins: [mBase],

  props: {
    src: {
      type: String,
      default: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
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
      return this.src.replace(/@[1-3]x/, '@' + dpr + 'x')
    },
    _width () {
      return this.width ? this.width * dpr / 2 : this.width
    },
    _height () {
      return this.height ? this.height * dpr / 2 : this.height
    }
  }
}
</script>

<style src="styles/components/image"></style>
