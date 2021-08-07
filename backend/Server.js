let express = require('express');
var cors = require('cors');
let app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const userController = require('./controller/UserControllers');
const journalController = require('./controller/JournalControllers');
const path = require("path");

let server = app.listen(PORT, function () {
    let port = server.address().port;
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then((res) => {
            console.log('server started on port: %s', port);
        })
        .catch((err) => {
            console.error(err);
        });
});

app.use(express.static(path.join(__dirname, '../frontend/build')));


// User Endpoints
// signup endpoint
app.post('/users/signup', userController.signUp);
// login endpoint
app.post('/users/login', userController.login);
// refresh user idToken
app.post('/users/refreshtoken', userController.refreshUserIdToken);
// reset password
app.post('/users/changepassword', userController.changePassword);
// get user info (for FE use, hide userid)
app.get('/users/info/:idToken', userController.getUserInfo);
// get user info secure (for BE use, provide userid)
app.get('/users/info/secure/:idToken', userController.getUserInfoSecure);
// get user info by userid (for BE use)
app.get('/users/info/id/:user_id', userController.getUserInfoById);
// let user to like a journal (for FE)
app.post('/users/like/add', userController.likeJournal);
// let user to undo 'like a journal' (for FE)
app.post('/users/like/remove', userController.unlikeJournal);
// get all of user's liked journals (for FE)
app.get('/users/like/journals/:idToken', userController.getLikedJournalsByUserToken);



// Journal Endpoints
// get public and anonymous journals for Explore page
app.get('/explore', journalController.getExploreJournals);
// get public and anonymous journals filtered by search criteria
app.get('/explore/search/:criteria', journalController.searchExploreJournals);
// get the journal's author info
app.get('/journals/author/:journal_id', journalController.getJournalAuthor);
// verify user editing access
app.get('/journal/access/:journal_id/:idToken', journalController.verifyEditingAccess);
// get the comment's author info
app.get(
    '/comments/:journal_id/:comment_id',
    journalController.getCommentAuthor
);
// create a new comment
app.post(
    '/comments/:journal_id/:commenter_token',
    journalController.createComment
);
// edit an existing comment
app.put(
    '/explore/comments/:journal_id/:comment_id',
    journalController.editComment
);
// delete a comment
app.delete('/explore/comments/:journal_id/:comment_id', journalController.deleteComment)

// Journals -- Me
// get journals written by the given user
app.get('/me/:idToken', journalController.getUserJournals);
// get journals written by the given user that contain the string in title or content
app.get('/me/search/:idToken/:criteria', journalController.searchUserJournals);
// get a list of dates that the user wrote journals on
app.get('/me/date_overview/:idToken', journalController.getDateOverview);
// get journals written by the given user on the specified date
app.get('/me/date/:idToken/:date', journalController.getUserJournalsByDate);
// create a new journal
app.post('/me/:idToken', journalController.createNewJournal);
// delete a journal
app.delete('/me/:idToken/:journal_id', journalController.deleteJournal);
app.put('/me/:user_id/:journal_id', journalController.editJournal);
app.put(
    '/me/:user_id/:journal_id/privacy',
    journalController.editJournalPrivacySetting
);
// get if user has liked this post
app.get('/journal/likeinfo/:idToken/:journalId', journalController.getJournalLike);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});