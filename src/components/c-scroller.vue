<template>
  <div :class="['c-scroller', cls]" :style="{'height': _height + 'px'}">
    <div class="c-scroller-container"
      :style="{transform: 'translate3d(0, ' + offset + 'px, 0)'}">
      <div class="c-scroller-indicator c-scroller-indicator-down">
        <i v-show="pull_state === 1">↓</i>
        <i v-show="pull_state === 2">↑</i>
        <c-spinner v-show="loading && pull_state === 3"></c-spinner>
      </div>
      <div class="c-scroller-content" ref="content"><slot></slot></div>
      <div class="c-scroller-indicator c-scroller-indicator-up">
        <c-spinner v-show="loading && pull_state === -3"></c-spinner>
        <i v-show="pull_state === -2">↓</i>
        <i v-show="pull_state === -1">↑</i>
      </div>
    </div>
  </div>
</template>

<script>
import CSpinner from './c-spinner'
import mBase from './mixins/base'

/* globals lib */
const { dpr } = typeof lib === 'object' ? lib.flexible : { dpr: 2 }

export default {
  mixins: [mBase],

  props: {
    height: {
      type: Number,
      default: 0
    },
    threshold: {
      type: Number,
      default: 160
    },
    loading: {
      type: Boolean,
      default: false
    },
    drained: {
      type: Boolean,
      default: false
    },
    autoPullup: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      dpr,
      minOffset: 0,
      maxOffset: 0,
      offset: 0,
      pull_state: 0,
      has_scroll: false
    }
  },

  computed: {
    _height () {
      return this.height || this._threshold
    },
    _threshold () {
      return this.threshold * dpr / 2
    }
  },

  watch: {
    loading (val) {
      if (!val) {
        this.fillContainer()
        this.relocate()
      }
    },
    drained (val) {
      if (val) {
        this.updateMinOffset()
        this.relocate()
      }
    }
  },

  mounted () {
    this.$el.addEventListener('touchstart', this.dragstart)
    this.$el.addEventListener('touchmove', this.drag)
    this.$el.addEventListener('touchend', this.dragend)
    this.fillContainer()
  },

  methods: {
    relocate () {
      this.$nextTick(() => {
        // this.pull_state = 0
        // 复位
        this.offset = this.has_scroll
          ? Math.max(this.minOffset, Math.min(this.offset, this.maxOffset))
          : this.maxOffset
      })
    },
    fillContainer () {
      if (!this.drained && this.autoPullup) {
        this.$nextTick(() => {
          this.updateMinOffset()
          if (this.minOffset > 0) {
            this.pullup()
          }
        })
      }
    },
    updateMinOffset () {
      this.minOffset = this.$el.clientHeight - this.$refs.content.clientHeight
      this.has_scroll = this.maxOffset > this.minOffset
    },
    dragstart (e) {
      if (!this.dragging && e.touches && e.touches.length === 1) {
        this.dragging = true
        // reset pull state
        this.pull_state = 0
        this.timestamp = new Date().getTime()
        // this.maxOffset = 0
        this.updateMinOffset()
        this.startY = e.touches[0].pageY - this.offset
      }
    },
    drag (e) {
      if (this.dragging) {
        e.preventDefault()
        e.stopPropagation()
        // _distance 大于零表示 pulldown
        const _distance = e.touches[0].pageY - this.startY
        const distance = Math.min(this.maxOffset + this._threshold, _distance)
        this.offset = this.has_scroll
          ? Math.max(this.minOffset - (this.drained ? 0 : this._threshold), distance)
          : _distance > 0
            ? distance
            : this.maxOffset
        if (this.offset > this.maxOffset) {
          this.pull_state = this.offset - this.maxOffset > this._threshold / 2 ? 2 : 1
        } else if (this.offset < this.minOffset) {
          if (this.has_scroll && !this.drained) {
            this.pull_state = this.minOffset - this.offset > this._threshold / 2 ? -2 : -1
          }
        }
      }
    },
    dragend (e) {
      if (this.dragging) {
        this.dragging = false
        // 开始到结束，至少要间隔 300 毫秒
        if (new Date().getTime() - this.timestamp >= 300) {
          if (this.pull_state === -2) {
            this.pullup()
            return
          }
          if (this.pull_state === 2) {
            this.pulldown()
            return
          }
        }
        this.relocate()
      }
    },
    pulldown () {
      // show loading
      this.pull_state = 3
      this.offset = this.maxOffset + this._threshold / 2
      this.$emit('pulldown')
      this.$nextTick(() => {
        if (!this.loading) {
          // this.pull_state = 0
          this.relocate()
        }
      })
    },
    pullup () {
      // show loading
      this.pull_state = -3
      this.offset = this.has_scroll
        ? this.minOffset - this._threshold / 2
        : this.maxOffset
      this.$emit('pullup')
      this.$nextTick(() => {
        if (!this.loading) {
          // this.pull_state = 0
          this.relocate()
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
