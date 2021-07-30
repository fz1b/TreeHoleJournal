const { Decimal128 } = require('bson');
const mongoose = require('mongoose');

const PRIVACY = {
    PUBLIC: 'PUBLIC',
    ANONYMOUS: 'ANONYMOUS',
    PRIVATE: 'PRIVATE',
};

const CommentSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    author_id: {type: String, ref:'User'},
    date: Date,
    content: String,
    anonymous: Boolean,
    edited: Boolean,
});

const JournalSchema = mongoose.Schema(
    {
        _id: mongoose.SchemaTypes.ObjectId,
        title: String,
        author_id: {type: String, ref:'User'},
        date: Date,
        image: String,
        weather: String,
        content: String,
        location:{
            address:String,
            lat:String,
            lng:String

        },
        privacy: {
            type: String,
            enum: [PRIVACY.PUBLIC, PRIVACY.ANONYMOUS, PRIVACY.PRIVATE],
        },
        comments: [CommentSchema],
        likedby: [{type: String, ref:'User'}]
    },
    {
        collection: 'journals',
    }
);

exports.PRIVACY = PRIVACY;
exports.Journal = mongoose.model('Journal', JournalSchema);
