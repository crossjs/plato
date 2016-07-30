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
import { mapGetters, mapActions } from 'vuex'
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

  computed: mapGetters(['authorized']),

  methods: mapActions(['setEnv']),

  route: {
    activate () {
      if (!this.authorized) {
        history.back()
        return
      }
    }
  },

  watch: {
    authorized (val) {
      if (!val) {
        this.$nextTick(() => {
          this.$router.replace('/')
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
