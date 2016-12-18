<template>
  <div class="main">
    <c-image
      src="images/logo.png"></c-image>
    <c-modal
      :show="show"
      @cancel="callback('cancel')"
      @submit="callback('submit')">{{ __('logout.submit') }}</c-modal>
  </div>
</template>

<script>
import CImage from 'components/core/image'
import CModal from 'components/core/modal'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      show: true,
      callback (key) {
        if (key === 'submit') {
          this.$parent.setCoreState({
            authorized: false
          })
        } else {
          history.back()
        }
      }
    }
  },

  computed: mapGetters(['authorized']),

  methods: mapActions(['setCoreState']),

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

<style src="../styles/logout" scoped></style>
