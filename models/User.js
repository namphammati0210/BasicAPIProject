const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoosePaginate = require('mongoose-paginate-v2');
require('dotenv').config();

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true}
})

userSchema.methods.checkPassword = function(password, cb) {
  bcrypt.compare(password, this.password, (error, result) => {
    return cb(error, result); // Closure
  })
}

userSchema.methods.createToken = async function() {
  try {
    const payload = {
      name: this.name,
      email: this.email
    }
  
    const token = await jwt.sign(payload, process.env.SECRET_KEY);
    console.log("🚀 ~ file: User.js ~ line 28 ~ userSchema.methods.createToken=function ~ token", token)

    return token
  } catch (error) {
    console.log("🚀 ~ file: User.js ~ line 31 ~ userSchema.methods.createToken=function ~ error", error)
    return error;
  }
  
}

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

module.exports = User;
