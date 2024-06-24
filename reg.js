
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regUserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String,
});

const regUser = mongoose.model('regUser', regUserSchema);

module.exports = regUser;
