<template>
  <div class="v-globe">
    <c-pane>
      <h3 class="center">{{ __('views.globe.language') }}</h3>
      <hr>
      <c-picker
        :index="index"
        @change="index = arguments[0]">
        <p v-for="(val, key) in languages">{{key}}</p>
      </c-picker>
      <hr>
      <p class="center">then goto <router-link to='create'>Create</router-link> to view the results</p>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CPicker from 'components/c-picker'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      index: 0,
      languages: {
        '简体中文': 'zh',
        'English': 'en',
        'العربية': 'ar'
      }
    }
  },

  computed: mapGetters(['lang']),

  mounted () {
    this.index = Object.keys(this.languages).findIndex(key => {
      if (this.languages[key] === this.lang) {
        return true
      }
    })
  },

  methods: mapActions(['setEnv']),

  watch: {
    index (val) {
      this.$nextTick(() => {
        this.setEnv({
          lang: this.languages[Object.keys(this.languages)[val]]
        })
      })
    }
  },

  components: {
    CPane,
    CPicker
  }
}
</script>
