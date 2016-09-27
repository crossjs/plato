<template>
  <div>
    <div class="v-demos" v-if="!$route.params.component">
      <c-row>
        <c-col>
          <router-link class="link" to="demos/icon">
            <c-icon>github</c-icon> icon</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/progress">
            <c-icon>github</c-icon> progress</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/button">
            <c-icon>github</c-icon> button</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/form">
            <c-icon>github</c-icon> form</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/row">
            <c-icon>github</c-icon> row</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/paginator">
            <c-icon>github</c-icon> paginator</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/spinner">
            <c-icon>github</c-icon> spinner</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/modal">
            <c-icon>github</c-icon> modal</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/toast">
            <c-icon>github</c-icon> toast</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/image">
            <c-icon>github</c-icon> image</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/scroller">
            <c-icon>github</c-icon> scroller</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/picker">
            <c-icon>github</c-icon> picker</router-link>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <router-link class="link" to="demos/range">
            <c-icon>github</c-icon> range</router-link>
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
    DemoRange
  }
}
</script>

<style src="styles/demo"></style>
