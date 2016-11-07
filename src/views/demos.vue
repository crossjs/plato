<template>
  <div>
    <div class="v-demos" v-if="!$route.params.component">
      <h3>Core</h3>
      <div class="v-demos-section">
        <c-row :link="true">
          <c-col>
            <router-link to="demos/icon">
              <c-icon>flame</c-icon> Icon</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/badge">
              <c-icon>flame</c-icon> Badge</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/progress">
              <c-icon>flame</c-icon> Progress</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/button">
              <c-icon>flame</c-icon> Button</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/link">
              <c-icon class="c-reddot">flame</c-icon> Link</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/form">
              <c-icon>flame</c-icon> Form</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/row">
              <c-icon>flame</c-icon> Row</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/spinner">
              <c-icon>flame</c-icon> Spinner</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/modal">
              <c-icon>flame</c-icon> Modal</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/toast">
              <c-icon>flame</c-icon> Toast</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/image">
              <c-icon>flame</c-icon> Image</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/avatar">
              <c-icon class="c-reddot">flame</c-icon> Avatar</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/scroller">
              <c-icon>flame</c-icon> Scroller: pulling and infinite scroll</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/picker">
              <c-icon>flame</c-icon> Picker</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/range">
              <c-icon>flame</c-icon> Range</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/slider">
              <c-icon>flame</c-icon> Slider</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/swiper">
              <c-icon>flame</c-icon> Swiper</router-link>
          </c-col>
        </c-row>
      </div>
      <h3>Others</h3>
      <div class="v-demos-section">
        <c-row :link="true">
          <c-col>
            <router-link to="demos/paginator">
              <c-icon>flame</c-icon> Paginator</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demos/uploader">
              <c-icon>flame</c-icon> Uploader</router-link>
          </c-col>
        </c-row>
      </div>
    </div>
    <keep-alive v-else>
      <component :is="'demo-' + $route.params.component"></component>
    </keep-alive>
  </div>
</template>

<script>
import CRow from 'components/core/row'
import CCol from 'components/core/col'
import CIcon from 'components/core/icon'
import DemoBadge from 'demos/badge'
import DemoIcon from 'demos/icon'
import DemoProgress from 'demos/progress'
import DemoButton from 'demos/button'
import DemoLink from 'demos/link'
import DemoForm from 'demos/form'
import DemoRow from 'demos/row'
import DemoPaginator from 'demos/paginator'
import DemoSpinner from 'demos/spinner'
import DemoModal from 'demos/modal'
import DemoToast from 'demos/toast'
import DemoImage from 'demos/image'
import DemoAvatar from 'demos/avatar'
import DemoScroller from 'demos/scroller'
import DemoPicker from 'demos/picker'
import DemoRange from 'demos/range'
import DemoSlider from 'demos/slider'
import DemoSwiper from 'demos/swiper'
import DemoUploader from 'demos/uploader'

export default {
  data () {
    return {
      component: DemoIcon
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
    DemoLink,
    DemoForm,
    DemoRow,
    DemoPaginator,
    DemoSpinner,
    DemoModal,
    DemoToast,
    DemoImage,
    DemoAvatar,
    DemoScroller,
    DemoPicker,
    DemoRange,
    DemoSlider,
    DemoSwiper,
    DemoUploader
  }
}
</script>

<style src="styles/demo"></style>
