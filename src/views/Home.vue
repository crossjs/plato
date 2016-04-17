<template>
  <div>
    <pre><code>
    {{bearer | json}}
    </code></pre>
  </div>
</template>

<script>
import { bearer } from 'vx/getters'
export default {
  vuex: {
    getters: {
      bearer
    }
  }
}
</script>

<style>
</style>
