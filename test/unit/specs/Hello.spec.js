import Vue from 'vue'
import Hello from 'src/components/Hello'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><hello></hello></div>',
      components: { Hello }
    }).$mount()
    expect(vm.$el.querySelector('.hello h1').textContent).toBe('Hello World!')
    expect(vm.$el.querySelector('.hello p:nth-child(2)').textContent).toBe('Hello World!')
    expect(vm.$el.querySelector('.hello p:last-child').textContent).toBe('Hello Words!')
  })
})

// also see example testing a component with mocks at
// https://github.com/vuejs/vue-loader-example/blob/master/test/unit/a.spec.js#L24-L49
