import mongoose from 'mongoose'
import hash from '../utils/hash'
import salt from '../utils/salt'

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
  },
  token: {
    type: String,
    index: true,
    unique: true
  },
  updated: {
    type: Number
  }
})

// asc
// schema.index({ username: 1 })

schema.pre('save', function (next) {
  if (!this.salt) {
    this.salt = salt()
  }

  this.password = hash(this.password, this.salt)

  if (!this.created) {
    this.created = Date.now()
  }

  next()
})

schema.pre('update', function (next) {
  if (!this.updated) {
    this.updated = Date.now()
  }

  next()
})

export default mongoose.model('User', schema)
