import Vue from 'vue'
import Logo from 'components/c-logo'

describe('logo.vue', () => {
  let el
  before(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    // document.body.removeChild(el)
  })

  it('should render correct contents', () => {
    const vm = new Vue({
      el,
      template: '<logo class="logo"><em>plato</em></logo>',
      components: {
        Logo
      }
    })

    expect(vm.$children.length).to.equal(1)
    expect(vm.$children[0].$el.querySelectorAll('em')[0].textContent).to.equal('plato')
  })
})
