let express = require('express');
var cors = require('cors');
let app = express();
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const DB_NAME = 'TreeHole';
const mongoURL = 'mongodb+srv://CallbackKarma:treehole2021@cluster0.uyjr5.mongodb.net/'+DB_NAME+'?retryWrites=true&w=majority';
const userController = require('./controller/UserControllers');
const journalController = require('./controller/JournalControllers');

let server = app.listen(PORT, function () {
    // let host = server.address().address;
    let port = server.address().port;
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(res=>console.log("server started on port: %s", port))
        .catch(err=>{console.error(err);});
})

// User Endpoints
// signup endpoint
app.post('/users/signup', userController.signUp);
// login endpoint
app.post('/users/login', userController.login);
// get user info (for FE use, hide userid)
app.get('/users/info/:idToken?', userController.getUserInfo);
// get user info secure (for BE use, provide userid)

app.get('/users/info/secure/:idToken?', userController.getUserInfoSecure);
app.get('/users/info/id/:user_id', userController.getUserInfoById);



// Journal Endpoints
// Journals -- Explore
app.get('/explore', journalController.getExploreJournals)
app.post('/explore/:journal_id/comments/:commenter_id', journalController.createComment);
app.put('/explore/:journal_id/comments/:comment_id', journalController.editComment);
app.delete('/explore/:journal_id/comments/:comment_id', journalController.deleteComment)

// Journals -- Me
app.get('/me/:user_id', journalController.getUserJournals);
app.post('/me/:user_id', journalController.createNewJournal);
app.delete('/me/:user_id/:journal_id', journalController.deleteJournal);
app.put('/me/:user_id/:journal_id', journalController.editJournal);
app.put('/me/:user_id/:journal_id/privacy', journalController.editJournalPrivacySetting);
