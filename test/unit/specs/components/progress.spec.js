import Vue from 'vue'
import Progress from 'components/c-progress'

describe('progress.vue', () => {
  before(() => {
    const el = document.createElement('div')
    el.id = 'el'
    document.body.appendChild(el)
  })
  it('should render correct contents', done => {
    const vm = new Vue({
      el: '#el',
      template: `<div>
          <progress cls="progress"
            :progress="progress"></progress>
        </div>`,
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
