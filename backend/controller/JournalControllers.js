// controller for Journal

const mongoose = require('mongoose');
const axios = require('axios');
const { Journal, PRIVACY } = require('../models/JournalSchema');
const User = require('../models/UserSchema');
const loadBatchSize = 8;

// get #loadBatchSize journals with PUBLIC or ANONYMOUS setting ordered by date,
// if a journal_id and date is provided in the query, return only the journals
// created before the given journal (for pagination)
// req-param: null
// req-query: last_id (id of the last loaded journal), last_date
// req-body: null
// response: list of Journals JSON obj
const getExploreJournals = async (req, res) => {
    let filter = {
        $or: [
                { privacy: PRIVACY.PUBLIC },
                { privacy: PRIVACY.ANONYMOUS }
        ]
    }
    // get only the journals created before the last journal
    if (req.query.last_id && req.query.last_date ) {
        filter = modifyFilterToLoadAfterDate(filter, req.query.last_id, req.query.last_date)
    }

    Journal.find(
        filter,
        ['-author_id', '-comments.author_id', '-likedby']
    )
        .sort({ date:-1, _id:-1 })
        .limit(loadBatchSize)
        .then((journals) => {
            res.status(200).json(journals);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

// get journals ordered by their distance to a give location
// if a journal_id and date is provided in the query, return only the journals
// created before the given journal (for pagination)
// req-param: lat, lng
// req-query: last_id (id of the last loaded journal), last_dist
// req-body: void
// response: list of Journals JSON obj
const getNearbyJournals = async (req, res) => {
    let preFilter = {
        $and: [
            {
                $or: [
                    { privacy: PRIVACY.PUBLIC },
                    { privacy: PRIVACY.ANONYMOUS }
                ]
            },
            {location: {$ne: null}}
        ]
    }
    // get only the journals created before the last journal
    let postFilter = {};
    if (req.query.last_id && req.query.last_dist) {
        let last_dist = parseFloat(req.query.last_dist);
        let last_id = mongoose.Types.ObjectId(req.query.last_id);
        postFilter = {
            $or: [
                {
                    $and: [
                        { distance: { $eq:  last_dist } },
                        { _id: { $lt: last_id}}
                    ]
                },
                {distance: { $gt:  last_dist }}
            ]
        }
    }

    Journal.aggregate([
        {$match: preFilter},
        {$addFields: {
            distance: {
                $sqrt: {
                    $add: [
                        { $pow: [ { $subtract: [ {$toDouble: "$location.lat"}, {$toDouble: req.params.lat} ] }, 2 ] },
                        { $pow: [ { $subtract: [ {$toDouble: "$location.lng"}, {$toDouble: req.params.lng} ] }, 2 ] }
                    ]
                }
            }
        }},
        {$sort: {distance: 1, _id: -1}},
        {$match: postFilter},
    ])
        .limit(loadBatchSize)
        .then((journals) => {
            res.status(200).json(journals);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
}

// get journals ordered by their popularity (num. of likes + comments)
// if a journal_id and date is provided in the query, return only the journals
// created before the given journal (for pagination)
// req-param: void
// req-query: last_id (id of the last loaded journal), last_popularity
// req-body: void
// response: list of Journals JSON obj
const getHottestJournals = async (req, res) => {
    let weight_Likes = 1;
    let weight_Comments = 2;
    let preFilter = {
        $and: [
            {
                $or: [
                    { privacy: PRIVACY.PUBLIC },
                    { privacy: PRIVACY.ANONYMOUS }
                ]
            },
        ]
    }
    // get only the journals created before the last journal
    let postFilter = {};
    if (req.query.last_id && req.query.last_popularity) {
        let last_popularity = parseInt(req.query.last_popularity);
        let last_id = mongoose.Types.ObjectId(req.query.last_id);
        postFilter = {
            $or: [
                {
                    $and: [
                        { popularity: { $eq:  last_popularity } },
                        { _id: { $lt: last_id}}
                    ]
                },
                { popularity: { $lt:  last_popularity } }
            ]
        }
    }

    Journal.aggregate([
        {$match: preFilter},
        {$addFields: {
                popularity: {
                    $sum: [
                        { $multiply: [{ $size: "$likedby" }, weight_Likes] },
                        { $multiply: [{$size: '$comments'}, weight_Comments]}
                    ]
                }
        }},
        {$unset: 'likedby' },
        {$sort: {popularity: -1, _id: -1}},
        {$match: postFilter},
    ])
        .limit(loadBatchSize)
        .then((journals) => {
            res.status(200).json(journals);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
}

// get #loadBatchSize journals with PUBLIC or ANONYMOUS setting
// that contain the criteria string in title or content,
// if a journal_id and date is provided in the query, return only the journals
// created before the given journal (for pagination)
// req-param: criteria
// req-query: last_id (id of the last loaded journal), last_date
// req-body: null
// response: list of Journals JSON obj
const searchExploreJournals = async (req, res) => {
    let filter = {
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
    };

    // get only the journals created before the last journal
    if (req.query.last_id && req.query.last_date ) {
        filter = modifyFilterToLoadAfterDate(filter, req.query.last_id, req.query.last_date)
    }

    Journal.find(
        filter,
        ['-author_id', '-comments.author_id', '-likedby']
    )
        .sort({ date:-1, _id:-1 })
        .limit(loadBatchSize)
        .then((journals) => {
            res.status(200).json(journals);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

// get #loadBatchSize journals from a specific user
// if a journal_id and date is provided in the query, return only the journals
// created before the given journal (for pagination)
// req-param: idToken
// req-query: last_id (id of the last loaded journal), last_date
// req-body: null
// response: list of Journals JSON obj
const getUserJournals = async (req, res) => {
    axios
        .get(process.env.BACKEND_URL + 'users/info/secure/' + req.params.idToken)
        .then((user) => {
            let filter = { author_id: user.data.userData._id };
            // get only the journals created before the last journal
            if (req.query.last_id && req.query.last_date ) {
                filter = modifyFilterToLoadAfterDate(filter, req.query.last_id, req.query.last_date)
            }
            Journal.find(filter,
                ['-author_id', '-comments.author_id', '-likedby']
            )
                .sort({ date:-1, _id:-1 })
                .limit(loadBatchSize)
                .then((journals) => {
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

// get #loadBatchSize user's journals that contain the criteria string in title or content
// if a journal_id and date is provided in the query, return only the journals
// created before the given journal (for pagination)
// req-param: idToken, criteria
// req-query: last_id (id of the last loaded journal), last_date
// req-body: null
// response: list of Journals JSON obj
const searchUserJournals = async (req, res) => {
    axios
        .get(process.env.BACKEND_URL + 'users/info/secure/' + req.params.idToken)
        .then((user) => {
            let filter = {
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
            };
            if (req.query.last_id && req.query.last_date ) {
                filter = modifyFilterToLoadAfterDate(filter, req.query.last_id, req.query.last_date)
            }
            Journal.find(
                filter,
                ['-author_id', '-comments.author_id', '-likedby']
            )
                .sort({ date:-1, _id:-1 })
                .limit(loadBatchSize)
                .then((journals) => {
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

// get the dates that the user has journals on
// req-param: idToken
// req-body: null
// response: list of Date that the user has journals on
const getDateOverview = async (req, res) => {
    axios
        .get(process.env.BACKEND_URL + 'users/info/secure/' + req.params.idToken)
        .then((user) => {
            let filter = { author_id: user.data.userData._id };
            Journal.find(filter,
                ['date', '-_id']
            )
                .then((dates) => {
                    res.status(200).json(dates.map(d=>d.date));
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

// get the user's journal filtered by a given date
// if a journal_id and date is provided in the query, return only the journals
// created before the given journal (for pagination)
// req-param: user_token, date_start, date_end
// req-query: last_id (id of the last loaded journal), last_date
// req-body: void
// response: list of Journals JSON obj
const getUserJournalsByDate = async (req, res) => {
    axios
        .get(process.env.BACKEND_URL+'users/info/secure/' + req.params.idToken)
        .then((user) => {
            let start = new Date(req.params.date_start);
            let end = new Date(req.params.date_end);
            let filter = {
                author_id: user.data.userData._id,
                date: {
                    $gte:start,
                    $lt: end
                }
            }
            if (req.query.last_id && req.query.last_date ) {
                filter = modifyFilterToLoadAfterDate(filter, req.query.last_id, req.query.last_date)
            }
            Journal.find(
                filter,
                ['-author_id', '-comments.author_id', '-likedby']
            )
                .sort({ date:-1, _id:-1 })
                .limit(loadBatchSize)
                .then((journals) => {
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

// modify the find filter so that DB load only the journals after the given journal (for pagination)
// input: last_id (last loaded journal id), last date
// return: the modified filter
const modifyFilterToLoadAfterDate = (filter, last_id, last_date) => {
    // get only the journals created before the last journal
    let lastDate = new Date(last_date);
    filter = {
        $and: [
            filter,
            {
                $or: [
                    { date: { $lt: lastDate } },
                    {
                        $and: [
                            { date: { $eq: lastDate } },
                            { _id: { $lt: last_id}}
                        ]
                    }
                ]
            },
        ]
    }
    return filter;
}

// get the journal's author info
// req-param: journal_id
// req-body: null
// response: the User JSON without user_id
const getJournalAuthor = async (req, res) => {
    let journal;
    let userName;
    try {
        journal = await Journal.findById(req.params.journal_id);
        if (journal.privacy===PRIVACY.ANONYMOUS) {
            userName = "Anonymous";
        } else if (journal.privacy===PRIVACY.PRIVATE) {
            userName = "Private";
        } else {
            let user = await User.findById(journal.author_id);
            userName = user.name;
        }
    } catch(err) {
        return res.status(500).json(err)
    }
    return res.status(200).json({status:200, name:userName});
};

// create a journal for the given user
// req-param: idToken
// req-body: journal fields
// response: newly created journal without author_id

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
                likedby: []
            });
            journal
                .save()
                .then((result) => {
                    Journal.findById(journal._id,'-author_id').then((response) =>
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
const deleteJournal = (req, res) => {
    return Journal.findByIdAndDelete(req.params.journal_id)
        .then((result) => {
            return res.status(200).json(result);
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
            let { author_id, ...resultWithoutAuthor } = result.toObject();
            res.status(200).json(resultWithoutAuthor);
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
                .then((newJournal) => {
                    let { author_id, ...journalWithoutAuthor } = newJournal.toObject();
                    return res.status(200).json(journalWithoutAuthor);
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
            let { author_id, ...journalWithoutAuthor } = result.toObject();
            return res.status(200).json(journalWithoutAuthor);
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
        let { author_id, ...journalWithoutAuthor } = result.toObject();
        return res.status(200).json(journalWithoutAuthor);
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
exports.getHottestJournals = getHottestJournals;
exports.getNearbyJournals =getNearbyJournals;
exports.getUserJournals = getUserJournals;
exports.searchUserJournals = searchUserJournals;
exports.getUserJournalsByDate = getUserJournalsByDate;
exports.getDateOverview = getDateOverview;
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
