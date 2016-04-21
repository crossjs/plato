import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  user: {
    type: Number,
    required: true
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  updated: {
    type: Number
  },
  created: {
    type: Number
  }
})

schema.pre('save', function (next) {
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

export default mongoose.model('Page', schema)
