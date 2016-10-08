<template>
  <div class="v-globe">
    <c-row>
      <c-col :size="0">
        {{ __('views.globe.transition') }}
      </c-col>
      <c-col class="right">
        <c-checkbox
          :value="transition"
          @change="transitionEnabled = arguments[0]"></c-checkbox>
      </c-col>
    </c-row>
    <c-row>
      <c-col :size="0">
        {{ __('views.globe.language') }}
      </c-col>
      <c-col class="right link">
        <c-link v-tap @tap.native="showPicker = !showPicker">{{ Object.keys(languages)[languageIndex] }}</c-link>
      </c-col>
    </c-row>
    <c-pane v-if="showPicker">
      <c-picker
        :index="languageIndex"
        @change="languageIndex = arguments[0]">
        <p v-for="(val, key) in languages">{{key}}</p>
      </c-picker>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CRow from 'components/c-row'
import CCol from 'components/c-col'
import CLink from 'components/c-link'
import CCheckbox from 'components/c-checkbox'
import CPicker from 'components/c-picker'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      showPicker: false,
      languageIndex: 0,
      languages: {
        '简体中文': 'zh',
        'English': 'en',
        'العربية': 'ar'
      },
      transitionEnabled: false
    }
  },

  computed: mapGetters(['lang', 'transition']),

  mounted () {
    this.languageIndex = Object.keys(this.languages).findIndex(key => {
      if (this.languages[key] === this.lang) {
        return true
      }
    })
    this.transitionEnabled = this.transition
  },

  methods: mapActions(['setEnv']),

  watch: {
    languageIndex (val) {
      this.$nextTick(() => {
        this.setEnv({
          lang: this.languages[Object.keys(this.languages)[val]]
        })
      })
    },
    transitionEnabled (val) {
      this.$nextTick(() => {
        this.setEnv({
          transition: val
        })
      })
    }
  },

  components: {
    CPane,
    CRow,
    CCol,
    CLink,
    CCheckbox,
    CPicker
  }
}
</script>
