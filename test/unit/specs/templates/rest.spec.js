import template from 'templates/rest'

describe('rest', () => {
  const mod = template({
    source: 'will-be-404',
    initialState: {
      test: 'test'
    },
    getters: {
      test: state => state.test,
      items: state => state.entities,
      is_fetching: state => state.fetching
    }
  })

  it('should export state', () => {
    expect(mod.state.test).to.equal('test')
    expect(mod.state.fetching).to.equal(false)
    expect(mod.state.entities).to.eql({})
  })

  it('should export getters', () => {
    expect(mod.getters).to.have.all.keys('test', 'is_fetching', 'items')
    expect(mod.getters.test(mod.state)).to.equal('test')
    expect(mod.getters.is_fetching(mod.state)).to.equal(false)
    expect(mod.getters.items(mod.state)).to.eql({})
  })

  it('should export actions', () => {
    expect(mod.actions).to.have.all.keys('list', 'post', 'put', 'patch', 'delete', 'get')
  })

  describe('should call actions correctly', () => {
    it('list', done => {
      mod.actions.list({
        commit (type, { __status__, __payload__ }) {
          expect(type).to.equal('LIST')
          if (__status__ === 'pending') {
            expect(typeof __payload__.then).to.equal('function')
          } else if (__status__ === 'error') {
            expect(__payload__.body).to.equal('NOT FOUND')
            done()
          }
        }
      })
    })

    it('post', done => {
      mod.actions.post({
        commit (type, { __status__, __payload__ }) {
          expect(type).to.equal('POST')
          if (__status__ === 'pending') {
            expect(typeof __payload__.then).to.equal('function')
          } else if (__status__ === 'error') {
            expect(__payload__.body).to.equal('NOT FOUND')
            done()
          }
        }
      })
    })

    it('patch', done => {
      mod.actions.patch({
        commit (type, { __status__, __payload__ }) {
          expect(type).to.equal('PATCH')
          if (__status__ === 'pending') {
            expect(typeof __payload__.then).to.equal('function')
          } else if (__status__ === 'error') {
            expect(__payload__.body).to.equal('NOT FOUND')
            done()
          }
        }
      })
    })

    it('put', done => {
      mod.actions.put({
        commit (type, { __status__, __payload__ }) {
          expect(type).to.equal('PUT')
          if (__status__ === 'pending') {
            expect(typeof __payload__.then).to.equal('function')
          } else if (__status__ === 'error') {
            expect(__payload__.body).to.equal('NOT FOUND')
            done()
          }
        }
      })
    })

    it('delete', done => {
      mod.actions.delete({
        commit (type, { __status__, __payload__ }) {
          expect(type).to.equal('DELETE')
          if (__status__ === 'pending') {
            expect(typeof __payload__._.then).to.equal('function')
          } else if (__status__ === 'error') {
            expect(__payload__.body).to.equal('NOT FOUND')
            done()
          }
        }
      })
    })

    it('get', done => {
      mod.actions.get({
        commit (type, { __status__, __payload__ }) {
          expect(type).to.equal('GET')
          if (__status__ === 'pending') {
            expect(typeof __payload__.then).to.equal('function')
          } else if (__status__ === 'error') {
            expect(__payload__.body).to.equal('NOT FOUND')
            done()
          }
        }
      })
    })
  })

  it('should export mutations', () => {
    expect(mod.mutations).to.have.all.keys('LIST', 'POST', 'PUT', 'PATCH', 'DELETE', 'GET')
  })

  describe('should call mutations correctly', () => {
    /* eslint babel/new-cap: 0 */
    it('list', () => {
      const state = {}
      mod.mutations.LIST(state, {
        __status__: 'success',
        __payload__: [{ id: 'test' }]
      })
      expect(state.entities.test.id).to.equal('test')
    })

    it('post', () => {
      const state = {}
      mod.mutations.POST(state, {
        __status__: 'success',
        __payload__: { id: 'test' }
      })
      expect(state.entities.test.id).to.equal('test')
    })

    it('patch', () => {
      const state = {}
      mod.mutations.PATCH(state, {
        __status__: 'success',
        __payload__: { id: 'test' }
      })
      expect(state.entities.test.id).to.equal('test')
    })

    it('put', () => {
      const state = {}
      mod.mutations.PUT(state, {
        __status__: 'success',
        __payload__: { id: 'test' }
      })
      expect(state.entities.test.id).to.equal('test')
    })

    it('delete', () => {
      const state = {
        entities: {
          'test': {
            id: 'test'
          }
        }
      }
      mod.mutations.DELETE(state, {
        __status__: 'success',
        __payload__: { id: 'test' }
      })
      expect(state.entities).to.eql({})
    })

    it('get', () => {
      const state = {}
      mod.mutations.GET(state, {
        __status__: 'success',
        __payload__: { id: 'test' }
      })
      expect(state.entities.test.id).to.equal('test')
    })
  })
})
