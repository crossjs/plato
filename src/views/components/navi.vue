<template>
  <nav class="nav">
    <c-route
      :filter="filter"
      :routes="routes"
      ></c-route>
  </nav>
</template>

<script>
import { routes } from 'routes'
export default {
  data () {
    return {
      routes
    }
  },

  computed: {
    filter () {
      return (key, route) => {
        return key !== '/' && route.auth !== !this.bearer
      }
    }
  }
}
</script>

<style src="styles/views/components/navi"></style>
