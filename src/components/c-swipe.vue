<template>
  <div class="c-swipe"
    :style="{transform: 'translate3d(' + offset + 'px, 0, 0)'}"
    @touchstart="dragstart"
    @touchmove="drag"
    @touchend="dragend"
    v-tap @tap="onTap">
    <div class="c-swipe-left" ref="left">
      <slot name="left"></slot>
    </div>
    <div class="c-swipe-body">
      <slot></slot>
    </div>
    <div class="c-swipe-right" ref="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { isHorizontal } from './utils/direction'

export default {
  data () {
    return {
      offset: 0,
      minOffset: 0,
      maxOffset: 0,
      // 正在拖动，不需要响应式
      // dragging: false,
      // 符合拖动条件
      catching: false
    }
  },

  mounted () {
    if (this.$slots.left || this.$slots.right) {
      this.$el.ownerDocument.addEventListener('touchstart', this.dragAtDoc)
      this.reset()
    }
  },

  methods: {
    reset () {
      this.minOffset = this.$slots.right ? -this.$refs.right.clientWidth : 0
      this.maxOffset = this.$slots.left ? this.$refs.left.clientWidth : 0
    },
    onTap (e) {
      if (!this.$refs.right.contains(e.originalEvent.target) &&
          !this.$refs.left.contains(e.originalEvent.target)) {
        this.offset = 0
      }
    },
    dragAtDoc (e) {
      if (!this.$el.contains(e.target)) {
        this.offset = 0
      }
    },
    dragstart (e) {
      if (!this.dragging && e.touches && e.touches.length === 1) {
        this.dragging = true
        this.catching = false
        this.reset()
        this.start = e.touches[0]
        this.startX = e.touches[0].pageX - this.offset
      }
    },
    drag (e) {
      if (this.dragging) {
        if (this.catching || isHorizontal(e.touches[0], this.start) > 0) {
          this.catching = true
          e.preventDefault()
          e.stopPropagation()
          this.offset = Math.min(this.maxOffset, Math.max(this.minOffset, e.touches[0].pageX - this.startX))
        } else {
          this.dragging = false
          this.catching = false
        }
      }
    },
    dragend (e) {
      if (this.dragging) {
        this.dragging = false
        this.catching = false
        if (this.offset > 0) {
          if (this.offset > this.maxOffset / 2) {
            this.offset = this.maxOffset
            return
          }
        } else {
          if (this.offset < this.minOffset / 2) {
            this.offset = this.minOffset
            return
          }
        }
        this.offset = 0
      }
    }
  }
}
</script>

<style src="styles/components/swipe"></style>
