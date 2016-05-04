export default {
  bearer ({ auth: { bearer } }) {
    if (!bearer) {
      return null
    }
    const { token, expires } = bearer
    if (!token || expires < Date.now()) {
      return null
    }
    return bearer
  }
}
