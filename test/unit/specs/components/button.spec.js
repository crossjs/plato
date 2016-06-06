import Vue from 'vue'
import CButton from 'components/c-button'

describe('button.vue', () => {
  let el
  before(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  after(() => {
    document.body.removeChild(el)
  })

  it('should render correct contents', () => {
    const vm = new Vue({
      el,
      replace: false,
      template: '<c-button>plato</c-button>',
      components: {
        CButton
      }
    })

    expect(vm.$children.length).to.equal(1)
    const el0 = vm.$children[0].$el
    expect(el0.textContent).to.equal('plato')
    expect(el0.type).to.equal('button')
  })

  it('type', () => {
    const vm = new Vue({
      el,
      replace: false,
      template: '<c-button type="submit">plato</c-button>',
      components: {
        CButton
      }
    })

    expect(vm.$children[0].$el.type).to.equal('submit')
  })
})
