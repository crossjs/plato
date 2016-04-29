<template>
  <div v-show="show" class="ui-modal" :class="[cls]" transition="fade">
    <div v-show="show" class="ui-modal-content" transition="slide">
      <div class="ui-modal-header">
        <button type="button" @click="_click('close')">&times;</button>
        <h4 v-if="title">{{title}}</h4>
      </div>
      <div class="ui-modal-body">{{body}}</div>
      <div v-if="buttons" class="ui-modal-footer">
        <button v-for="button in buttons"
          class="button"
          :role="$key"
          :type="button.type || 'button'"
           @click="_click($key)">{{button.label}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    cls: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
    buttons: {
      type: Object,
      default: () => {
        return {
          submit: {
            label: '确定'
          },
          cancel: {
            label: '取消'
          }
        }
      }
    },
    callback: {
      type: Function,
      default: () => true
    }
  },

  methods: {
    _click (key) {
      this.show = this.callback(key) === false
    }
  }
}
</script>

<style src="styles/components/modal"></style>
