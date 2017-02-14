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
import CImage from 'platojs/components/core/image'
import CModal from 'platojs/components/core/modal'

export default {
  data () {
    return {
      show: true,
      callback (key) {
        if (key === 'submit') {
          this.setCore({
            authorized: false
          })
        } else {
          history.back()
        }
      }
    }
  },

  mapGetters: ['core/authorized'],
  mapActions: ['core/setCore'],

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
          // 跳转到首页
          this.$router.replace('/')
          // 如下将会跳转到 `/${this.$scope}`
          // this.$redirect('/')
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
