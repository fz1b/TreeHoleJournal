const mongoose = require('mongoose');

const JournalSchema = mongoose.Schema({
        _id: mongoose.SchemaTypes.ObjectId,
        title: String,
        author_id: String,
        date: String,
        image: String,
        weather: String,
        content: String,
        private: Boolean
    },
    {
        collection: 'journals'
    })

module.exports = mongoose.model('Journal', JournalSchema);