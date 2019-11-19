const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cryptor = require('../helpers/cryptor');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 100
  },
  email: {
    type: String,
    required: true,
    max: 100
  },
  hashedPassword: {
    type: String,
    required: true,
    max: 100
  },
  profile_picture: {
    type: Object,
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});


UserSchema.methods.passwordIsValid = function (pass) {
  return pass == cryptor.decrypt(this.hashedPassword);
}


//Export model
module.exports = mongoose.model('User', UserSchema);