<template>
  <div class="c-slider"
    v-drag.horizontal
    @dragstart="dragstart"
    @drag="drag"
    @dragend="dragend">
    <div class="c-slider-content"
      :class="{transition: transition && !dragging & !slideReady}"
      :style="{transform: 'translate3d(' + offset + 'px, 0, 0 )'}"
      @transitionend="transitionEnd"
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
    // 如果启用，延迟 200ms
    transition: {
      type: Boolean,
      default: true
    },
    // 灵敏度，数值越大，短距离快速滑动时越容易触发切换
    sensitivity: {
      type: Number,
      default: 0.2
    }
  },

  data () {
    return {
      slideCount: 0,
      currIndex: 0,
      offset: 0,
      dragging: false,
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
      if (this.slideCount) {
        old !== -1 && this.children[old].classList.remove(classes.prev)
        val !== -1 && this.children[val].classList.add(classes.prev)
      }
    },
    currIndex (val, old) {
      if (this.slideCount) {
        old !== -1 && this.children[old].classList.remove(classes.active)
        val !== -1 && this.children[val].classList.add(classes.active)
      }
    },
    nextIndex (val, old) {
      if (this.slideCount) {
        old !== -1 && this.children[old].classList.remove(classes.next)
        val !== -1 && this.children[val].classList.add(classes.next)
      }
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
            if (!this.dragging && this.slideCount > 1) {
              this.slideReady = false
              this.offset = this.minOffset
              this.delay(this.nextIndex)
            }
          }, this.interval * 1000)
        }
      } else {
        if (this.intervalId) {
          clearInterval(this.intervalId)
        }
      }
    },
    ensurePrev () {
      const { classList } = this.children[this.prevIndex]
      classList.add(classes.prev)
      classList.remove(classes.next)
    },
    ensureNext () {
      const { classList } = this.children[this.nextIndex]
      classList.add(classes.next)
      classList.remove(classes.prev)
    },
    dragstart ({ originalEvent: e }) {
      if (this.slideCount <= 1) {
        return
      }
      // this.dragging = true
      this.isHorizontal = false
      this.slideReady = false
      // fix e.touches bug in iOS 8.1.3
      this.start = {
        pageX: e.touches[0].pageX,
        pageY: e.touches[0].pageY
      }
      this.startX = e.touches[0].pageX - this.offset
    },
    drag ({ originalEvent: e }) {
      // only slide while swipe horizontal
      this.dragging = true
      // get timeStamp when touchmove triggered, not touchstart
      this.timeStamp = e.timeStamp
      this.isHorizontal = true
      e.preventDefault()
      e.stopPropagation()
      const offset = Math.min(this.maxOffset, Math.max(this.minOffset, e.touches[0].pageX - this.startX))
      // reset prev/next if direction is changed
      if (this.offset === 0 || offset * this.offset < -1) {
        if (offset < 0) {
          this.ensureNext()
        } else if (offset > 0) {
          this.ensurePrev()
        }
      }
      this.offset = offset
    },
    dragend ({ originalEvent: e }) {
      this.dragging = false
      this.isHorizontal = false
      // calculate distance for quick swiping
      const distance = this.offset / (e.timeStamp - this.timeStamp) * 1000 * this.sensitivity
      if (this.offset > 0) {
        if (Math.max(distance, this.offset) > this.maxOffset / 2) {
          this.offset = this.maxOffset
          this.delay(this.prevIndex)
          return
        }
      } else if (this.offset < 0) {
        if (Math.min(distance, this.offset) < this.minOffset / 2) {
          this.offset = this.minOffset
          this.delay(this.nextIndex)
          return
        }
      }
      this.offset = 0
      this.delay(this.currIndex)
    },
    delay (index) {
      if (this.transition) {
        // for transitionEnd
        this.toIndex = index
      } else {
        this.go(index)
      }
    },
    transitionEnd () {
      this.go(this.toIndex)
    },
    go (index) {
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

<style src="./styles/slider"></style>
