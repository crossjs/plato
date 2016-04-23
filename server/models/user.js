import mongoose from 'mongoose'
import _debug from 'debug'
import hash from '../utils/hash'
import salt from '../utils/salt'

const debug = _debug('koa:models:user')

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
  updated: {
    type: Number
  },
  created: {
    type: Number
  },
  token: {
    type: String,
    index: true,
    unique: true
  },
  expires: {
    type: Number
  }
})

// asc
// schema.index({ username: 1 })

schema.pre('save', function (next) {
  debug('save', this.password)
  if (!this.salt) {
    this.salt = salt()
  }

  // hash password
  this.password = hash(this.password, this.salt)

  if (!this.created) {
    this.created = Date.now()
  }

  next()
})

schema.pre('update', function (next) {
  debug('update', this.password)
  if (this.password) {
    this.salt = salt()

    // hash password
    this.password = hash(this.password, this.salt)
  }

  if (!this.updated) {
    this.updated = Date.now()
  }

  next()
})
schema.pre('findOneAndUpdate', function (next) {
  debug('findOneAndUpdate', this.password)
  if (this.password) {
    this.salt = salt()

    // hash password
    this.password = hash(this.password, this.salt)
  }

  if (!this.updated) {
    this.updated = Date.now()
  }

  next()
})

export default mongoose.model('User', schema)
