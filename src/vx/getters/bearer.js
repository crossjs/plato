export default {
  bearer ({ bearer: { bearer } }) {
    if (!bearer) {
      return null
    }
    const { token, expires } = bearer
    if (!token || expires < Date.now()) {
      console.log(bearer)
      console.log(!token)
      console.log(expires < Date.now())
      return null
    }
    return bearer
  }
}
