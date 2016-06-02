import Vue from 'vue'
import Logo from 'components/c-logo'

describe('logo.vue', () => {
  before(() => {
    const el = document.createElement('div')
    el.id = 'el'
    document.body.appendChild(el)
  })
  it('should render correct contents', () => {
    const vm = new Vue({
      el: '#el',
      template: '<div><logo class="logo"><em>plato</em></logo></div>',
      components: {
        Logo
      }
    })

    expect(vm.$el.id).to.equal('el')
    expect(vm.$children.length).to.equal(1)
    expect(vm.$children[0].$el.querySelectorAll('em')[0].textContent).to.equal('plato')
  })
})
