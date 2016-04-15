export const setBearer = makeAction('SET_BEARER')
export const addToast = makeAction('ADD_TOAST')
export const deleteToast = makeAction('DELETE_TOAST')
export const clearToast = makeAction('CLEAR_TOAST')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
