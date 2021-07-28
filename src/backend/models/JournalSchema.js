const mongoose = require('mongoose');

const PRIVACY = {
    PUBLIC: 'PUBLIC',
    ANONYMOUS: 'ANONYMOUS',
    PRIVATE: 'PRIVATE',
};

const CommentSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    author_id: String,
    date: Date,
    content: String,
    anonymous: Boolean,
    edited: Boolean,
});

const JournalSchema = mongoose.Schema(
    {
        _id: mongoose.SchemaTypes.ObjectId,
        title: String,
        author_id: String,
        date: Date,
        image: String,
        weather: String,
        content: String,
        privacy: {
            type: String,
            enum: [PRIVACY.PUBLIC, PRIVACY.ANONYMOUS, PRIVACY.PRIVATE],
        },
        comments: [CommentSchema],
    },
    {
        collection: 'journals',
    }
);

exports.PRIVACY = PRIVACY;
exports.Journal = mongoose.model('Journal', JournalSchema);
