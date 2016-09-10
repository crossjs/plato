<template>
  <div class="v-components">
    <c-row v-if="!$route.params.component">
      <router-link class="col link" to="demos/button">
        <c-icon>github</c-icon> button</router-link>
    </c-row>
    <c-row v-if="!$route.params.component">
      <router-link class="col link" to="demos/form">
        <c-icon>github</c-icon> form</router-link>
    </c-row>
    <c-row v-if="!$route.params.component">
      <router-link class="col link" to="demos/row">
        <c-icon>github</c-icon> row</router-link>
    </c-row>
    <c-row v-if="!$route.params.component">
      <router-link class="col link" to="demos/paginator">
        <c-icon>github</c-icon> paginator</router-link>
    </c-row>
    <component v-else :is="'demo-' + $route.params.component"></component>
  </div>
</template>

<script>
import CRow from 'components/c-row'
import CIcon from 'components/c-icon'
import DemoButton from 'demos/button'
import DemoForm from 'demos/form'
import DemoRow from 'demos/row'
import DemoPaginator from 'demos/paginator'

export default {
  data () {
    return {
      component: DemoButton
    }
  },

  components: {
    CRow,
    CIcon,
    DemoButton,
    DemoForm,
    DemoRow,
    DemoPaginator
  }
}
</script>
