const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true}
})

userSchema.methods.checkPassword = (password, cb) => {
  bcrypt.compare(password, this.password, (error, result) => {
    return cb(error, result); // Closure
  })
}

const User = mongoose.model('User', userSchema);

module.exports = User;
