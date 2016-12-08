<template>
  <div>
    <div class="main" v-if="!$route.params.component">
      <h3>Core</h3>
      <div class="v-demo-section">
        <c-row :link="true">
          <c-col>
            <router-link to="demo/icon">
              <c-icon>flame</c-icon> Icon</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/badge">
              <c-icon>flame</c-icon> Badge</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/progress">
              <c-icon>flame</c-icon> Progress</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/button">
              <c-icon>flame</c-icon> Button</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/link">
              <c-icon class="c-reddot">flame</c-icon> Link</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/form">
              <c-icon>flame</c-icon> Form</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/row">
              <c-icon>flame</c-icon> Row</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/spinner">
              <c-icon>flame</c-icon> Spinner</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/modal">
              <c-icon>flame</c-icon> Modal</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/toast">
              <c-icon>flame</c-icon> Toast</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/image">
              <c-icon>flame</c-icon> Image</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/avatar">
              <c-icon class="c-reddot">flame</c-icon> Avatar</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/scroller">
              <c-icon>flame</c-icon> Scroller: pulling and infinite scroll</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/picker">
              <c-icon>flame</c-icon> Picker</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/range">
              <c-icon>flame</c-icon> Range</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/slider">
              <c-icon>flame</c-icon> Slider</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/swiper">
              <c-icon>flame</c-icon> Swiper</router-link>
          </c-col>
        </c-row>
      </div>
      <h3>Others</h3>
      <div class="v-demo-section">
        <c-row :link="true">
          <c-col>
            <router-link to="demo/paginator">
              <c-icon>flame</c-icon> Paginator</router-link>
          </c-col>
        </c-row>
        <c-row :link="true">
          <c-col>
            <router-link to="demo/uploader">
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
import DemoBadge from '../components/badge'
import DemoIcon from '../components/icon'
import DemoProgress from '../components/progress'
import DemoButton from '../components/button'
import DemoLink from '../components/link'
import DemoForm from '../components/form'
import DemoRow from '../components/row'
import DemoPaginator from '../components/paginator'
import DemoSpinner from '../components/spinner'
import DemoModal from '../components/modal'
import DemoToast from '../components/toast'
import DemoImage from '../components/image'
import DemoAvatar from '../components/avatar'
import DemoScroller from '../components/scroller'
import DemoPicker from '../components/picker'
import DemoRange from '../components/range'
import DemoSlider from '../components/slider'
import DemoSwiper from '../components/swiper'
import DemoUploader from '../components/uploader'

export default {
  data () {
    return {
      component: DemoIcon
    }
  },

  beforeRouteEnter (to, from, next) {
    document.querySelector('#content').scrollTop = 0
    next()
  },

  beforeRouteLeave (to, from, next) {
    document.querySelector('#content').scrollTop = 0
    next()
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

<style src="../styles/index" scoped></style>
