import Vue from 'vue'
import Modal from 'components/c-modal'

describe('modal.vue', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  it('should show modal', done => {
    const vm = new Vue({
      el,
      replace: false,
      template: '<modal :show.sync="show">hello?</modal>',
      data: {
        show: false
      },
      components: {
        Modal
      }
    })

    const { style } = vm.$children[0].$el

    expect(style.display).to.equal('none')

    vm.show = true
    vm.$nextTick(() => {
      expect(style.display).to.equal('')
      done()
    })
  })

  it('should have backdrop', done => {
    const vm = new Vue({
      el,
      replace: false,
      template: '<modal :show.sync="show">hello?</modal>',
      data: {
        show: false
      },
      components: {
        Modal
      }
    })

    const { classList, style } = vm.$children[0].$children[1].$el

    expect(classList.contains('c-mask')).to.be.ok
    expect(style.display).to.equal('none')

    vm.show = true
    vm.$nextTick(() => {
      expect(style.display).to.equal('')
      done()
    })
  })

  it('should render correct contents', done => {
    const vm = new Vue({
      el,
      replace: false,
      template: `<modal
        :show.sync="show"
        :callback="callback">hello?</modal>`,
      data: {
        show: true
      },
      methods: {
        callback (key) {
          modal.$nextTick(() => {
            modal.$nextTick(() => {
              expect(vm.show).to.be.not.ok
              done()
            })
          })
        }
      },
      components: {
        Modal
      }
    })

    const modal = vm.$children[0]

    expect(modal.$el.children.length).to.equal(2)
    expect(modal.$el.querySelector('.c-modal-body').textContent).to.equal('hello?')

    // button
    triggerMouseEvents(modal.$el.querySelector('[type="button"]'), 'click')
  })

  it('should prevent close', done => {
    const vm = new Vue({
      el,
      replace: false,
      template: `<modal
        :show.sync="show"
        :callback="callback">hello?</modal>`,
      data: {
        show: true
      },
      methods: {
        callback (key) {
          modal.$nextTick(() => {
            modal.$nextTick(() => {
              expect(vm.show).to.be.ok
              done()
            })
          })
          // prevent close
          return false
        }
      },
      components: {
        Modal
      }
    })

    const modal = vm.$children[0]

    // button
    triggerMouseEvents(modal.$el.querySelector('[type="button"]'), 'click')
  })

  it('should prevent close 2', done => {
    const vm = new Vue({
      el,
      replace: false,
      template: `<modal
        :show.sync="show"
        :callback="callback">hello?</modal>`,
      data: {
        show: true
      },
      methods: {
        callback (key) {
          modal.$nextTick(() => {
            modal.$nextTick(() => {
              expect(vm.show).to.be.ok
              done()
            })
          })
          // prevent close
          return Promise.reject(false)
        }
      },
      components: {
        Modal
      }
    })

    const modal = vm.$children[0]

    // button
    triggerMouseEvents(modal.$el.querySelector('[type="button"]'), 'click')
  })

  it('should NOT prevent close', done => {
    const vm = new Vue({
      el,
      replace: false,
      template: `<modal
        :show.sync="show"
        :callback="callback">hello?</modal>`,
      data: {
        show: true
      },
      methods: {
        callback (key) {
          modal.$nextTick(() => {
            modal.$nextTick(() => {
              expect(vm.show).to.be.not.ok
              done()
            })
          })
          // prevent close
          return 'any'
        }
      },
      components: {
        Modal
      }
    })

    const modal = vm.$children[0]

    // button
    triggerMouseEvents(modal.$el.querySelector('[type="button"]'), 'click')
  })
})
