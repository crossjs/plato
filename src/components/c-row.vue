<template>
  <div class="c-row"
    v-tap @tap="offset = 0">
    <div class="c-row-wrapper"
      :class="{'c-row-flex': flex}"
      :style="{transform: 'translateX(' + offset + 'px)'}">
      <div class="c-row-left"
        :style="{transform: 'translateX(' + minOffset + 'px)'}"
        ref="left">
        <slot name="left"></slot>
      </div>
      <slot></slot>
      <c-icon class="c-row-link" v-if="link">chevron-right</c-icon>
      <div class="c-row-right"
        :style="{transform: 'translateX(' + maxOffset + 'px)'}"
        ref="right">
        <slot name="right"></slot>
      </div>
  </div>
  </div>
</template>

<script>
import CIcon from './c-icon'
import { direction } from './utils'

export default {
  props: {
    flex: {
      type: Boolean,
      default: true
    },
    link: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      offset: 0,
      minOffset: 0,
      maxOffset: 0,
      // 正在拖动
      dragging: false,
      // 符合拖动条件
      catching: false
    }
  },

  mounted () {
    const { left, right } = this.$slots
    if (left || right) {
      this.$el.parentNode.addEventListener('touchstart', this.dragstartAtParent)
      this.$el.addEventListener('touchstart', this.dragstart)
      this.$el.addEventListener('touchmove', this.drag)
      this.$el.addEventListener('touchend', this.dragend)
      this.maxOffset = right ? this.$refs.right.clientWidth : 0
      this.minOffset = left ? -this.$refs.left.clientWidth : 0
    }
  },

  methods: {
    dragstartAtParent (e) {
      if (!this.$el.contains(e.target)) {
        this.offset = 0
      }
    },
    dragstart (e) {
      if (!this.dragging && e.touches && e.touches.length === 1) {
        this.dragging = true
        this.catching = false
        this.start = e.touches[0]
        this.startX = e.touches[0].pageX - this.offset
      }
    },
    drag (e) {
      if (this.dragging) {
        if (this.catching || direction(e.touches[0], this.start) > 0) {
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
  },

  components: {
    CIcon
  }
}
</script>

<style src="styles/components/row"></style>
