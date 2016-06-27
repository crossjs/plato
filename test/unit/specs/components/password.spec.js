import Vue from 'vue'
import CPassword from 'components/c-password'

describe('password.vue', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  it('should render correct contents', done => {
    const vm = new Vue({
      el,
      replace: false,
      template: '<c-password></c-password>',
      components: {
        CPassword
      }
    })

    expect(vm.$children.length).to.equal(1)
    const { children } = vm.$children[0].$el
    expect(children[0].tagName).to.equal('DIV')
    expect(children[1].tagName).to.equal('INPUT')
    expect(children[1].type).to.equal('password')

    triggerMouseEvents(children[0], 'click')
    vm.$nextTick(() => {
      expect(children[1].type).to.equal('text')
      done()
    })
  })
})
