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
const Journal = require('./models/JournalSchema').Journal;
const PRIVACY = require('./models/JournalSchema').PRIVACY;
const userServices = require('./services/UserServices');

let server = app.listen(PORT, function () {
    let host = server.address().address;
    let port = server.address().port;
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(res=>console.log("server started on port: %s", port))
        .catch(err=>{console.error(err);});
})

// User Services
// signup service
app.post('/users/signup', userServices.signUpService);
// login service
app.post('/users/login', userServices.loginService);
// get user info (for FE use, hide userid)
app.get('/users/info', userServices.getUserInfo);
// get user info secure (for BE use, provide userid)
app.get('/users/info/secure', userServices.getUserInfoSecure);


// get all journals with PUBLIC or ANONYMOUS privacy setting
// req-body: null
// response: list of journals JSON obj
app.get('/explore', (req, res) => {
    Journal.find({$or: [{privacy: PRIVACY.PUBLIC}, {privacy: PRIVACY.ANONYMOUS}]})
        .then(journals => {
            // console.log(journals);
            res.status(200).json(journals);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

// get all journals from a specific user
// req-body: user id
// response: list of journals JSON obj
app.get('/me/:user_id', (req, res) => {
    Journal.find({author_id: req.params.user_id})
        .then(journals => {
            // console.log(journals);
            res.status(200).json(journals);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

// create a new journal
// req-body: user id, journal fields except comments
// response: the added journal
app.post('/me/:user_id', (req, res)=>{
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
})

// delete a journal
// req-body: user_id, journal id,
// response: null
app.delete('/me/:user_id/:journal_id', (req,res)=>{
    Journal.findByIdAndDelete(req.params.journal_id).then(result=>{
        res.status(200);
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
})

// edit a journal
// req-body: user_id, journal id, journal fields except comments
// response: the journal JSON after edition
app.put('/me/:user_id/:journal_id', (req, res)=>{
    Journal.findByIdAndUpdate(req.params.journal_id, {
        $set: {
            title: req.body.title,
            date: req.body.date,
            image: req.body.image,
            weather: req.body.weather,
            content: req.body.content,
            privacy: req.body.privacy
        }
    },{new: true})
        .then(result=>{
            res.status(200).json(result);
        }).catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

// change the privacy setting of a journal
// req-body: new privacy setting
// response: the journal JSON after edition
app.put('/me/:user_id/:journal_id/privacy', (req, res)=>{
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
})
// create a comment and add it to a journal
// req-body: comment fields
// response: the journal JSON with comments added
app.post('/explore/:journal_id/comments/:commenter_id', (req, res)=>{
    const comment = {
        _id: new mongoose.Types.ObjectId(),
        author_id: req.params.commenter_id,
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
        .then(result=>{
            res.status(200).json(result);
        }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
})

// edit a comment, set the 'edited' field to true
// req-body: new comment content, anonymous
// response: the journal JSON with comments edited
app.put('/explore/:journal_id/comments/:comment_id', (req, res)=>{
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
})

// delete a comment
// req-body: null
// response: the journal JSON with comments deleted
app.delete('/explore/:journal_id/comments/:comment_id', (req,res)=>{
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
})
