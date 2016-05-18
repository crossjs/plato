import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  user: {
    type: String,
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

// query middleware
schema.pre('update', update)
schema.pre('findOneAndUpdate', update)
schema.pre('findByIdAndUpdate', update)

function update () {
  const updated = Date.now()
  this.update({}, { $set: { updated } })
}

export default mongoose.model('Page', schema)
