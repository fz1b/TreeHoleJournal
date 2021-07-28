let express = require('express');
var cors = require('cors');
let app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const DB_NAME = 'TreeHole';
const mongoURL =
    'mongodb+srv://CallbackKarma:treehole2021@cluster0.uyjr5.mongodb.net/' +
    DB_NAME +
    '?retryWrites=true&w=majority';
const userController = require('./controller/UserControllers');
const journalController = require('./controller/JournalControllers');

let server = app.listen(PORT, function () {
    // let host = server.address().address;
    let port = server.address().port;
    mongoose
        .connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then((res) => console.log('server started on port: %s', port))
        .catch((err) => {
            console.error(err);
        });
});

// User Endpoints
// signup endpoint
app.post('/users/signup', userController.signUp);
// login endpoint
app.post('/users/login', userController.login);
// refresh user idToken
app.post('/users/refreshtoken', userController.refreshUserIdToken);
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
    '/explore/:journal_id/comments/:comment_id',
    journalController.editComment
);
// delete a comment
app.delete(
    '/explore/:journal_id/comments/:comment_id',
    journalController.deleteComment
);

// Journals -- Me
// get journals written by the given user
app.get('/me/:idToken', journalController.getUserJournals);
// get journals written by the given user that contain the string in title or content
app.get('/me/search/:idToken/:criteria', journalController.searchUserJournals);
app.post('/me/:idToken', journalController.createNewJournal);
app.delete('/me/:user_id/:journal_id', journalController.deleteJournal);
app.put('/me/:user_id/:journal_id', journalController.editJournal);
app.put(
    '/me/:user_id/:journal_id/privacy',
    journalController.editJournalPrivacySetting
);
