<template>
  <div class="v-logout">
    <c-image
      src="images/logo.png"></c-image>
    <modal
      :show.sync="true"
      :backdrop="false"
      :callback="callback">确定退出？</modal>
  </div>
</template>

<script>
import CImage from 'plato-components/c-image'
import Modal from 'plato-components/c-modal'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      callback (key) {
        if (key === 'submit') {
          this.$parent.setEnv({
            authorized: false
          })
        } else {
          history.back()
        }
        // return `false` to prevent hidding modal
        return false
      }
    }
  },

  methods: mapActions(['setEnv']),

  route: {
    activate () {
      if (!this.env.authorized) {
        history.back()
        return
      }
    }
  },

  watch: {
    'env.authorized' (val) {
      if (!val) {
        this.$nextTick(() => {
          this.$route.router.go('/')
        })
      }
    }
  },

  components: {
    CImage,
    Modal
  }
}
</script>

<style src="styles/views/logout"></style>
