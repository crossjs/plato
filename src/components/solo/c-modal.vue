<template>
  <div class="c-modal"
    :class="[cls]"
    v-show="show"
    transition="fade">
    <div class="c-modal-content"
      v-show="show"
      transition="slide">
      <div class="c-modal-header">
        <button type="button"
          @click="_click('close')">&times;</button>
        <h4 v-if="title">{{title}}</h4>
      </div>
      <div class="c-modal-body">{{body}}</div>
      <div class="c-modal-footer"
        v-if="buttons">
        <button class="button"
          v-for="button in buttons"
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
    args: {
      type: Array,
      default: () => []
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
      default: () => Promise.resolve(true)
    }
  },

  methods: {
    _click (key) {
      promisify(this.callback(key))
        .then(() => { this.show = false })
        .catch(() => { this.show = true })
    }
  }
}

function promisify (val) {
  if (!val) {
    return val === false ? Promise.reject(val) : Promise.resolve(val)
  }

  if (typeof val.then === 'function') {
    return val
  }

  return Promise.resolve(val)
}
</script>

<style src="styles/components/modal"></style>
