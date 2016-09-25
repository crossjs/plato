<!-- Inspired by https://facebook.github.io/react-native/docs/picker.html -->
<template>
  <div :class="['c-picker', cls]">
    <div class="c-picker-scroller"></div>
    <div class="c-picker-content"
      :style="{transform: 'translate3d(0, ' + offset + 'px, 0)'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import mBase from './mixins/base'

/* globals lib */
const { dpr } = typeof lib === 'object' ? lib.flexible : { dpr: 2 }

export default {
  mixins: [mBase],

  props: {
    itemHeight: {
      type: Number,
      default: 60
    },
    index: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      offset: 0
    }
  },

  computed: {
    _itemHeight () {
      return this.itemHeight * dpr / 2
    },
    maxOffset () {
      return this._itemHeight * 3
    },
    minOffset () {
      return this._itemHeight * (4 - this.$slots.default.length)
    }
  },

  mounted () {
    this.$el.addEventListener('touchstart', this.dragstart)
    this.$el.addEventListener('touchmove', this.drag)
    this.$el.addEventListener('touchend', this.dragend)
    this.offset = this._itemHeight * (this.index + 3)
  },

  methods: {
    dragstart (e) {
      if (!this.dragging && e.touches && e.touches.length === 1) {
        this.dragging = true
        this.startY = e.touches[0].pageY - this.offset
      }
    },
    drag (e) {
      if (this.dragging) {
        e.preventDefault()
        e.stopPropagation()
        this.offset = Math.min(this.maxOffset, Math.max(this.minOffset, e.touches[0].pageY - this.startY))
      }
    },
    dragend (e) {
      if (this.dragging) {
        this.dragging = false
        const index = Math.round(this.offset / this._itemHeight)
        this.offset = this._itemHeight * index
        this.$emit('pick', 3 - index)
      }
    }
  }
}
</script>

<style src="styles/components/picker"></style>
