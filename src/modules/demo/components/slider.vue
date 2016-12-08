<template>
  <c-pane class="main">
    <p>Single slide</p>
    <c-slider
      :transition="transition">
      <div class="slider-item">Single Slide</div>
    </c-slider>
    <hr>
    <p>Two slides</p>
    <c-slider
      :transition="transition">
      <div class="slider-item">Slide First</div>
      <div class="slider-item">Slide Last</div>
    </c-slider>
    <hr>
    <p>Three slides</p>
    <c-slider
      :index="1"
      :transition="transition">
      <div class="slider-item">Slide First</div>
      <div class="slider-item">Slide Second</div>
      <div class="slider-item">Slide Last</div>
    </c-slider>
    <hr>
    <p>Getting content async</p>
    <c-slider
      :transition="transition">
      <div v-for="i in items" class="slider-item">Slide {{i}}</div>
    </c-slider>
    <hr>
    <p>Auto sliding, and use same index in two slides</p>
    <c-slider
      :transition="transition"
      :index="index"
      :interval="3"
      @slide="slide">
      <div v-for="i in items" class="slider-item">Slide {{i}}</div>
    </c-slider>
    <p>Use the same index above, with transition enabled</p>
    <c-slider
      :transition="transition"
      :index="index"
      @slide="slide">
      <div v-for="i in items" class="slider-item">Slide {{i}}</div>
    </c-slider>
  </c-pane>
</template>

<script>
import CPane from 'components/core/pane'
import CSlider from 'components/core/slider'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      index: 1,
      items: ''
    }
  },

  computed: mapGetters(['transition']),

  mounted () {
    setTimeout(() => {
      this.items = 10
    }, 500)
  },

  methods: {
    slide (index) {
      this.index = index
    }
  },

  components: {
    CPane,
    CSlider
  }
}
</script>

<style scoped>
.c-slider {
  height: dpr(200px);
}

.slider-item {
  text-align: center;
  line-height: dpr(160px);
  color: white;
  font-size: dpr(60px);

  &:only-child {
    line-height: dpr(200px);
  }

  &:nth-child(5n+1) {
    background: var(--primary);
  }

  &:nth-child(5n+2) {
    background: color(var(--primary) hue(+20));
  }

  &:nth-child(5n+3) {
    background: color(var(--primary) hue(+40));
  }

  &:nth-child(5n+4) {
    background: color(var(--primary) hue(+60));
  }

  &:nth-child(5n) {
    background: color(var(--primary) hue(+80));
  }
}
</style>
