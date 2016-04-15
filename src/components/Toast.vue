<template>
  <div>
    <div v-for="toast in toasts" track-by="$index">
      <h5>code:</h5>
      <pre><code> {{toast.code}} </code></pre>
      <h5>message:</h5>
      <pre><code> {{toast.message}} </code></pre>
      <button @click="ignore(toast)">Ignore</button>
      <hr>
    </div>
  </div>
</template>

<script>
import {
  deleteToast,
  clearToast
} from 'vx/actions'
import { toasts } from 'vx/getters'
export default {
  props: ['toasts'],
  vuex: {
    getters: {
      toasts
    },
    actions: {
      deleteToast,
      clearToast
    }
  },
  data () {
    return {
    }
  },
  directives: {
    // focus (value) {
    //   if (value) {
    //     this.vm.$nextTick(() => {
    //       this.el.focus()
    //     })
    //   }
    // }
  },
  methods: {
    ignore (toast) {
      this.deleteToast(toast)
    }
  }
}
</script>
