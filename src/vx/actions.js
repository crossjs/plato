export const setBearer = makeAction('SET_BEARER')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
