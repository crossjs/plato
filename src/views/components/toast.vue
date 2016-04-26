<template>
  <section class="toasts" v-if="toasts.length" transition="slide">
    <div class="toast" v-for="toast in toasts" track-by="_id" transition="slide">
      <button class="ignore" @click="deleteToast(toast)">ⓧ</button>
      <pre class="code"><code> {{toast.code}} </code></pre>
      <pre class="message"><code> {{toast.message}} </code></pre>
    </div>
  </section>
</template>

<script>
import { deleteToast, shiftToast } from 'vx/actions'
import { toasts } from 'vx/getters'
export default {
  ready () {
    // setInterval(this.shiftToast.bind(this), 3000)
  },

  vuex: {
    getters: {
      toasts
    },
    actions: {
      deleteToast,
      shiftToast
    }
  }
}
</script>

<style src="styles/views/components/toast"></style>
