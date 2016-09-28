<template>
  <div class="d-slider">
    <p>Use same index in two slides</p>
    <c-slider
      :index="index"
      @slide="slide">
      <div class="d-slider-item">sync: 1</div>
      <div class="d-slider-item">sync: 2</div>
      <div class="d-slider-item">sync: 3</div>
    </c-slider>
    <c-pane>
      <c-slider
        :index="index"
        @slide="slide">
        <div class="d-slider-item">sync: one</div>
        <div class="d-slider-item">sync: two</div>
        <div class="d-slider-item">sync: three</div>
      </c-slider>
    </c-pane>
    <hr>
    <p>Single slide</p>
    <c-slider>
      <div class="d-slider-item">1</div>
    </c-slider>
    <hr>
    <p>Getting content async</p>
    <c-slider>
      <div v-for="i in items" class="d-slider-item">{{i}}</div>
    </c-slider>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CSlider from 'components/c-slider'

export default {
  data () {
    return {
      index: 1,
      items: ''
    }
  },

  mounted () {
    setTimeout(() => {
      this.items = 5
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

<style src="styles/demo"></style>
