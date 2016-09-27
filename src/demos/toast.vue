<template>
  <div class="d-toast">
    <c-toast v-if="toast">{{toast}}</c-toast>
  </div>
</template>

<script>
import CToast from 'components/c-toast'

export default {
  data () {
    return {
      toast: 'i am a toast'
    }
  },

  created () {
    setTimeout(() => {
      this.toast = ''
    }, 3000)
  },

  components: {
    CToast
  }
}
</script>

<style src="styles/demo"></style>
