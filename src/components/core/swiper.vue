<template>
  <div class="c-swiper"
    :class="{transition: transition}"
    :style="{transform: 'translate3d(' + offset + 'px, 0, 0)'}"
    v-drag.horizontal
    @dragstart="dragstart"
    @drag="drag"
    @dragend="dragend"
    v-tap
    @tap="onTap">
    <div class="c-swiper-left" ref="left">
      <slot name="left"></slot>
    </div>
    <div class="c-swiper-body">
      <slot></slot>
    </div>
    <div class="c-swiper-right" ref="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transition: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      offset: 0,
      minOffset: 0,
      maxOffset: 0
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
    dragstart ({ originalEvent: e }) {
      this.reset()
      this.startX = e.touches[0].pageX - this.offset
    },
    drag ({ originalEvent: e }) {
      e.preventDefault()
      e.stopPropagation()
      this.offset = Math.min(this.maxOffset, Math.max(this.minOffset, e.touches[0].pageX - this.startX))
    },
    dragend ({ originalEvent: e }) {
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
</script>

<style src="./styles/swiper"></style>
