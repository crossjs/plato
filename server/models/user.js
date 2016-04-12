import mongoose from 'mongoose'
import crypto from 'crypto'

const schema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  created: {
    type: Number
  }
})

// asc
// schema.index({ username: 1 })

schema.pre('save', function (next) {
  if (!this.salt) {
    this.salt = crypto.randomBytes(32).toString('base64')
  }

  this.password = crypto.pbkdf2Sync(this.password, this.salt, 12000, 32, 'sha256').toString('base64')

  if (!this.created) {
    this.created = Date.now()
  }

  next()
})

export default mongoose.model('User', schema)
