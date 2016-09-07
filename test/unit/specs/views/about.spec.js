import Vue from 'vue'
import VAbout from 'views/about.vue'

describe('about.vue', () => {
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
      template: '<v-about></v-about>',
      components: {
        VAbout
      }
    })

    expect(vm.$el.className).to.equal('v-about')
    expect(vm.$el.textContent).to.equal('About')
  })
})
