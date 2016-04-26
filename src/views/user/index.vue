<template>
  <div class="view-user">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  route: {
    activate () {
      if (this.bearer) {
        return true
      } else {
        this.$route.router.go('/login')
      }
    }
  }
}
</script>
