<template>
  <div class="logout">
    <c-image
      src="images/logo.png"></c-image>
    <modal
      body="确定退出？"
      :show.sync="show"
      :backdrop="backdrop"
      :callback="callback"></modal>
  </div>
</template>

<script>
import CImage from 'solo/c-image'
import Modal from 'solo/c-modal'
import { deleteAuth } from 'vx/actions'
export default {
  data () {
    return {
      show: true,
      backdrop: false,
      callback (key) {
        if (key === 'submit') {
          this.$parent.deleteAuth()
        } else {
          history.back()
        }
      }
    }
  },

  route: {
    activate () {
      if (!this.auth) {
        history.back()
        return
      }
      this.show = true
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
