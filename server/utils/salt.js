import crypto from 'crypto'

export default (length = 32) => {
  return crypto.randomBytes(length).toString('base64')
}
