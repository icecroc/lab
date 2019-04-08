const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fName: {
    type: String
  },
  lName: {
    type: String
  },
  perms: {
    type: String
  }
})

module.exports = mongoose.model('users', userSchema)