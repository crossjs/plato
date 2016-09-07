import Vue from 'vue'
import CButton from 'components/c-button'

describe('button.vue', () => {
  let el
  let vm

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    // document.body.removeChild(el)
    vm.$destroy()
  })

  it('should render correct contents', () => {
    vm = new Vue({
      el,
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
    vm = new Vue({
      el,
      template: '<c-button type="submit">PLATO</c-button>',
      components: {
        CButton
      }
    })

    expect(vm.$children[0].$el.type).to.equal('submit')
  })
})
