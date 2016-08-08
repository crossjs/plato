import store from 'store'
import Vuex, { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

describe('store', () => {
  describe('env', () => {
    let el
    let vm

    beforeEach(() => {
      el = document.createElement('div')
      document.body.appendChild(el)
      localStorage.clear()
    })

    afterEach(() => {
      // document.body.removeChild(el)
      vm.$destroy()
    })

    it('should map getters', () => {
      vm = new Vue({
        el,
        store,
        template: '<div></div>',
        computed: mapGetters(['lang', 'i18n', 'authorized'])
      })

      expect(vm.lang).to.equal(navigator.language.split('-')[0])
      expect(vm.i18n).to.equal(null)
      expect(vm.authorized).to.equal(false)
    })

    it('should map actions', () => {
      vm = new Vue({
        el,
        store,
        template: '<div></div>',
        computed: mapGetters(['authorized']),
        methods: mapActions(['setEnv'])
      })

      expect(vm.authorized).to.equal(false)
      vm.setEnv({
        authorized: true
      })
      expect(vm.authorized).to.equal(true)
    })
  })
})
