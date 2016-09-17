<template>
  <div class="v-logout">
    <c-image
      src="images/logo.png"></c-image>
    <c-modal
      :show="show"
      @cancel="callback('cancel')"
      @submit="callback('submit')">确定退出？</c-modal>
  </div>
</template>

<script>
import CImage from 'components/c-image'
import CModal from 'components/c-modal'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      show: true,
      callback (key) {
        this.show = false
        if (key === 'submit') {
          this.$parent.setEnv({
            authorized: false
          })
        } else {
          history.back()
        }
      }
    }
  },

  computed: mapGetters(['authorized']),

  methods: mapActions(['setEnv']),

  created () {
    if (!this.authorized) {
      history.back()
      return
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
    CModal
  }
}
</script>

<style src="styles/views/logout"></style>
