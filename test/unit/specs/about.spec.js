import Vue from 'vue'
import VAbout from 'views/about.vue'

describe('about.vue', () => {
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
      template: '<v-about></v-about>',
      components: {
        VAbout
      }
    })

    expect(vm.$children.length).to.equal(1)
    expect(vm.$children[0].$children[0].$el.textContent).to.equal('About')
  })
})
