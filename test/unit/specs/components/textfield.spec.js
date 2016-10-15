import Vue from 'vue'
import CTextfield from 'components/c-textfield'

describe('textfield.vue', () => {
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
      template: '<c-textfield></c-textfield>',
      components: {
        CTextfield
      }
    })

    expect(vm.$children[0].$el.children[0].nodeName).to.equal('INPUT')
  })

  it('type', () => {
    vm = new Vue({
      el,
      template: '<c-textfield type="password"></c-textfield>',
      components: {
        CTextfield
      }
    })

    expect(vm.$children.length).to.equal(1)
    const { children } = vm.$children[0].$el
    expect(children[0].nodeName).to.equal('INPUT')
    expect(children[0].type).to.equal('password')
  })
})
