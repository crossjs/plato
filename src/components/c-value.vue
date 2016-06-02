<template>
  <div :class="['c-value', class, {link: extra.isLink}]">
    <template v-if="extra.isHTML">
      {{{value}}}
    </template>
    <template v-else>
      {{value}}
    </template>
  </div>
</template>

<script>
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    value: {
    },
    extra: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style src="styles/components/value"></style>
