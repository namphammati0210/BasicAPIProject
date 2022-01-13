const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true, minlength: 5, maxlength: 8}
})

const User = mongoose.model('User', userSchema);

module.exports = User;
