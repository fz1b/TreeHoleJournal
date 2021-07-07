const mongoose = require('mongoose');

const JournalSchema = mongoose.Schema({
        _id: mongoose.SchemaTypes.ObjectId,
        title: String,
        author: mongoose.SchemaTypes.ObjectId,
        date: Date,
        image: String,
        weather: String,
        content: String
    },
    {
        collection: 'journals'
    })

module.exports = mongoose.model('Journal', JournalSchema);