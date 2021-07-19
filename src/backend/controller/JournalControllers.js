// controller for Journal

const mongoose = require("mongoose");
const axios = require('axios');
const {Journal, PRIVACY} = require("../models/JournalSchema");

// get all journals with PUBLIC or ANONYMOUS privacy setting
// req-param: null
// req-body: null
// response: list of Journals JSON obj
const getExploreJournals = async (req, res) => {
    Journal.find({$or: [{privacy: PRIVACY.PUBLIC}, {privacy: PRIVACY.ANONYMOUS}]})
        .then(journals => {
            // console.log(journals);
            res.status(200).json(journals);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
}

// get all journals from a specific user
// req-param: user_id
// req-body: null
// response: list of Journals JSON obj
const getUserJournals = async (req, res) => {
    Journal.find({author_id: req.params.user_id})
        .then(journals => {
            // console.log(journals);
            res.status(200).json(journals);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
}

// get all journals from a specific user
// req-param: user_id
// req-body: journal fields
// response: list of Journals JSON obj
const createNewJournal = async (req, res)=>{
    const journal = new Journal({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author_id: req.params.user_id,
        date: req.body.date,
        image: req.body.image,
        weather: req.body.weather,
        content: req.body.content,
        privacy: req.body.privacy,
        comments: []
    })

    journal.save().then(result=>{
        Journal.findById(journal._id).then(response=>res.status(200).json(response));
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
}

// delete a journal
// req-param: user_id, journal id,
// req-body: null
// response: null
const deleteJournal = async (req, res)=>{
    Journal.findByIdAndDelete(req.params.journal_id).then(result=>{
        res.status(200);
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
}

// edit a journal
// req-param: user_id, journal_id
// req-body: journal fields except comments
// response: the Journal JSON after edition
const editJournal = async (req, res)=>{
    Journal.findByIdAndUpdate(req.params.journal_id, {
        $set: req.body

    },{new: true})
        .then(result=>{
            res.status(200).json(result);
        }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
}

// change the privacy setting of a journal
// req-param: user_id, journal_id
// req-body: new privacy setting
// response: the Journal JSON after edition
const editJournalPrivacySetting = async (req, res)=>{
    Journal.findByIdAndUpdate(req.params.journal_id,
        {
            $set: {
                privacy: req.body.privacy
            }
        }, {new: true})
        .then(result=>{
            res.status(200).json(result);
        }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
}

// create a comment and add it to a journal
// req-param: commenter_token, journal_id
// req-body: comment fields
// response: the journal JSON with comments added
const createComment = async (req, res)=>{
    try {
        axios.get('http://localhost:5000/users/info/secure/'+req.params.commenter_token).then(response =>{
            if (response.status !== 200) {
                console.log(response.data.message);
                return res.status(500).json(response.data.message);
            }
            let commenter_id = response.data.userData._id;
            const comment = {
                _id: new mongoose.Types.ObjectId(),
                author_id: commenter_id,
                date: req.body.date,
                content: req.body.content,
                anonymous: req.body.anonymous,
                edited: false
            }

            Journal.findByIdAndUpdate(req.params.journal_id,
                {
                    $push: {
                        comments: comment
                    }
                }, {new: true})
                .then(newJournals=>{
                    return res.status(200).json(newJournals);
                })
                .catch(err => {
                    return res.status(500).json(err);
                })
        })
    } catch (e) {
        return res.status(500).json(e.data.message);
    }
}

// edit a comment, set the 'edited' field to true
// req-param: journal_id, comment_id
// req-body: new comment content, anonymous
// response: the Journal JSON with comments edited
const editComment = async (req, res)=>{
    Journal.findOneAndUpdate({'comments._id': req.params.comment_id},
        {
            $set: {
                'comments.$.content': req.body.content,
                'comments.$.anonymous': req.body.anonymous,
                'comments.$.edited': true
            }
        }, {new: true})
        .then(result=>{
            res.status(200).json(result);
        }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
}

// delete a comment
// req-param: journal_id, comment_id
// req-body: null
// response: the Journal JSON with comments deleted
const deleteComment = async (req,res)=>{
    Journal.findOneAndUpdate({'comments._id': req.params.comment_id},
        {
            $pull: {
                comments: {_id: req.params.comment_id}
            }
        }, {new: true})
        .then(result=>{
            res.status(200).json(result);
        }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
}

exports.getExploreJournals = getExploreJournals;
exports.getUserJournals = getUserJournals;
exports.createNewJournal = createNewJournal;
exports.deleteJournal = deleteJournal;
exports.editJournal = editJournal;
exports.editJournalPrivacySetting = editJournalPrivacySetting;
exports.createComment = createComment;
exports.editComment = editComment;
exports.deleteComment =deleteComment;