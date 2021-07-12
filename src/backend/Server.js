
let express = require('express');
let app = express();
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const DB_NAME = 'TreeHole';
const mongoURL = 'mongodb+srv://CallbackKarma:treehole2021@cluster0.uyjr5.mongodb.net/'+DB_NAME+'?retryWrites=true&w=majority';
const Journal = require('./models/JournalSchema').Journal;
const PRIVACY = require('./models/JournalSchema').PRIVACY;

let server = app.listen(PORT, function () {
    let host = server.address().address;
    let port = server.address().port;
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(res=>console.log("server started on port: %s", port))
        .catch(err=>{console.error(err);});
})

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
// req-body: user id, journal JSON obj
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
        privacy: req.body.privacy
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
// req-body: user_id, journal id, journal JSON obj
// response: the journal JSON after edition
app.put('/me/:user_id/:journal_id', (req, res)=>{
    Journal.findByIdAndUpdate(req.params.journal_id, {
        title: req.body.title,
        author_id: req.params.user_id,
        date: req.body.date,
        image: req.body.image,
        weather: req.body.weather,
        content: req.body.content,
        privacy: req.body.privacy
    }).then(result=>{
        Journal.findById(req.params.journal_id).then(response=>res.status(200).json(response));
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
})