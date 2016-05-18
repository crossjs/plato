import mongoose from 'mongoose'
// import _debug from 'debug'

// const debug = _debug('koa:models:role')

const schema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true,
    lowercase: true,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  level: {
    type: Number
  },
  updated: {
    type: Number
  },
  created: {
    type: Number
  }
})

// document middleware
schema.pre('save', function (next) {
  if (!this.created) {
    this.created = Date.now()
  }

  next()
})

// query middleware
schema.pre('update', update)
schema.pre('findOneAndUpdate', update)
schema.pre('findByIdAndUpdate', update)

function update () {
  const updated = Date.now()
  this.update({}, { $set: { updated } })
}

export default mongoose.model('Role', schema)
