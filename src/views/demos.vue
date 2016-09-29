<template>
  <div>
    <div class="v-demos" v-if="!$route.params.component">
      <c-row>
        <c-col>
          <router-link class="link" to="demos/icon">
            <c-icon>flame</c-icon> Icon</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/badge">
            <c-icon>flame</c-icon> Badge</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/progress">
            <c-icon>flame</c-icon> Progress</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/button">
            <c-icon>flame</c-icon> Button</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/form">
            <c-icon>flame</c-icon> Form</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/row">
            <c-icon>flame</c-icon> Row</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/paginator">
            <c-icon>flame</c-icon> Paginator</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/spinner">
            <c-icon>flame</c-icon> Spinner</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/modal">
            <c-icon>flame</c-icon> Modal</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/toast">
            <c-icon>flame</c-icon> Toast</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/image">
            <c-icon>flame</c-icon> Image</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/scroller">
            <c-icon>flame</c-icon> Scroller: pulldown, pullup, and infinite scroll</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/picker">
            <c-icon>flame</c-icon> Picker</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/range">
            <c-icon>flame</c-icon> Range</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/slider">
            <c-icon>flame</c-icon> Slider</router-link>
        </c-col>
      </c-row>
    </div>
    <component v-else :is="'demo-' + $route.params.component"></component>
  </div>
</template>

<script>
import CRow from 'components/c-row'
import CCol from 'components/c-col'
import CIcon from 'components/c-icon'
import DemoBadge from 'demos/badge'
import DemoIcon from 'demos/icon'
import DemoProgress from 'demos/progress'
import DemoButton from 'demos/button'
import DemoForm from 'demos/form'
import DemoRow from 'demos/row'
import DemoPaginator from 'demos/paginator'
import DemoSpinner from 'demos/spinner'
import DemoModal from 'demos/modal'
import DemoToast from 'demos/toast'
import DemoImage from 'demos/image'
import DemoScroller from 'demos/scroller'
import DemoPicker from 'demos/picker'
import DemoRange from 'demos/range'
import DemoSlider from 'demos/slider'

export default {
  data () {
    return {
      component: DemoButton
    }
  },

  components: {
    CRow,
    CCol,
    CIcon,
    DemoBadge,
    DemoIcon,
    DemoProgress,
    DemoButton,
    DemoForm,
    DemoRow,
    DemoPaginator,
    DemoSpinner,
    DemoModal,
    DemoToast,
    DemoImage,
    DemoScroller,
    DemoPicker,
    DemoRange,
    DemoSlider
  }
}
</script>

<style src="styles/demo"></style>
