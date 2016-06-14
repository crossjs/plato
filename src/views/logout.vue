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
import CImage from 'components/c-image'
import Modal from 'components/c-modal'
import { setEnv } from 'vx/actions'
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

  route: {
    activate () {
      if (!this.env.authorized) {
        history.back()
        return
      }
    }
  },

  vuex: {
    actions: {
      setEnv
    }
  },

  watch: {
    env (val) {
      this.$nextTick(() => {
        if (!val.authorized) {
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
