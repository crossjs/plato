<template>
  <div v-show="show" class="ui-modal" :class="[cls]" transition="fade">
    <div v-show="show" class="ui-modal-content" transition="slide">
      <div class="ui-modal-header">
        <button type="button" @click="_close">&times;</button>
        <h4 v-if="title">{{title}}</h4>
      </div>
      <div class="ui-modal-body">{{body}}</div>
      <div v-if="buttons" class="ui-modal-footer">
        <button v-for="button in buttons"
          class="button"
          :role="button.role"
          :type="button.type || 'button'"
          @click="button.click">{{button.label}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show', 'cls', 'body', 'title', 'buttons'],

  methods: {
    _close () {
      this.show = false
    }
  }
}
</script>

<style src="styles/components/modal"></style>
