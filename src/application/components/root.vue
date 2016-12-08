<template>
  <div id="container">
    <c-progress id="progress"
      v-show="progress"
      :progress="progress"></c-progress>
    <transition name="fade">
      <c-toast v-if="toast">{{toast}}</c-toast>
    </transition>
    <header id="header">
      <div id="logo">
        <router-link class="c-route-link" to="/">
          PLATO <sub>based on vue 2.x</sub>
        </router-link>
      </div>
      <div id="history">
        <c-link v-tap @tap.native="_back">
          <c-icon class="rotate90">chevron-down</c-icon>
        </c-link>
      </div>
      <c-navbar id="navbar">
        <c-icon class="c-reddot" slot="icon">three-bars</c-icon>
        <c-route :routes="routes"></c-route>
      </c-navbar>
    </header>
    <section id="content">
      <transition name="fade" mode="out-in" appear>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </section>
  </div>
</template>

<script>
import CProgress from 'components/core/progress'
import CToast from 'components/core/toast'
import CButton from 'components/core/button'
import CLink from 'components/core/link'
import CIcon from 'components/core/icon'
import CNavbar from 'components/navbar'
import CRoute from 'components/route'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['routes', 'lang', 'translations', 'progress', 'toast']),

  methods: {
    ...mapActions(['setConfig']),
    _back () {
      this.$router.back()
    }
  },

  created () {
    // for get translations in first
    if (!this.translations) {
      this.setConfig({
        lang: this.lang
      })
    }
    document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr'
  },

  watch: {
    lang (val) {
      document.documentElement.dir = val === 'ar' ? 'rtl' : 'ltr'
    }
  },

  components: {
    CProgress,
    CToast,
    CButton,
    CLink,
    CIcon,
    CNavbar,
    CRoute
  }
}
</script>

<style src="application/styles/app"></style>
<style src="application/styles/reddot"></style>
