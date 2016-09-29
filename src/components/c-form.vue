<template>
  <form class="c-form" autocomplete="off" novalidate><slot></slot></form>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase]
}
</script>
