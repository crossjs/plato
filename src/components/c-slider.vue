<template>
  <div :class="['c-slider', cls]">
    <div :class="['c-slider-content', (dragging || ready) ? null : 'transition']"
      :style="{transform: 'translateX(' + (offset - currIndex * maxOffset) + 'px)'}"
      ref="content">
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
    },
    interval: {
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
      currIndex: 0,
      intervalId: 0,
      dragging: false,
      ready: false
    }
  },

  mounted () {
    this.$el.addEventListener('touchstart', this.dragstart)
    this.$el.addEventListener('touchmove', this.drag)
    this.$el.addEventListener('touchend', this.dragend)
    this.currIndex = this.index
    this.reset()
    this.arrange()
    this.automate()
  },

  updated () {
    if (this.size !== this.$refs.content.children.length) {
      this.reset()
      this.arrange()
    }
  },

  watch: {
    index (val) {
      this.ready = true
      this.$nextTick(() => {
        this.currIndex = val
      })
    },
    interval () {
      this.automate()
    },
    ready () {
      this.arrange()
    }
  },

  methods: {
    reset () {
      this.offset = 0
      this.maxOffset = this.$el.clientWidth
      this.minOffset = -this.maxOffset
      this.children = this.$refs.content.children
      this.size = this.children.length
      if (this.size > 1) {
        [].forEach.call(this.children, (child, index) => {
          child.style.transform = 'translateX(' + index * 100 + '%)'
        })
      }
    },
    arrange () {
      if (this.size > 1) {
        if (this.ready) {
          this.children[0].style.transform = 'translateX(0%)'
          this.children[this.size - 1].style.transform = 'translateX(' + (this.size - 1) * 100 + '%)'
        } else {
          if (this.currIndex === 0) {
            this.children[this.size - 1].style.transform = 'translateX(-100%)'
          } else if (this.currIndex === this.size - 1) {
            this.children[0].style.transform = 'translateX(' + this.size * 100 + '%)'
          }
        }
      }
    },
    automate () {
      if (this.interval) {
        if (!this.intervalId) {
          this.intervalId = setInterval(() => {
            if (!this.dragging && this.size > 1) {
              this.offset = this.minOffset
              this.next()
            }
          }, this.interval * 1000)
        }
      } else {
        if (this.intervalId) {
          clearInterval(this.intervalId)
        }
      }
    },
    dragstart (e) {
      if (this.size > 1 && !this.dragging && e.touches && e.touches.length === 1) {
        this.dragging = true
        this.ready = false
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
            this.offset = this.maxOffset
            return this.prev()
          }
        } else {
          if (this.offset < this.minOffset / 2) {
            this.offset = this.minOffset
            return this.next()
          }
        }
        this.offset = 0
        this.go(this.currIndex)
      }
    },
    go (index) {
      this.ready = false
      setTimeout(() => {
        this.offset = 0
        if (index !== this.currIndex) {
          this.currIndex = index
          this.$emit('slide', this.currIndex)
        }
        this.ready = true
      }, 250)
    },
    prev () {
      this.go((this.size + this.currIndex - 1) % this.size)
    },
    next () {
      this.go((this.currIndex + 1) % this.size)
    }
  }
}
</script>

<style src="styles/components/slider"></style>
