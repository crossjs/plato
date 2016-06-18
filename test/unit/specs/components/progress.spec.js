import Vue from 'vue'
import Progress from 'components/c-progress'

describe('progress.vue', () => {
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
      template: `<progress class="progress"
        :progress="progress"></progress>`,
      data: {
        progress: 0
      },
      components: {
        Progress
      }
    })

    expect(vm.progress).to.equal(0)
    vm.progress = 50
    expect(vm.progress).to.equal(50)

    vm.$nextTick(() => {
      vm.$nextTick(() => {
        expect(vm.$children[0].$el.style.width).to.equal('50%')
        done()
      })
    })
  })
})
