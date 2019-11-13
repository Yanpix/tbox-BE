const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    max: 100
  },
  last_name: {
    type: String,
    required: false,
    max: 100
  },
  email: {
    type: String,
    required: true,
    max: 100
  },
  password: {
    type: String,
    required: true,
    max: 100
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});


// Виртуальное свойство для полного имени юзера
UserSchema
  .virtual('full_name')
  .get(function () {
    return this.last_name + ', ' + this.first_name;
  });

// Виртуальное свойство - URL юзера
// UserSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/User/' + this._id;
// });


UserSchema.methods.accessAdminPanel = () => {
  if (this.role == userRole.ADMIN ||
    this.role == userRole.ADMIN) {
    return true;
  }
  return false;
};


//Export model
module.exports = mongoose.model('User', UserSchema);