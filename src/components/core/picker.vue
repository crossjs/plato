<!-- Inspired by https://facebook.github.io/react-native/docs/picker.html -->
<template>
  <div class="c-picker"
    :style="{height: itemHeight * size + 'px'}"
    v-drag.vertical
    @dragstart="dragstart"
    @drag="drag"
    @dragend="dragend">
    <div class="c-picker-cover"
      :style="{'background-size': '100% ' + (size - 1) / 2 * itemHeight + 'px'}">
      <div class="c-picker-highlight"
        :style="{height: itemHeight + 'px', transform: 'translate3d(0, ' + ((size - 1) / 2 * itemHeight) + 'px, 0)'}"></div>
    </div>
    <div class="c-picker-content" :class="{ transition: transition && !dragging }"
      :style="{transform: 'translate3d(0, ' + offset + 'px, 0)'}"
      ref="content"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
      validator (val) {
        return val >= -1
      }
    },
    size: {
      type: Number,
      default: 7,
      validator (val) {
        return val >= 3 && val % 2 === 1
      }
    },
    transition: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      offset: 0,
      itemHeight: 0,
      // 是否有内容
      itemLength: 0,
      // when picker is dragging, remove transition effect for preventing lag
      dragging: false
    }
  },

  computed: {
    maxOffset () {
      return this.itemHeight * (this.size - 1) / 2
    },
    minOffset () {
      return this.itemHeight * ((this.size + 1) / 2 - this.itemLength)
    }
  },

  watch: {
    index () {
      this.calcOffset()
    },
    size () {
      this.calcOffset()
    }
  },

  mounted () {
    const { children } = this.$refs.content
    this.itemLength = children.length
    if (this.itemLength) {
      this.itemHeight = children[0].clientHeight
      this.calcOffset()
    }
  },

  updated () {
    const { children } = this.$refs.content
    if (this.itemLength !== children.length) {
      this.itemLength = children.length
      if (this.itemLength) {
        this.itemHeight = children[0].clientHeight
        this.calcOffset()
      } else {
        this.itemHeight = 0
        this.offset = 0
      }
    }
  },

  methods: {
    calcOffset () {
      let index = this.index
      if (this.index > this.itemLength - 1) {
        index = this.itemLength - 1
        this.$emit('change', index)
      }
      this.offset = this.itemHeight * ((this.size - 1) / 2 - index)
    },
    dragstart ({ originalEvent: e }) {
      this.startY = e.touches[0].pageY - this.offset
      this.dragging = true
    },
    drag ({ originalEvent: e }) {
      // prevent scroll
      e.preventDefault()
      e.stopPropagation()
      this.offset = Math.min(this.maxOffset, Math.max(this.minOffset, e.touches[0].pageY - this.startY))
    },
    dragend ({ originalEvent: e }) {
      this.dragging = false
      const offsetIndex = Math.max((this.size - 1) / 2 - this.itemLength, Math.round(this.offset / this.itemHeight))
      this.offset = this.itemHeight * offsetIndex
      const index = (this.size - 1) / 2 - offsetIndex
      if (index !== this.index) {
        this.$emit('change', index)
      }
    }
  }
}
</script>

<style src="./styles/picker"></style>
