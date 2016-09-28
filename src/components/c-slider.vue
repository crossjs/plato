<template>
  <div :class="['c-slider', cls]">
    <div class="c-slider-content" ref="content"
      :style="{transform: 'translateX(' + (offset - currIndex * maxOffset) + 'px)'}">
      <slot></slot>
    </div>
    <div class="c-slider-indicators" v-if="size > 1">
      <i class="c-slider-indicator"
        :class="{active: i - 1 === currIndex}"
        v-for="i in size"></i>
    </div>
  </div>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase],

  props: {
    index: {
      type: Number,
      default: 0,
      validator (val) {
        return val >= 0
      }
    }
  },

  data () {
    return {
      size: 0,
      offset: 0,
      minOffset: 0,
      maxOffset: 0,
      currIndex: 0
    }
  },

  computed: {
    prev () {
      return this.children[(this.size + this.currIndex - 1) % this.size]
    },
    curr () {
      return this.children[this.currIndex]
    },
    next () {
      return this.children[(this.size + this.currIndex + 1) % this.size]
    }
  },

  mounted () {
    this.$el.addEventListener('touchstart', this.dragstart)
    this.$el.addEventListener('touchmove', this.drag)
    this.$el.addEventListener('touchend', this.dragend)
    this.currIndex = this.index
    this.resetPosition()
  },

  updated () {
    if (this.size !== this.$refs.content.children.length) {
      this.resetPosition()
    }
  },

  watch: {
    index (val) {
      this.currIndex = val
    },
    offset (val) {
      if (this.currIndex === 0) {
        if (val > 0) {
          this.prev.style.transform = 'translateX(-100%)'
        }
      } else if (this.currIndex === this.size - 1) {
        if (val < 0) {
          this.next.style.transform = 'translateX(' + this.size * 100 + '%)'
        }
      }
    }
  },

  methods: {
    resetPosition () {
      this.offset = 0
      this.maxOffset = this.$el.clientWidth
      this.minOffset = -this.maxOffset
      this.children = this.$refs.content.children
      this.size = this.children.length
      if (this.size) {
        [].forEach.call(this.children, (child, currIndex) => {
          child.style.transform = 'translateX(' + currIndex * 100 + '%)'
        })
      }
    },
    dragstart (e) {
      if (this.size > 1 && !this.dragging && e.touches && e.touches.length === 1) {
        this.dragging = true
        this.startY = e.touches[0].pageX - this.offset
      }
    },
    drag (e) {
      if (this.dragging) {
        e.preventDefault()
        e.stopPropagation()
        this.offset = Math.min(this.maxOffset, Math.max(this.minOffset, e.touches[0].pageX - this.startY))
      }
    },
    dragend (e) {
      if (this.dragging) {
        this.dragging = false
        if (this.offset > 0) {
          if (this.offset > this.maxOffset / 2) {
            this.currIndex = (this.size + this.currIndex - 1) % this.size
            this.$emit('slide', this.currIndex)
          }
        } else {
          if (this.offset < this.minOffset / 2) {
            this.currIndex = (this.size + this.currIndex + 1) % this.size
            this.$emit('slide', this.currIndex)
          }
        }
        this.resetPosition()
      }
    }
  }
}
</script>

<style src="styles/components/slider"></style>
