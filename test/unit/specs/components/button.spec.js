import Vue from 'vue'
import CButton from 'components/c-button'

describe('button.vue', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  it('should render correct contents', () => {
    const vm = new Vue({
      el,
      replace: false,
      template: '<c-button>PLATO</c-button>',
      components: {
        CButton
      }
    })

    expect(vm.$children.length).to.equal(1)
    const el0 = vm.$children[0].$el
    expect(el0.textContent).to.equal('PLATO')
    expect(el0.type).to.equal('button')
  })

  it('type', () => {
    const vm = new Vue({
      el,
      replace: false,
      template: '<c-button type="submit">PLATO</c-button>',
      components: {
        CButton
      }
    })

    expect(vm.$children[0].$el.type).to.equal('submit')
  })
})
