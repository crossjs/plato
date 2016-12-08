<template>
  <div class="main">
    <c-row :flex="false">
      <c-swiper
        :transition="transition">
        <c-button
          slot="left"
          class="primary squared">Left</c-button>
        <div class="padding">Swipe right</div>
      </c-swiper>
    </c-row>
    <c-row :flex="false">
      <c-swiper
        :transition="transition">
        <div class="padding">Swipe left</div>
        <c-button
          slot="right"
          class="primary squared">Right</c-button>
      </c-swiper>
    </c-row>
    <c-row :flex="false">
      <c-swiper
        :transition="transition">
        <c-button
          slot="left"
          class="primary squared">Left</c-button>
        <div class="padding">Swipe left/right</div>
        <c-button
          slot="right"
          class="primary squared">Right</c-button>
      </c-swiper>
    </c-row>
  </div>
</template>

<script>
import CRow from 'components/core/row'
import CButton from 'components/core/button'
import CSwiper from 'components/core/swiper'
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['transition']),

  components: {
    CRow,
    CButton,
    CSwiper
  }
}
</script>

<style scoped>
.c-button {
  height: 100%;
}
</style>
