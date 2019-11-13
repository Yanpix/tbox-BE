const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: 100
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['incomplete', 'complete'],
    default: 'incomplete',
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});


// TaskSchema.methods.accessAdminPanel = () => {
//   if (this.role == userRole.ADMIN ||
//     this.role == userRole.ADMIN) {
//     return true;
//   }
//   return false;
// };


//Export model
module.exports = mongoose.model('Task', TaskSchema);