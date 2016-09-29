<template>
  <div :class="['c-scroller', cls]"
    :style="{'height': height + 'px'}">
    <div class="c-scroller-container"
      :style="{transform: 'translate3d(0, ' + offset + 'px, 0)'}">
      <div class="c-scroller-indicator c-scroller-indicator-down"
        ref="indicator">
        <template v-if="pulling === 2"><slot name="down-go"><i>↑</i></slot></template>
        <template v-if="pulling === 1"><slot name="down-ready"><i>↓</i></slot></template>
        <c-spinner v-if="loading && pulling === 3"></c-spinner>
      </div>
      <div class="c-scroller-content"
        ref="content"><slot></slot></div>
      <div class="c-scroller-indicator c-scroller-indicator-up">
        <c-spinner v-if="loading && pulling === -3"></c-spinner>
        <template v-if="pulling === -1"><slot name="up-ready"><i>↑</i></slot></template>
        <template v-if="pulling === -2"><slot name="up-go"><i>↓</i></slot></template>
      </div>
    </div>
  </div>
</template>

<script>
import CSpinner from './c-spinner'
import mBase from './mixins/base'

export default {
  mixins: [mBase],

  props: {
    height: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    drained: {
      type: Boolean,
      default: false
    },
    autoFill: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      offset: 0,
      minOffset: 0,
      maxOffset: 0,
      // 临界阈值
      threshold: 0,
      // 推拉状态
      pulling: 0,
      // 是否溢出
      overflow: false
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
    this.$el.addEventListener('touchstart', this.dragstart)
    this.$el.addEventListener('touchmove', this.drag)
    this.$el.addEventListener('touchend', this.dragend)
    this.threshold = this.$refs.indicator.clientHeight * 2
    this.fill()
  },

  methods: {
    // reset postion
    reset () {
      this.$nextTick(() => {
        // 复位
        this.offset = this.overflow
          ? Math.max(this.minOffset, Math.min(this.offset, this.maxOffset))
          : this.maxOffset
      })
    },
    // fill content automatically
    fill () {
      if (!this.drained && this.autoFill) {
        this.$nextTick(() => {
          this.update()
          if (this.minOffset > 0) {
            this.pullup()
          }
        })
      }
    },
    // update min offset and overflow state
    update () {
      this.minOffset = this.$el.clientHeight - this.$refs.content.clientHeight
      this.overflow = this.maxOffset > this.minOffset
    },
    dragstart (e) {
      if (!this.dragging && e.touches && e.touches.length === 1) {
        this.dragging = true
        // reset pull state
        this.pulling = 0
        this.timestamp = new Date().getTime()
        this.update()
        this.startY = e.touches[0].pageY - this.offset
      }
    },
    drag (e) {
      if (this.dragging) {
        e.preventDefault()
        e.stopPropagation()
        // _distance 大于零表示 pulldown
        const _distance = e.touches[0].pageY - this.startY
        const distance = Math.min(this.maxOffset + this.threshold, _distance)
        this.offset = this.overflow
          ? Math.max(this.minOffset - (this.drained ? 0 : this.threshold), distance)
          : _distance > 0
            ? distance
            : this.maxOffset
        if (this.offset > this.maxOffset) {
          this.pulling = this.offset - this.maxOffset > this.threshold / 2 ? 2 : 1
        } else if (this.offset < this.minOffset) {
          if (this.overflow && !this.drained) {
            this.pulling = this.minOffset - this.offset > this.threshold / 2 ? -2 : -1
          }
        }
      }
    },
    dragend (e) {
      if (this.dragging) {
        this.dragging = false
        // 开始到结束，至少要间隔 300 毫秒
        if (new Date().getTime() - this.timestamp >= 300) {
          if (this.pulling === -2) {
            return this.pullup()
          }
          if (this.pulling === 2) {
            return this.pulldown()
          }
        }
        this.reset()
      }
    },
    pulldown () {
      // show loading
      this.pulling = 3
      this.offset = this.maxOffset + this.threshold / 2
      this.$emit('pulldown')
      this.$nextTick(() => {
        if (!this.loading) {
          // this.pulling = 0
          this.reset()
        }
      })
    },
    pullup () {
      // show loading
      this.pulling = -3
      this.offset = this.overflow
        ? this.minOffset - this.threshold / 2
        : this.maxOffset
      this.$emit('pullup')
      this.$nextTick(() => {
        if (!this.loading) {
          // this.pulling = 0
          this.reset()
        }
      })
    }
  },

  components: {
    CSpinner
  }
}
</script>

<style src="styles/components/scroller"></style>
