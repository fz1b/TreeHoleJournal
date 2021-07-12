const mongoose = require('mongoose');

const PRIVACY = {
    PUBLIC: 'PUBLIC',
    ANONYMOUS: 'ANONYMOUS',
    PRIVATE: 'PRIVATE'
}
const JournalSchema = mongoose.Schema({
        _id: mongoose.SchemaTypes.ObjectId,
        title: String,
        author_id: String,
        date: String,
        image: String,
        weather: String,
        content: String,
        privacy: { type: String, enum: [PRIVACY.PUBLIC, PRIVACY.ANONYMOUS, PRIVACY.PRIVATE]}
    },
    {
        collection: 'journals'
    })


// module.exports = mongoose.model('Journal', JournalSchema)
exports.PRIVACY = PRIVACY;
exports.Journal = mongoose.model('Journal', JournalSchema);
