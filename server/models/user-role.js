import mongoose from 'mongoose'
// import _debug from 'debug'

// const debug = _debug('koa:models:role')

const schema = new mongoose.Schema({
  role: {
    type: String,
    index: true,
    lowercase: true,
    required: true
  },
  user: {
    type: String,
    index: true,
    required: true
  },
  created: {
    type: Number
  }
})

schema.index({ role: 1, user: 1 }, { unique: true })

// document middleware
schema.pre('save', function (next) {
  if (!this.created) {
    this.created = Date.now()
  }

  next()
})

export default mongoose.model('UserRole', schema)
