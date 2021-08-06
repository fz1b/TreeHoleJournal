// services for journals
import {getDistance} from 'geolib';
const axios = require('axios').default;

// convert journal date from string to Date obj
// input: journal JSON obj
// return: journal with Date obj
function processJournal(journal) {
    journal.date = new Date(journal.date);
    for (let comment of journal.comments) {
        comment.date = new Date(comment.date);
    }
    return journal;
}

// convert journal date from string to Date obj
// input: list of journals JSON obj
// return: list of journals with Date obj
function processJournals(journals) {
    let processed = [];
    for (let journal of journals) {
        journal =  processJournal(journal);
        processed.push(journal);
    }
    return processed;
}

// get all journals with PUBLIC or ANONYMOUS privacy setting
// input: last_id id of the last loaded journal, last_date
// response: list of journals JSON obj
export function getExploreJournals(last_id, last_date) {
    return axios
        .get('/explore',
            { params: { last_id: last_id, last_date: last_date } })
        .then((res) => {
            // console.log(res.data);
            return processJournals(res.data);
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

export function getNearbyJournals(lat, lng) {
    return axios
        .get('/explore')
        .then((res) => {
            let journals=processJournals(res.data).filter((j)=>j.location);
            journals.sort(function(a,b){
                const distA = getDistance(
                    {latitude: lat, longitude: lng},
                    {latitude: a.location.lat, longitude:a.location.lng},
                );
                const distB = getDistance(
                    {latitude: lat, longitude: lng},
                    {latitude: b.location.lat, longitude: b.location.lng},
                );
                return (distA-distB);
            });
            return journals;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}


// get all journals with PUBLIC or ANONYMOUS privacy setting
// input: search criteria String, last_id id of the last loaded journal, last_date
// response: list of Journals JSON obj that satisfy the criteria
export function searchExploreJournals(criteria, last_id, last_date) {
    return axios
        .get('/explore/search/' + criteria,
            { params: { last_id: last_id, last_date: last_date } })
        .then((res) => {
            // console.log(res.data);
            return processJournals(res.data);
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

// get all journals from a specific user
// input: user_token, last_id id of the last loaded journal, last_date
// return: list of journal obj
export function getUserJournals(idToken, last_id, last_date) {
    return axios
        .get('/me/' + idToken,
            { params: { last_id: last_id, last_date: last_date } })
        .then((res) => {
            // convert date from string to Date
            return processJournals(res.data);
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
}

// get the user's journals that contain the criteria string in title or content
// input: user_token, search criteria String, last_id id of the last loaded journal, last_date
// response: list of Journals JSON obj that satisfy the criteria
export function searchUserJournals(idToken, criteria, last_id, last_date) {
    return axios
        .get('/me/search/' + idToken + '/' + criteria,
            { params: { last_id: last_id, last_date: last_date } })
        .then((res) => {
            // console.log(res.data);
            return processJournals(res.data);
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

// get the dates that the user has journals on
// req-param: idToken
// req-body: null
// response: list of Date obj that the user has journals on
export function getDateOverview(idToken) {
    return axios
        .get('/me/date_overview/' + idToken)
        .then((res) => {
            // convert date from string to Date
            let dates = [];
            for (let date of res.data) {
                dates.push(new Date(date));
            }
            return dates;
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
}

// get the user's journal filtered by a given date
// input: user_token, Date, last_id id of the last loaded journal, last_date
// req-body: void
// response: list of Journals JSON obj
export function getUserJournalsByDate(idToken, date, last_id, last_date) {
    if (!date) date = new Date();
    return axios
        .get('/me/date/' + idToken + '/' + date.toUTCString(),
            { params: { last_id: last_id, last_date: last_date } })
        .then((res) => {
            // console.log(res.data);
            return processJournals(res.data);
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
            return res.data;
        })
        .catch((err) => {
            console.error(err);
            return {};
        });
}

// return true if the user has editing access to the journal  (is the author)
// input: journal_id, user_token
// return: true if the user is the author, false otherwise {editable: true/false}
export function verifyEditingAccess(journal_id, user_token) {
    return axios
        .get('/journal/access/' + journal_id + '/' + user_token)
        .then((res) => {
            // console.log(res.data);
            return res.data.editable;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
}

// create a new journal
// input: user id, journal fields, except comments
// return: the added journal
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
            return processJournal(res.data);
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

// delete a journal
// input: user_token, journal id,
// return: void
export function deleteJournal(user_token, journal_id) {
    return axios.delete('/me/'+user_token+'/'+journal_id)
        .then(res=>{
            return null;
        }).catch(err => {
            console.error(err);
            return err;
        })
}

// edit a journal
// input: user_id, journal id, journal fields
// return: the journal JSON after edition
export function editJournal(
    user_id,
    journal_id,
    title,
    date,
    image,
    weather,
    content,
    location,
    privacy
) {
    return axios
        .put('/me/' + user_id + '/' + journal_id, {
            title: title,
            date: date,
            image: image,
            weather: weather,
            content: content,
            location:location,
            privacy: privacy,
        })
        .then((res) => {
            return processJournal(res.data);
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
            return processJournal(res.data);
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
            return processJournal(res.data);
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
        .put('/explore/comments/' + journal_id + '/' + comment_id, {
            content: content,
            anonymous: anonymous,
        })
        .then((res) => {
            return processJournal(res.data);
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
        .delete('/explore/comments/' + journal_id + '/' + comment_id)
        .then((res) => {
            return processJournal(res.data);
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

// get like status of the journal when given user token and journal id
// req-param: idToken, journal_id
// response: true or false
export async function getJournalLikeStatus(idToken, journal_id) {
    if(!idToken || !journal_id) {
        return false;
    }
    try {
        const response = await axios.get('/journal/likeinfo/'+idToken + '/' +journal_id);
        return response.data.like;
    } catch(err){
        return false;
    }
}