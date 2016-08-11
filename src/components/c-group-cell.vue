<template>
  <div class="c-group-cell" @click="_click(model.click)">
    <c-icon className="c-group-cell-icon"
      :value="model.icon" v-if="model.icon"></c-icon>
    <c-label className="c-group-cell-label">{{model.label}}</c-label>
    <div :class="['c-group-cell-value', {link: model.extra && model.extra.isLink}]">
      <span v-if="model.extra && model.extra.isHTML" v-html="model.value"></span>
      <span v-else v-text="model.value"></span>
    </div>
  </div>
</template>

<script>
import CIcon from './c-icon'
import CLabel from './c-label'
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    model: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  methods: {
    _click (callback) {
      if (typeof callback === 'function') {
        callback()
      }
    }
  },

  components: {
    CIcon,
    CLabel
  }
}
</script>

<style src="plato-styles/group-cell"></style>
