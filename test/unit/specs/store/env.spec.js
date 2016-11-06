import Vue from 'vue'
import store from 'store'
import { mapGetters, mapActions } from 'vuex'

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

  it('should map actions', done => {
    vm = new Vue({
      el,
      store,
      template: '<div></div>',
      computed: mapGetters(['authorized']),
      methods: mapActions(['setEnv']),
      watch: {
        authorized (val) {
          if (val) {
            done()
          }
        }
      }
    })

    expect(vm.authorized).to.equal(false)
    // async
    vm.setEnv({
      authorized: true
    })
  })
})
