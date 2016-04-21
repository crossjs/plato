export const bearer = ({ bearer }) => {
  if (!bearer) {
    return null
  }
  const { token, expires } = bearer
  if (!token || expires < Date.now()) {
    return null
  }
  return bearer
}

export const profile = ({ profile }) => {
  return profile
}

export const toasts = ({ toasts }) => {
  return toasts
}

export const users = ({ users }) => {
  return users
}

export const pages = ({ pages }) => {
  return pages
}
