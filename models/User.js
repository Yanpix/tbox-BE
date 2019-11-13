const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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


// UserSchema.methods.accessAdminPanel = () => {
//   if (this.role == userRole.ADMIN ||
//     this.role == userRole.ADMIN) {
//     return true;
//   }
//   return false;
// };


//Export model
module.exports = mongoose.model('User', UserSchema);