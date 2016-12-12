<template>
  <div class="c-scroller"
    :style="{height: height + 'px'}"
    v-drag.vertical
    @dragstart="dragstart"
    @drag="drag"
    @dragend="dragend">
    <div class="c-scroller-container"
      :style="{height: Math.max(maxHeight, height) + 1 + 'px'}">
      <div class="c-scroller-content"
        :class="{transition : transition}"
        :style="{transform: 'translate3d(0, ' + offset + 'px, 0)'}"
        ref="content">
        <div class="c-scroller-indicator c-scroller-indicator-down"
          ref="indicator">
          <slot name="pulldown"
            :downGo="downGo"
            :downReady="downReady"
            :downAwaiting="downAwaiting">
            <c-icon v-if="downReady" class="down-ready">arrow-small-down</c-icon>
            <c-icon v-else-if="downGo" class="down-go">arrow-small-up</c-icon>
            <c-spinner v-else-if="downAwaiting"></c-spinner>
          </slot>
        </div>
        <slot></slot>
        <div class="c-scroller-indicator c-scroller-indicator-up">
          <slot name="pullup"
            :upGo="upGo"
            :upReady="upReady"
            :upAwaiting="upAwaiting">
            <c-icon v-if="upReady" class="up-ready">arrow-small-down</c-icon>
            <c-icon v-else-if="upGo" class="up-go">arrow-small-up</c-icon>
            <c-spinner v-else-if="upAwaiting"></c-spinner>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CIcon from './icon'
import CSpinner from './spinner'

const STATE_IDLE = 0
const STATE_DOWN_GO = 2
const STATE_DOWN_READY = 1
const STATE_DOWN_AWAITING = 3
const STATE_UP_GO = -2
const STATE_UP_READY = -1
const STATE_UP_AWAITING = -3

export default {
  props: {
    height: {
      type: Number,
      default: 0
    },
    bounce: {
      type: Number,
      default: 1.25
    },
    loading: {
      type: Boolean,
      default: false
    },
    // all loaded
    drained: {
      type: Boolean,
      default: false
    },
    // auto load while reach bottom
    infinite: {
      type: Boolean,
      default: false
    },
    // auto load while container is not full
    autoFill: {
      type: Boolean,
      default: true
    },
    transition: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      offset: 0,
      // 推拉状态
      pullState: STATE_IDLE,
      maxHeight: 0
    }
  },

  computed: {
    downGo () {
      return this.pullState === STATE_DOWN_GO
    },
    downReady () {
      return this.pullState === STATE_DOWN_READY
    },
    downAwaiting () {
      return this.loading && this.pullState === STATE_DOWN_AWAITING
    },
    upGo () {
      return !this.infinite && this.pullState === STATE_UP_GO
    },
    upReady () {
      return !this.infinite && this.pullState === STATE_UP_READY
    },
    upAwaiting () {
      return this.loading && this.pullState === STATE_UP_AWAITING
    }
  },

  watch: {
    loading (val) {
      if (!val) {
        this.fill()
        this.reset()
      }
    },
    drained (val) {
      if (val) {
        this.update()
        this.reset()
      }
    }
  },

  mounted () {
    // 溢出距离
    this.maxScroll = 0
    // 临界阈值
    this.threshold = this.$refs.indicator.clientHeight * this.bounce
    this.fill()
  },

  methods: {
    // reset postion
    reset () {
      this.$nextTick(() => {
        // 复位
        this.offset = 0
      })
    },
    // fill content automatically
    fill () {
      this.$nextTick(() => {
        this.update()
        if (!this.drained && this.autoFill && !this.maxScroll) {
          this.pullup()
        }
      })
    },
    // update min offset and maxScroll state
    update () {
      this.maxHeight = this.$refs.content.clientHeight
      this.maxScroll = Math.max(0, this.maxHeight - this.height)
    },
    dragstart ({ originalEvent: e }) {
      // reset pull state
      this.pullState = STATE_IDLE
      this.startY = e.touches[0].pageY - this.offset
    },
    drag ({ originalEvent: e }) {
      // 无限模式 + 上拉状态
      if (this.infinite && this.pullState === STATE_UP_AWAITING) {
        return
      }
      const _distance = e.touches[0].pageY - this.startY
      const isDown = _distance > 0 && this.$el.scrollTop === 0
      const isUp = _distance < 0 && this.$el.scrollTop >= this.maxScroll
      if (!isDown && !isUp) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      const distance = Math.min(this.threshold, _distance)
      this.offset = this.maxScroll
        ? Math.max(this.drained ? 0 : -this.threshold, distance)
        : isDown ? distance : 0
      if (this.pullState < STATE_DOWN_AWAITING &&
          this.pullState > STATE_UP_AWAITING) {
        if (this.offset > 0) {
          // pulldown
          this.pullState = this.offset > this.threshold / this.bounce ? STATE_DOWN_GO : STATE_DOWN_READY
        } else if (this.offset < 0) {
          // pullup
          if (!this.drained) {
            if (this.maxScroll) {
              this.pullState = -this.offset > this.threshold / this.bounce ? STATE_UP_GO : STATE_UP_READY
            }
            if (this.infinite && this.pullState === STATE_UP_READY) {
              this.pullup()
            }
          }
        }
      }
    },
    dragend ({ originalEvent: e }) {
      if (this.infinite) {
        if (this.pullState < STATE_IDLE) {
          return
        }
      }
      if (this.pullState === STATE_UP_GO) {
        this.pullup()
        return
      }
      if (this.pullState === STATE_DOWN_GO) {
        this.pulldown()
        return
      }
      this.reset()
    },
    pulldown () {
      this.pullState = STATE_DOWN_AWAITING
      this.offset = this.threshold / this.bounce
      this.$emit('pulldown')
      this.$nextTick(() => {
        // 如果外部未处理 pulldown，则重置
        if (!this.loading) {
          this.reset()
        }
      })
    },
    pullup () {
      this.pullState = STATE_UP_AWAITING
      this.offset = this.maxScroll ? -this.threshold / this.bounce : 0
      this.$emit('pullup')
      this.$nextTick(() => {
        // 如果外部未处理 pullup，则重置
        if (!this.loading) {
          this.reset()
        }
      })
    }
  },

  components: {
    CIcon,
    CSpinner
  }
}
</script>

<style src="./styles/scroller"></style>
