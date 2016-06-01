<template>
  <div class="logout">
    <c-image
      src="images/logo.png"></c-image>
    <modal
      :show.sync="true"
      :backdrop="false"
      :callback="callback">确定退出？</modal>
  </div>
</template>

<script>
import CImage from 'components/c-image'
import Modal from 'components/c-modal'
import { deleteAuth } from 'vx/actions'
export default {
  data () {
    return {
      callback (key) {
        if (key === 'submit') {
          this.$parent.deleteAuth()
        } else {
          history.back()
        }
        // return `false` to prevent hidding modal
        return false
      }
    }
  },

  route: {
    activate () {
      if (!this.auth) {
        history.back()
        return
      }
    }
  },

  vuex: {
    actions: {
      deleteAuth
    }
  },

  watch: {
    auth (val) {
      this.$nextTick(() => {
        if (!val) {
          this.$route.router.go('/')
        }
      })
    }
  },

  components: {
    CImage,
    Modal
  }
}
</script>

<style src="styles/views/logout"></style>
