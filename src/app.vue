<template>
  <div class="container">
    <c-progress class="progress"
      :progress="progress"></c-progress>
    <c-toast class="toast"
      :toasts="toasts"></c-toast>
    <header class="header">
      <div class="logo">
        <c-route-link :route="{
            link: { path: '/', exact: true },
            title: 'PLATO'
          }"></c-route-link>
      </div>
      <div class="history">
        <c-button class="none" @click="historyBack">
          <c-icon :value="0xe60d"></c-icon>
        </c-button>
      </div>
      <c-navbar class="navbar" :icon="0xe603">
        <c-route
          :recursive="recursive"
          :filter="filter"
          :routes="routes"></c-route>
      </c-navbar>
    </header>
    <router-view class="router-view"
      transition="router-view-transition"
      transition-mode="out-in"
      keep-alive></router-view>
  </div>
</template>

<script>
import CProgress from 'components/c-progress'
import CToast from 'components/c-toast'
import CButton from 'components/c-button'
import CIcon from 'components/c-icon'
import CRouteLink from 'components/c-route-link'
import CNavbar from 'components/c-navbar'
import CRoute from 'components/c-route'
import store from 'vx/store'
import { toasts } from 'vx/getters'
import { routes } from 'routes'

export default {
  name: 'App',
  store,
  i18n: {
    resources: {}
  },

  data () {
    return {
      recursive: false,
      routes
    }
  },

  computed: {
    filter () {
      return (key, route) => {
        return key !== '/' && route.auth !== !this.env.authorized
      }
    }
  },

  // 必须定义 ajax，才能使用父辈与全局的配置
  ajax: {},

  methods: {
    getResources () {
      const { lang } = this.env
      this.$GET(`./i18n/${lang}.json`).then(resources => {
        this.$i18n.resources = resources
      })
    },
    historyBack () {
      history.back()
    }
  },

  created () {
    this.getResources()
  },

  watch: {
    env (val, old) {
      if (val.lang !== old.lang) {
        this.$nextTick(() => {
          this.getResources()
        })
      }
    }
  },

  vuex: {
    getters: {
      toasts
    }
  },

  components: {
    CProgress,
    CToast,
    CButton,
    CIcon,
    CRouteLink,
    CNavbar,
    CRoute
  }
}
</script>

<style src="styles/app"></style>
