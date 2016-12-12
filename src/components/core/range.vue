<template>
  <div class="c-range"
    :class="{disabled: disabled}"
    v-drag.horizontal
    @dragstart="dragstart"
    @drag="drag">
    <div class="c-range-content"
      :style="{width: '' + (percent * 100) + '%'}"></div>
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      offset: 0,
      maxOffset: 0
    }
  },

  computed: {
    range () {
      return this.max - this.min
    },
    stepOffset () {
      return this.maxOffset / Math.ceil(this.range / this.step)
    },
    percent () {
      return this.offset / this.maxOffset
    }
  },

  watch: {
    value () {
      this.calcOffset()
    }
  },

  mounted () {
    this.maxOffset = this.$el.clientWidth
    this.calcOffset()
  },

  methods: {
    calcOffset () {
      this.offset = typeof this.value === 'number' ? (this.value - this.min) / this.range * this.maxOffset : 0
    },
    dragstart ({ originalEvent: e }) {
      if (!this.disabled) {
        this.startX = e.touches[0].pageX - this.offset
      }
    },
    drag ({ originalEvent: e }) {
      if (!this.disabled) {
        this.offset = Math.round(Math.min(this.maxOffset, Math.max(0, e.touches[0].pageX - this.startX)) / this.stepOffset) * this.stepOffset
        this.$emit('change', parseInt(this.min + this.range * this.percent, 10))
      }
    }
  }
}
</script>

<style src="./styles/range"></style>
