// controller for Journal

const mongoose = require('mongoose');
const axios = require('axios');
const { Journal, PRIVACY } = require('../models/JournalSchema');
const User = require('../models/UserSchema');

// get all journals with PUBLIC or ANONYMOUS privacy setting
// req-param: null
// req-body: null
// response: list of Journals JSON obj
const getExploreJournals = async (req, res) => {
    Journal.find(
        { $or: [{ privacy: PRIVACY.PUBLIC }, { privacy: PRIVACY.ANONYMOUS }] },
        ['-author_id', '-comments.author_id']
    ).sort('-date')
        .then((journals) => {
            // console.log(journals);
            res.status(200).json(journals);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

// get PUBLIC and ANONYMOUS journals that contain the criteria string in title or content
// req-param: criteria
// req-body: null
// response: list of Journals JSON obj
const searchExploreJournals = async (req, res) => {
    Journal.find(
        {
            $and: [
                {
                    $or: [
                        { privacy: PRIVACY.PUBLIC },
                        { privacy: PRIVACY.ANONYMOUS },
                    ],
                },
                {
                    $or: [
                        {
                            title: {
                                $regex: req.params.criteria,
                                $options: '-i',
                            },
                        },
                        {
                            content: {
                                $regex: req.params.criteria,
                                $options: '-i',
                            },
                        },
                    ],
                },
            ],
        },
        ['-author_id', '-comments.author_id']
    ).sort('-date')
        .then((journals) => {
            // console.log(journals);
            res.status(200).json(journals);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

// get all journals from a specific user
// req-param: idToken
// req-body: null
// response: list of Journals JSON obj
const getUserJournals = async (req, res) => {
    axios
        .get(process.env.BACKEND_URL + 'users/info/secure/' + req.params.idToken)
        .then((user) => {
            Journal.find({ author_id: user.data.userData._id },
                ['-author_id', '-comments.author_id']
            ).sort('-date')
                .then((journals) => {
                    // console.log(journals);
                    res.status(200).json(journals);
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json(err);
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

// get the user's journals that contain the criteria string in title or content
// req-param: idToken, criteria
// req-body: null
// response: list of Journals JSON obj
const searchUserJournals = async (req, res) => {
    axios
        .get(process.env.BACKEND_URL + 'users/info/secure/' + req.params.idToken)
        .then((user) => {
            Journal.find(
                {
                    $and: [
                        { author_id: user.data.userData._id },
                        {
                            $or: [
                                {
                                    title: {
                                        $regex: req.params.criteria,
                                        $options: '-i',
                                    },
                                },
                                {
                                    content: {
                                        $regex: req.params.criteria,
                                        $options: '-i',
                                    },
                                },
                            ],
                        },
                    ],
                },
                ['-author_id', '-comments.author_id']
            ).sort('-date')
                .then((journals) => {
                    // console.log(journals);
                    res.status(200).json(journals);
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json(err);
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

// get the user's journal filtered by a given date
// req-param: user_token, stringified Date (YYYY-MM-DD)
// req-body: void
// response: list of Journals JSON obj
const getUserJournalsByDate = async (req, res) => {
    axios
        .get(process.env.BACKEND_URL+'users/info/secure/' + req.params.idToken)
        .then((user) => {
            let start = new Date(req.params.date);
            let end = new Date(req.params.date);
            end.setDate(end.getDate()+1);
            Journal.find(
                {
                    author_id: user.data.userData._id,
                    date: {
                        $gte:start,
                        $lt: end
                    }
                },
                ['-author_id', '-comments.author_id']
            ).sort('-date')
                .then((journals) => {
                    // console.log(journals);
                    res.status(200).json(journals);
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json(err);
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
}


// get the journal's author info
// req-param: journal_id
// req-body: null
// response: the User JSON without user_id
const getJournalAuthor = async (req, res) => {
    Journal.findById(req.params.journal_id).then((journal) => {
        let user_id = journal.author_id;
        axios
            .get(process.env.BACKEND_URL+'users/info/id/' + user_id)
            .then((author) => {
                // console.log(author.data);
                res.status(200).json(author.data);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    });
};

// create a journal for the given user
// req-param: idToken
// req-body: journal fields
// response: list of Journals JSON obj

const createNewJournal = async (req, res) => {
    axios
        .get(process.env.BACKEND_URL+'users/info/secure/' + req.params.idToken)
        .then((user) => {
            const journal = new Journal({
                _id: new mongoose.Types.ObjectId(),
                title: req.body.title,
                author_id: user.data.userData._id,
                date: req.body.date,
                image: req.body.image,
                weather: req.body.weather,
                content: req.body.content,
                location: req.body.location,
                privacy: req.body.privacy,
                comments: [],
            });
            journal
                .save()
                .then((result) => {
                    Journal.findById(journal._id).then((response) =>
                        res.status(200).json(response)
                    );
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json(err);
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

// return true if the user has editing access to the journal  (is the author)
// req-param: journal_id, user_token
// req-body: null
// response: true if the user is the author, false otherwise {editable: true/false}
const verifyEditingAccess = async (req, res) => {
    axios.get(process.env.BACKEND_URL+'users/info/secure/'+req.params.idToken)
        .then(user=>{
            Journal.findById(req.params.journal_id)
                .then(journal => {
                    res.status(200).json({editable: user.data.userData._id === journal.author_id});
                })
        })
        .catch(err=>{
            res.status(500).json(err)
        });
}

// delete a journal
// req-param: user_id, journal id,
// req-body: null
// response: null
const deleteJournal = async (req, res) => {
    Journal.findByIdAndDelete(req.params.journal_id)
        .then((result) => {
            res.status(200);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

// edit a journal
// req-param: user_id, journal_id
// req-body: journal fields except comments
// response: the Journal JSON after edition
const editJournal = async (req, res) => {
    Journal.findByIdAndUpdate(
        req.params.journal_id,
        {
            $set: req.body,
        },
        { new: true }
    )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

// change the privacy setting of a journal
// req-param: user_id, journal_id
// req-body: new privacy setting
// response: the Journal JSON after edition
const editJournalPrivacySetting = async (req, res) => {
    Journal.findByIdAndUpdate(
        req.params.journal_id,
        {
            $set: {
                privacy: req.body.privacy,
            },
        },
        { new: true }
    )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

// get the comment's author info
// req-param: journal_id, comment_id
// req-body: null
// response: the User JSON without user_id
const getCommentAuthor = async (req, res) => {
    Journal.findById(req.params.journal_id).then((journal) => {
        let user_id = journal.comments.id(req.params.comment_id).author_id;
        axios
            .get(process.env.BACKEND_URL+'users/info/id/' + user_id)
            .then((author) => {
                // console.log(author.data);
                res.status(200).json(author.data);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    });
};

// create a comment and add it to a journal
// req-param: commenter_token, journal_id
// req-body: comment fields
// response: the journal JSON with comments added
const createComment = async (req, res) => {
    try {
        axios
            .get(
                process.env.BACKEND_URL+'users/info/secure/' +
                    req.params.commenter_token
            )
            .then((response) => {
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
                    edited: false,
                };

                Journal.findByIdAndUpdate(
                    req.params.journal_id,
                    {
                        $push: {
                            comments: comment,
                        },
                    },
                    { new: true }
                )
                    .then((newJournals) => {
                        return res.status(200).json(newJournals);
                    })
                    .catch((err) => {
                        return res.status(500).json(err);
                    });
            });
    } catch (e) {
        return res.status(500).json(e.data.message);
    }
};

// edit a comment, set the 'edited' field to true
// req-param: journal_id, comment_id
// req-body: new comment content, anonymous
// response: the Journal JSON with comments edited
const editComment = async (req, res) => {
    Journal.findOneAndUpdate(
        { 'comments._id': req.params.comment_id },
        {
            $set: {
                'comments.$.content': req.body.content,
                'comments.$.anonymous': req.body.anonymous,
                'comments.$.edited': true,
            },
        },
        { new: true }
    )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

// delete a comment
// req-param: journal_id, comment_id
// req-body: null
// response: the Journal JSON with comments deleted
const deleteComment = async (req, res) => {
    Journal.findOneAndUpdate(
        { 'comments._id': req.params.comment_id },
        {
            $pull: {
                comments: { _id: req.params.comment_id },
            },
        },
        { new: true }
    )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

// get like status of the journal when given user token and journal id
// req-param: idToken, journal_id
// response: true or false
const getJournalLike = async (req, res) => {
    const idToken = req.params.idToken;
    const journalId = req.params.journalId;
    let userResponse;
    if (!idToken || !journalId) {
        return res
            .status(400)
            .json({ status: 400, message: 'Invalid request body' });
    }
    try {
        userResponse = await axios.get(process.env.BACKEND_URL + 'users/info/secure/' + idToken);
    } catch (err) {
        return res.status(200).json({ status: 200, like: false });
    }
    const userid = userResponse.data.userData._id;
    let foundUser;
    try {
        foundUser = await User.findById(userid);
        if (!foundUser) {
            return res.status(500).json({ status: 500, message: 'Database Error1' });
        }
    } catch(err) {
        return res.status(500).json({ status: 500, message: 'Database Error2' });
    }
    if (foundUser.likes.includes(journalId)) {
        return res.status(200).json({status: 200, like: true});
    } else {
        return res.status(200).json({status: 200, like: false});
    }
}


exports.getExploreJournals = getExploreJournals;
exports.searchExploreJournals = searchExploreJournals;
exports.getUserJournals = getUserJournals;
exports.searchUserJournals = searchUserJournals;
exports.getUserJournalsByDate = getUserJournalsByDate;
exports.getJournalAuthor = getJournalAuthor;
exports.createNewJournal = createNewJournal;
exports.verifyEditingAccess = verifyEditingAccess;
exports.deleteJournal = deleteJournal;
exports.editJournal = editJournal;
exports.editJournalPrivacySetting = editJournalPrivacySetting;
exports.getCommentAuthor = getCommentAuthor;
exports.createComment = createComment;
exports.editComment = editComment;
exports.deleteComment = deleteComment;
exports.getJournalLike = getJournalLike;
