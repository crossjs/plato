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
import {
  deleteToast
} from 'vx/actions'
import { toasts } from 'vx/getters'
export default {
  // props: ['toasts'],
  vuex: {
    getters: {
      toasts
    },
    actions: {
      deleteToast
    }
  }
}
</script>

<style src="styles/components/toast"></style>
