import store from 'vx/store'

export default () => {
  const { bearer } = store.state.auth
  if (bearer) {
    const { token, expires } = bearer
    if (token && expires >= Date.now()) {
      return token
    }
  }
  return null
}
