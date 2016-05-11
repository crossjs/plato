<template>
  <div class="c-list"
    :class="[cls]">
    <h5 class="c-list-title"
      v-if="title">{{title}}</h5>
    <div class="c-list-items"
      v-if="items">
      <div class="c-list-item"
        v-for="item in items">
        <div class="c-list-icon">{{item.icon}}</div>
        <div class="c-list-label">{{item.label}}</div>
        <component
          cls="c-list-value"
          :is="item.type"
          :state="state"
          :field="$key"
          :attrs="item.attrs"
          :validate="item.validate"
          :value="item.value"
          @mutate="_mutate($key, $arguments)"></component>
      </div>
    </div>
  </div>
</template>

<script>
import Text from './c-text'
import Checkbox from './c-checkbox'
import Datetime from './c-datetime'
import Dropdown from './c-dropdown'
export default {
  props: {
    cls: {
      type: String,
      default: ''
    },
    state: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    _mutate (key, [value]) {
      if (!this.payload) {
        this.payload = { ...this.data }
      }
      // 数据变更，保存到 payload
      this.payload[key] = value
    },
    _click (key, action) {
      if (action.hasOwnProperty('state')) {
        this.state = action.state
      }
      this.$emit('action', key, action, this.data, this.payload)
    }
  },

  components: {
    Text,
    Checkbox,
    Datetime,
    Dropdown
  }
}
</script>

<style src="styles/components/list"></style>
