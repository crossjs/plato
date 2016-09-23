<template>
  <div :class="['c-scroller', cls]">
    <div ref="content" class="c-scroller-content"
      :style="{transform: 'translate3d(0, ' + offset + 'px, 0)'}">
      <div class="c-scroller-indicator c-scroller-indicator-down">
        <i v-show="pull_state === 1">↓</i>
        <i v-show="pull_state === 2">↑</i>
        <c-spinner v-show="loading && pull_state === 3"></c-spinner>
      </div>
      <slot></slot>
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

export default {
  mixins: [mBase],

  props: {
    threshold: {
      type: Number,
      default: 160
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      minOffset: 0,
      maxOffset: 0,
      offset: 0,
      pull_state: 0
    }
  },

  watch: {
    loading (val) {
      if (!val) {
        this.offset -= this.threshold / 2
      }
    }
  },

  mounted () {
    this.$el.addEventListener('touchstart', this._dragstart.bind(this))
    this.$el.addEventListener('touchmove', this._drag.bind(this))
    this.$el.addEventListener('touchend', this._dragend.bind(this))
  },

  methods: {
    _dragstart (e) {
      if (!this.dragging && e.touches && e.touches.length === 1) {
        this.dragging = true
        // reset pull state
        this.pull_state = 0
        this.timestamp = new Date().getTime()
        this.minOffset = this.$el.clientHeight - this.$refs.content.clientHeight + this.threshold
        this.maxOffset = 0
        this.startY = e.touches[0].pageY - this.offset
      }
    },
    _drag (e) {
      if (this.dragging) {
        const distance = e.touches[0].pageY - this.startY
        this.offset = Math.max(this.minOffset - this.threshold, Math.min(this.maxOffset + this.threshold, distance))
        if (this.offset > this.maxOffset) {
          this.pull_state = this.offset - this.maxOffset > this.threshold / 2 ? 2 : 1
        } else if (this.offset < this.minOffset) {
          this.pull_state = this.minOffset - this.offset > this.threshold / 2 ? -2 : -1
        }
      }
    },
    _dragend (e) {
      if (this.dragging) {
        this.dragging = false
        // 开始到结束，至少要间隔 300 毫秒
        if (new Date().getTime() - this.timestamp >= 300) {
          switch (this.pull_state) {
            case -2:
              this.$emit('pullup')
              // show loading
              this.pull_state = -3
              this.offset = this.minOffset - this.threshold / 2
              return
            case 2:
              this.$emit('pulldown')
              // show loading
              this.pull_state = 3
              this.offset = this.maxOffset + this.threshold / 2
              return
          }
        }
        this.pull_state = 0
        // 复位
        this.offset = Math.max(this.minOffset, Math.min(this.offset, this.maxOffset))
      }
    }
  },

  components: {
    CSpinner
  }
}
</script>

<style src="styles/components/scroller"></style>
