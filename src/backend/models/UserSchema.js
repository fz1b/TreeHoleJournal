const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    likes: [{ type: mongoose.Types.ObjectId, required: false }],
    collections: [{ type: mongoose.Types.ObjectId, required: false }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
