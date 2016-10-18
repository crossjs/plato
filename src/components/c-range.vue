<template>
  <div class="c-range">
    <div class="c-range-content"
      :style="{'padding-left': percentage * 100 + '%'}"></div>
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
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number
    }
  },

  data () {
    return {
      offset: 0,
      minOffset: 0,
      maxOffset: 0,
      percentage: 0
    }
  },

  computed: {
    percentage () {
      const stepOffset = this.maxOffset / Math.ceil((this.max - this.min) / this.step)
      return Math.round(this.offset / stepOffset) * stepOffset / this.maxOffset
    }
  },

  watch: {
    value (val) {
      if (!this.dragging) {
        this.offset = (this.value - this.min) / (this.max - this.min) * this.maxOffset
      }
    },
    percentage (val) {
      this.$emit('change', parseInt(this.min + (this.max - this.min) * val, 10))
    }
  },

  mounted () {
    this.$el.addEventListener('touchstart', this.dragstart)
    this.$el.addEventListener('touchmove', this.drag)
    this.$el.addEventListener('touchend', this.dragend)
    this.maxOffset = this.$el.clientWidth
    const value = typeof this.value === 'number' ? this.value : this.min
    this.offset = (value - this.min) / (this.max - this.min) * this.maxOffset
  },

  methods: {
    dragstart (e) {
      if (!this.dragging && e.touches && e.touches.length === 1) {
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
      }
    }
  }
}
</script>

<style src="styles/components/range"></style>
