import crypto from 'crypto'

export default (string, salt = '', iterations = 12000, length = 32) => {
  return crypto.pbkdf2Sync(string, salt, iterations, length, 'sha256').toString('base64')
}
