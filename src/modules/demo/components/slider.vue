<template>
  <div class="d-slider">
    <c-pane>
      <p>Single slide</p>
      <c-slider
        :transition="transition">
        <div class="d-slider-item">Single Slide</div>
      </c-slider>
      <hr>
      <p>Two slides</p>
      <c-slider
        :transition="transition">
        <div class="d-slider-item">Slide First</div>
        <div class="d-slider-item">Slide Last</div>
      </c-slider>
      <hr>
      <p>Three slides</p>
      <c-slider
        :index="1"
        :transition="transition">
        <div class="d-slider-item">Slide First</div>
        <div class="d-slider-item">Slide Second</div>
        <div class="d-slider-item">Slide Last</div>
      </c-slider>
      <hr>
      <p>Getting content async</p>
      <c-slider
        :transition="transition">
        <div v-for="i in items" class="d-slider-item">Slide {{i}}</div>
      </c-slider>
      <hr>
      <p>Auto sliding, and use same index in two slides</p>
      <c-slider
        :transition="transition"
        :index="index"
        :interval="3"
        @slide="slide">
        <div v-for="i in items" class="d-slider-item">Slide {{i}}</div>
      </c-slider>
      <p>Use the same index above, with transition enabled</p>
      <c-slider
        :transition="transition"
        :index="index"
        @slide="slide">
        <div v-for="i in items" class="d-slider-item">Slide {{i}}</div>
      </c-slider>
    </c-pane>
  </div>
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

<style src="../styles/index"></style>
