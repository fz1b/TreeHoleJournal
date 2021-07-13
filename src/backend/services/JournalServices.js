// services for journals
const axios = require('axios').default;

// get all journals with PUBLIC or ANONYMOUS privacy setting
// input: void
// response: list of journals JSON obj
export function getExploreJournals() {
    return axios.get('/explore')
        .then(res => {
            // console.log(journals);
            if (res.status !== 200){
                console.error(res.data);
            }
            return res.data;
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

// get all journals from a specific user
// input: user id
// response: list of journals JSON obj
export function getUserJournals(user_id) {
    return axios.get('/me/'+user_id)
        .then(res => {
            // console.log(res);
            if (res.status !== 200){
                console.error(res.data);
            }
            return res.data;
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

// create a new journal
// input: user id, journal fields
// response: the added journal
export function createJournal(user_id, title, date, image, weather, content, privacy) {
    return axios.post('/me/'+user_id, {
        title: title,
        author_id: user_id,
        date: date,
        image: image,
        weather: weather,
        content: content,
        privacy: privacy
    }).then(res=>{
        if (res.status !== 200){
            console.error(res.data);
        }
        return res.data;
    }).catch(err => {
        console.error(err);
        return err;
    })
}

// delete a journal
// input: user_id, journal id,
// response: null
export function deleteJournal(user_id, journal_id) {
    return axios.delete('/me/'+user_id+'/'+journal_id)
        .then(res=>{
            if (res.status !== 200){
                console.error(res.data);
            }
            return res.data;
        }).catch(err => {
            console.error(err);
            return err;
        })
}

// edit a journal
// input: user_id, journal id, journal fields
// response: the journal JSON after edition
export function editJournal(user_id, journal_id, title, date, image, weather, content, privacy) {
    return axios.put('/me/'+user_id+'/'+journal_id, {
        title: title,
        author_id: user_id,
        date: date,
        image: image,
        weather: weather,
        content: content,
        privacy: privacy
    }).then(res=>{
        if (res.status !== 200){
            console.error(res.data);
        }
        return res.data;
    }).catch(err => {
        console.error(err);
        return err;
    })
}

// change the privacy setting of a journal
// input: user_id, journal id, new privacy setting
// response: the journal JSON after edition
export function changePrivacySetting(user_id, journal_id, privacy) {
    return axios.put('/me/'+user_id+'/'+journal_id+'/privacy', {privacy: privacy})
        .then(res=>{
            if (res.status !== 200){
                console.error(res.data);
            }
            return res.data;
        }).catch(err => {
            console.error(err);
            return err;
        })
}
