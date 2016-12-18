<template>
  <div>
    <c-row>
      <c-col class="padding">
        {{ __('transition') }}
      </c-col>
      <c-col class="padding right">
        <c-checkbox
          :value="transition"
          @change="transitionEnabled = $event"></c-checkbox>
      </c-col>
    </c-row>
    <c-row :link="true" v-tap @tap.native="showPicker = !showPicker">
      <c-col class="padding">
        {{ __('language') }}
      </c-col>
      <c-col class="padding right">
        {{ Object.keys(languages)[languageIndex] }}
      </c-col>
    </c-row>
    <c-pane v-if="showPicker">
      <c-picker
        :index="languageIndex"
        @change="languageIndex = $event">
        <p v-for="(val, key) in languages">{{key}}</p>
      </c-picker>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/core/pane'
import CRow from 'components/core/row'
import CCol from 'components/core/col'
import CLink from 'components/core/link'
import CCheckbox from 'components/core/checkbox'
import CPicker from 'components/core/picker'
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
    this.languageIndex = Object.keys(this.languages)
      .findIndex(key => this.languages[key] === this.lang)
    this.transitionEnabled = this.transition
  },

  methods: mapActions(['setI18n', 'setCore']),

  watch: {
    languageIndex (val) {
      this.$nextTick(() => {
        this.setI18n({
          lang: this.languages[Object.keys(this.languages)[val]]
        })
      })
    },
    transitionEnabled (val) {
      this.$nextTick(() => {
        this.setCore({
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
