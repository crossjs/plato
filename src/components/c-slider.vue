<template>
  <div class="c-slider"
    @touchstart="dragstart"
    @touchmove="dragging"
    @touchend="dragend">
    <div class="c-slider-content"
      :class="{transition: transition && !isDragging & !slideReady}"
      :style="{transform: 'translateX(' + offset + 'px)'}"
      ref="content">
      <slot></slot>
    </div>
    <div class="c-slider-indicators" v-if="slideCount > 1">
      <i class="c-slider-indicator"
        v-for="i in slideCount"
        :class="{active: i - 1 === currIndex}"></i>
    </div>
  </div>
</template>

<script>
const classes = {
  prev: 'c-slider-prev',
  active: 'c-slider-active',
  next: 'c-slider-next'
}
export default {
  props: {
    index: {
      type: Number,
      default: 0,
      validator (val) {
        return val >= 0
      }
    },
    // 自动播放间隔秒数
    interval: {
      type: Number,
      default: 0,
      validator (val) {
        return val >= 0
      }
    },
    transition: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      slideCount: 0,
      currIndex: 0,
      offset: 0,
      // 如果不需要响应式，就不要放在 data 里？
      // minOffset: 0,
      // maxOffset: 0,
      isDragging: false,
      // 就位，已经切换到目标位置，指示可以进行后续操作，比如重设位置
      slideReady: false
    }
  },

  computed: {
    prevIndex () {
      return this.slideCount ? (this.slideCount + this.currIndex - 1) % this.slideCount : -1
    },
    nextIndex () {
      return this.slideCount ? (this.currIndex + 1) % this.slideCount : -1
    }
  },

  mounted () {
    this.currIndex = this.index
    this.reset()
    this.automate()
  },

  updated () {
    this.reset()
  },

  watch: {
    index (val) {
      this.currIndex = val
    },
    prevIndex (val, old) {
      this.slideCount && old !== -1 && this.children[old].classList.remove(classes.prev)
      this.slideCount && val !== -1 && this.children[val].classList.add(classes.prev)
    },
    currIndex (val, old) {
      // this.slideReady = true
      this.slideCount && this.children[old].classList.remove(classes.active)
      this.slideCount && this.children[val].classList.add(classes.active)
    },
    nextIndex (val, old) {
      this.slideCount && old !== -1 && this.children[old].classList.remove(classes.next)
      this.slideCount && val !== -1 && this.children[val].classList.add(classes.next)
    },
    interval () {
      this.automate()
    }
  },

  methods: {
    reset () {
      if (this.maxOffset === 0 || this.slideCount !== this.$refs.content.children.length) {
        this.offset = 0
        this.maxOffset = this.$el.clientWidth
        this.minOffset = -this.maxOffset
        this.children = this.$refs.content.children
        this.slideCount = this.children.length
        if (this.slideCount) {
          this.children[this.currIndex].classList.add(classes.active)
        }
      }
    },
    automate () {
      if (this.interval) {
        if (!this.intervalId) {
          this.intervalId = setInterval(() => {
            if (!this.isDragging && this.slideCount > 1) {
              this.offset = this.minOffset
              this.go(this.nextIndex)
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
      if (this.slideCount > 1 && !this.isDragging && e.touches && e.touches.length === 1) {
        this.isDragging = true
        this.slideReady = false
        this.startY = e.touches[0].pageX - this.offset
      }
    },
    dragging (e) {
      if (this.isDragging) {
        e.preventDefault()
        e.stopPropagation()
        const offset = Math.min(this.maxOffset, Math.max(this.minOffset, e.touches[0].pageX - this.startY))
        if (this.offset === 0 || offset * this.offset < -1) {
          if (offset < 0) {
            this.children[this.nextIndex].classList.remove(classes.prev)
          } else if (offset > 0) {
            this.children[this.prevIndex].classList.remove(classes.next)
          }
        }
        this.offset = offset
      }
    },
    dragend (e) {
      if (this.isDragging) {
        this.isDragging = false
        if (this.offset > 0) {
          if (this.offset > this.maxOffset / 2) {
            this.offset = this.maxOffset
            return this.go(this.prevIndex)
          }
        } else {
          if (this.offset < this.minOffset / 2) {
            this.offset = this.minOffset
            return this.go(this.nextIndex)
          }
        }
        this.offset = 0
        this.go(this.currIndex)
      }
    },
    go (index) {
      this.slideReady = false
      this.$nextTick(() => {
        this.offset = 0
        if (index !== this.currIndex) {
          this.currIndex = index
          this.$emit('slide', this.currIndex)
        }
        this.slideReady = true
      })
    }
  }
}
</script>

<style src="styles/components/slider"></style>
