<template>
  <div class="v-components">
    <template v-if="!$route.params.component">
      <c-row>
        <router-link class="col link" to="demos/icon">
          <c-icon>github</c-icon> icon</router-link>
      </c-row>
      <c-row>
        <router-link class="col link" to="demos/progress">
          <c-icon>github</c-icon> progress</router-link>
      </c-row>
      <c-row>
        <router-link class="col link" to="demos/button">
          <c-icon>github</c-icon> button</router-link>
      </c-row>
      <c-row>
        <router-link class="col link" to="demos/form">
          <c-icon>github</c-icon> form</router-link>
      </c-row>
      <c-row>
        <router-link class="col link" to="demos/row">
          <c-icon>github</c-icon> row</router-link>
      </c-row>
      <c-row>
        <router-link class="col link" to="demos/paginator">
          <c-icon>github</c-icon> paginator</router-link>
      </c-row>
      <c-row>
        <router-link class="col link" to="demos/spinner">
          <c-icon>github</c-icon> spinner</router-link>
      </c-row>
      <c-row>
        <router-link class="col link" to="demos/modal">
          <c-icon>github</c-icon> modal</router-link>
      </c-row>
      <c-row>
        <router-link class="col link" to="demos/toast">
          <c-icon>github</c-icon> toast</router-link>
      </c-row>
      <c-row>
        <router-link class="col link" to="demos/image">
          <c-icon>github</c-icon> image</router-link>
      </c-row>
    </template>
    <component v-else :is="'demo-' + $route.params.component"></component>
  </div>
</template>

<script>
import CRow from 'components/c-row'
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

export default {
  data () {
    return {
      component: DemoButton
    }
  },

  components: {
    CRow,
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
    DemoImage
  }
}
</script>
