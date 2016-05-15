import mongoose from 'mongoose'
// import mongoError from 'koa-mongo-error'
import _debug from 'debug'

export default app => {
  const debug = _debug('koa:db:mongo')

  const {
    MONGODB_URI = 'localhost:27017'
  } = process.env

  // MongoDB
  mongoose.set('debug', app.env === 'development')
  // this is the initial connection by Mongoose to MongoDB
  mongoose.connect(MONGODB_URI)
  mongoose.connection.on('error', debug)
  mongoose.connection.once('open', () => {
    debug('mongoose connected.')
  })
  // mongoose.connection.collections.users.drop((err, result) => {
  //   console.log(err, result)
  // })
  // mongoose.connection.collections.roles.drop((err, result) => {
  //   console.log(err, result)
  // })
  // mongoose.connection.collections.pages.drop((err, result) => {
  //   console.log(err, result)
  // })
  // mongoose.connection.collections.users.reIndex((err, result) => {
  //   console.log(err, result)
  // })
  // mongoose.connection.collections.roles.reIndex((err, result) => {
  //   console.log(err, result)
  // })
  // mongoose.connection.collections.pages.reIndex((err, result) => {
  //   console.log(err, result)
  // })

  // app.use(mongoError())
}
