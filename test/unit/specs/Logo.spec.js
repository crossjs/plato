import Vue from 'vue'
import Router from 'vue-router'
import Logo from 'components/Logo'

Vue.use(Router)

const router = new Router()

describe('Logo.vue', () => {
  before(() => {
    const el = document.createElement('div')
    el.id = 'el'
    document.body.appendChild(el)
  })
  it('should render correct contents', done => {
    router.start(Logo, '#el')
    router.beforeEach(() => {
      const a = router.app.$el.querySelector('.logo a')
      expect(a.textContent).to.equal('Logo')
      expect(a.getAttribute('href')).to.equal('#!/')
      done()
    })
  })
})
