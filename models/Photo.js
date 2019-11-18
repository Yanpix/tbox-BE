const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    userID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    originalname: {
        type: String,
    },
    encoding: {
        type: String,
    },
    mimetype: {
        type: String,
    },
    filename: {
        type: String,
    },
    url: {
        type: String,
    },
    path: {
        type: String,
    },
    size: {
        type: Number,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});


//Export model
module.exports = mongoose.model('Photo', PhotoSchema);