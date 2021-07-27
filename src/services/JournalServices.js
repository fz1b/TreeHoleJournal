// services for journals
const axios = require('axios').default;

// get all journals with PUBLIC or ANONYMOUS privacy setting
// input: void
// response: list of journals JSON obj
export function getExploreJournals() {
    return axios
        .get('/explore')
        .then((res) => {
            // console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

// get all journals with PUBLIC or ANONYMOUS privacy setting
// input: search criteria String
// response: list of Journals JSON obj that satisfy the criteria
export function searchExploreJournals(criteria) {
    return axios
        .get('/explore/search/' + criteria)
        .then((res) => {
            // console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

// get all journals from a specific user
// input: user_token
// response: list of journals JSON obj
export function getUserJournals(idToken) {
    return axios
        .get('/me/' + idToken)
        .then((res) => {
            // console.log(res);
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
}

// get the user's journals that contain the criteria string in title or content
// input: user_token, search criteria String
// response: list of Journals JSON obj that satisfy the criteria
export function searchUserJournals(idToken, criteria) {
    return axios
        .get('/me/search/' + idToken + '/' + criteria)
        .then((res) => {
            // console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

// get the journal's author info
// req-param: journal_id
// req-body: null
// response: the User JSON without user_id
export function getJournalAuthor(journal_id) {
    return axios
        .get('/journals/author/' + journal_id)
        .then((res) => {
            // console.log(res.data);
            return res.data.data;
        })
        .catch((err) => {
            console.error(err);
            return {};
        });
}

export function verifyAuthor(journal_id, author_id) {}

// create a new journal
// input: user id, journal fields, except comments
// response: the added journal
export function createJournal(
    user_token,
    title,
    date,
    image,
    weather,
    content,
    location,
    privacy
) {
    return axios
        .post('/me/' + user_token, {
            title: title,
            author_id: user_token,
            date: date,
            image: image,
            weather: weather,
            content: content,
            location:location,
            privacy: privacy,
            comments: [],
        })
        .then((res) => {
            console.log(res.data)
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

// delete a journal
// input: user_id, journal id,
// response: null
export function deleteJournal(user_id, journal_id) {
    return axios
        .delete('/me/' + user_id + '/' + journal_id)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

// edit a journal
// input: user_id, journal id, journal fields
// response: the journal JSON after edition
export function editJournal(
    user_id,
    journal_id,
    title,
    date,
    image,
    weather,
    content,
    privacy
) {
    return axios
        .put('/me/' + user_id + '/' + journal_id, {
            title: title,
            date: date,
            image: image,
            weather: weather,
            content: content,
            privacy: privacy,
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

// change the privacy setting of a journal
// input: user_id, journal id, new privacy setting
// response: the journal JSON after edition
export function changePrivacySetting(user_id, journal_id, privacy) {
    return axios
        .put('/me/' + user_id + '/' + journal_id + '/privacy', {
            privacy: privacy,
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

// create a comment and add it to a journal
// input: journal id, commenter_id, comment fields
// response: the journal JSON with comments added
export function createComment(
    journal_id,
    commenter_token,
    date,
    content,
    anonymous
) {
    return axios
        .post('/comments/' + journal_id + '/' + commenter_token, {
            date: date,
            content: content,
            anonymous: anonymous,
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            return {};
        });
}

// edit a comment, set the 'edited' field to true
// input: journal id, comment_id, new comment content, anonymous
// response: the journal JSON with comments added
export function editComment(journal_id, comment_id, content, anonymous) {
    return axios
        .put('/explore/' + journal_id + '/comments/' + comment_id, {
            content: content,
            anonymous: anonymous,
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

// delete a comment
// input: journal_id, comment_id
// response: the journal JSON with comments deleted
export function deleteComment(journal_id, comment_id) {
    return axios
        .delete('/explore/' + journal_id + '/comments/' + comment_id)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

// get the comment's author info
// req-param: journal_id, comment_id
// req-body: null
// response: the User JSON without user_id
export function getCommentAuthor(journal_id, comment_id) {
    return axios
        .get('/comments/' + journal_id + '/' + comment_id)
        .then((res) => {
            // console.log(res.data);
            return res.data.data;
        })
        .catch((err) => {
            console.error(err);
            return {};
        });
}
