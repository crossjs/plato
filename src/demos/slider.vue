<template>
  <div class="d-slider">
    <p>Single slide</p>
    <c-slider>
      <div class="d-slider-item">1</div>
    </c-slider>
    <hr>
    <p>Getting content async</p>
    <c-slider>
      <div v-for="i in items" class="d-slider-item">{{i}}</div>
    </c-slider>
    <hr>
    <p>Auto sliding, and use same index in two slides</p>
    <c-slider
      :index="index"
      :interval="3"
      @slide="slide">
      <div v-for="i in items" class="d-slider-item">{{i}}</div>
    </c-slider>
    <c-pane>
      <c-slider
        :index="index"
        :interval="3"
        @slide="slide">
        <div v-for="i in items" class="d-slider-item">{{i}}</div>
      </c-slider>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CSlider from 'components/c-slider'

export default {
  data () {
    return {
      index: 0,
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
